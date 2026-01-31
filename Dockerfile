FROM ruby:3.2-slim

RUN apt-get update && apt-get install -y build-essential git && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll

COPY Gemfile* /srv/jekyll/
RUN bundle install

COPY . /srv/jekyll

EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--config", "_config.yml,_config_development.yml", "--host", "0.0.0.0", "--livereload", "--force_polling"]
