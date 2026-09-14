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
  MAX_BYTES = 25 * 1024 * 1024

  class << self
    def ci?
      ENV['CI'] == 'true' || ENV['GITHUB_ACTIONS'] == 'true'
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

    def vendor(site)
      wanted = referenced(site)
      return if wanted.empty?

      missing = wanted.reject { |id, _| File.file?(File.join(site.source, CAST_DIR, "#{id}.json.gz")) }
      return if missing.empty?

      if ci?
        list = missing.map { |id, where| "  #{id}  (#{where})" }.join("\n")
        raise Jekyll::Errors::FatalException, <<~MSG
          asciinema: #{missing.size} recording(s) referenced but not vendored:
          #{list}
          These were never committed. Run a local build (or `jekyll serve`) to
          fetch them into #{CAST_DIR}/, then commit the files. CI will not
          download them: a recording that is not in this repository is one more
          service outage away from being gone, which is the failure this guards.
        MSG
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
