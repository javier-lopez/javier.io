# Vendors asciinema recordings referenced by posts.
#
# A post asks for a recording with
#
#     {% include asciinema.html id="132191" %}
#
# and the bytes have to end up in this repository, not fetched from
# asciinema.org at read time — that is the whole point, and the reason
# showterm.io took fourteen recordings with it when it died.
#
# So this hook reads every post before rendering, collects the ids, and
# for each one checks assets/asciinema.org/casts/<id>.json.gz:
#
#   locally  a missing cast is downloaded, gzipped and written, so adding
#            a recording is one Liquid tag plus `git add`. It shows up on
#            the next `jekyll serve` reload with no extra step to forget.
#
#   in CI    a missing cast FAILS THE BUILD. Downloading here instead
#            would produce a green deploy whose recording lives on
#            someone else's server, which is the bug this whole
#            arrangement exists to prevent. The error says which post and
#            which command fixes it.
#
# The split is deliberate: convenience where a human can react, refusal
# where the mistake would ship.

require 'fileutils'
require 'net/http'
require 'stringio'
require 'uri'
require 'zlib'

module AsciinemaVendor
  CAST_DIR  = File.join('assets', 'asciinema.org', 'casts').freeze
  SOURCE    = 'https://asciinema.org/a/%s.cast'.freeze
  # Matches the include tag in raw post source, whatever order the
  # arguments appear in.
  ID_RE     = /\{%-?\s*include\s+asciinema\.html\b[^%]*?\bid\s*=\s*["']([A-Za-z0-9_-]+)["']/.freeze
  # ANY direct mention of asciinema.org in post source. Not just embeds:
  # the include is the only form this site knows how to act on, so a bare
  # URL is a recording the plugin cannot fetch, cannot vendor and cannot
  # protect — it is a dependency written in a language the build does not
  # speak. Failing on it is what makes the include the only way in.
  #
  # Post source is scanned before rendering, so the data-fallback URL the
  # include emits is invisible here and never trips this.
  URL_RE    = %r{asciinema\.org/a/([A-Za-z0-9_-]+)}i.freeze
  # An author who deliberately wants a bare link says so, once, in the
  # post. Explicit, greppable, and a decision rather than an oversight.
  ESCAPE    = 'asciinema:allow'.freeze
  MAX_BYTES = 25 * 1024 * 1024

  class << self
    def ci?
      ENV['CI'] == 'true' || ENV['GITHUB_ACTIONS'] == 'true'
    end

    # Jekyll's error summary collapses a multi-line message into a single
    # paragraph, which is fine for "file not found" and useless for a
    # message whose point is a snippet to copy. Print the guidance through
    # the logger first, where line breaks survive, then abort with a short
    # one-liner.
    def abort_with(headline, lines)
      Jekyll.logger.error ''
      Jekyll.logger.error "asciinema: #{headline}"
      lines.each { |l| Jekyll.logger.error(l.empty? ? '' : "  #{l}") }
      Jekyll.logger.error ''
      raise Jekyll::Errors::FatalException, "asciinema: #{headline}"
    end

    # id => first post that asks for it, for a useful error message
    def referenced(site)
      found = {}
      (site.posts.docs + site.pages).each do |doc|
        next unless doc.respond_to?(:content) && doc.content
        doc.content.scan(ID_RE) do |(id)|
          found[id] ||= doc.relative_path
        end
      end
      found
    end

    # The include is the site's own markup for a recording, and the only
    # thing the fetching below can act on. A direct URL is refused so the
    # author writes it in the terms the plugin understands.
    def reject_direct_urls(site)
      offenders = []
      (site.posts.docs + site.pages).each do |doc|
        next unless doc.respond_to?(:content) && doc.content
        next if doc.content.include?(ESCAPE)

        doc.content.scan(URL_RE) { |(id)| offenders << [doc.relative_path, id] }
      end
      return if offenders.empty?

      example = offenders.first.last
      abort_with(
        "#{offenders.size} direct asciinema.org reference(s) in post source",
        offenders.map { |where, id| "#{where}  (id #{id})" } + [
          '',
          'A direct URL is a recording this build cannot fetch, vendor or',
          'protect. showterm.io took fourteen recordings out of this blog',
          'that way, and the Wayback Machine has a copy of none of them.',
          '',
          'Write it in the form the plugin understands:',
          '',
          %({% include asciinema.html id="#{example}" %}),
          '',
          'Optional: start="10" skips a slow opening,',
          '          poster="npt:1:23" picks the still frame.',
          '',
          "Then build once. The .cast lands in #{CAST_DIR}/, gzipped;",
          'commit it with the post.',
          '',
          "If a bare link really is what you want, put #{ESCAPE} in the post",
          'to opt it out — deliberately, and visible to the next grep.'
        ]
      )
    end

    def vendor(site)
      reject_direct_urls(site)
      wanted = referenced(site)
      return if wanted.empty?

      missing = wanted.reject { |id, _| File.file?(File.join(site.source, CAST_DIR, "#{id}.json.gz")) }
      return if missing.empty?

      if ci?
        abort_with(
          "#{missing.size} recording(s) referenced but not vendored",
          missing.map { |id, where| "#{id}  (#{where})" } + [
            '',
            'These were never committed. Run a local build (or jekyll serve)',
            "to fetch them into #{CAST_DIR}/, then commit the files.",
            '',
            'CI will not download them: a recording that is not in this',
            'repository is one service outage away from being gone, which is',
            'the failure this guards.'
          ]
        )
      end

      missing.each { |id, where| fetch(site, id, where) }
    end

    def fetch(site, id, where)
      url  = format(SOURCE, id)
      dest = File.join(site.source, CAST_DIR, "#{id}.json.gz")
      Jekyll.logger.info 'asciinema:', "vendoring #{id} for #{where}"

      body = get(URI.parse(url))
      # An id that does not exist answers with an HTML error page, and a
      # gzipped 404 is a silent, invisible failure at playback time.
      unless body.lstrip.start_with?('{')
        raise Jekyll::Errors::FatalException,
              "asciinema: #{url} did not return an asciicast (referenced by #{where}). " \
              'Check the id.'
      end

      FileUtils.mkdir_p(File.dirname(dest))
      buffer = StringIO.new
      gz = Zlib::GzipWriter.new(buffer, Zlib::BEST_COMPRESSION)
      gz.write(body)
      gz.close
      File.binwrite(dest, buffer.string)

      # The site's file list was built before this existed, so Jekyll would
      # not copy it into _site on this pass.
      site.static_files << Jekyll::StaticFile.new(site, site.source, CAST_DIR, "#{id}.json.gz")

      Jekyll.logger.info 'asciinema:',
                         "wrote #{CAST_DIR}/#{id}.json.gz " \
                         "(#{body.bytesize / 1024}K -> #{buffer.size / 1024}K)"
    end

    def get(uri, redirects = 3)
      res = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https',
                                                open_timeout: 15, read_timeout: 60) do |http|
        http.request(Net::HTTP::Get.new(uri))
      end

      case res
      when Net::HTTPSuccess
        raise Jekyll::Errors::FatalException, "asciinema: #{uri} is larger than #{MAX_BYTES} bytes" \
          if res.body.bytesize > MAX_BYTES

        res.body
      when Net::HTTPRedirection
        raise Jekyll::Errors::FatalException, "asciinema: too many redirects for #{uri}" if redirects.zero?

        get(URI.join(uri.to_s, res['location']), redirects - 1)
      else
        raise Jekyll::Errors::FatalException, "asciinema: #{uri} returned #{res.code}"
      end
    end
  end
end

# post_read is the first point where every post's source is available and
# nothing has been rendered yet, so a cast written here is still picked up
# as a static file for this same build.
Jekyll::Hooks.register :site, :post_read do |site|
  AsciinemaVendor.vendor(site)
end
