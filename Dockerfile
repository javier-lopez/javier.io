FROM ruby:3.2-slim

RUN apt-get update && apt-get install -y build-essential git && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll

COPY Gemfile* /srv/jekyll/
RUN bundle install

COPY . /srv/jekyll

# Documentation only; EXPOSE publishes nothing. These are the defaults the
# command below falls back to when the environment says nothing.
EXPOSE 5000 35729

# Shell form so the ports can come from the environment, and `exec` so jekyll
# replaces the shell as PID 1 and still receives SIGTERM from `compose down`.
#
# Both ports have to be settable, and both have to agree with what
# docker-compose.yml publishes. --livereload makes jekyll inject a <script>
# into every page pointing at its own livereload port, so a container
# listening on 35729 while the host publishes something else loads a page
# that silently never refreshes again.
CMD ["sh", "-c", "exec bundle exec jekyll serve --host 0.0.0.0 --port \"${JEKYLL_PORT:-5000}\" --livereload --livereload-port \"${JEKYLL_LIVERELOAD_PORT:-35729}\" --force_polling"]
