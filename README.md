# javier.io

Javier López personal blog (Jekyll).

## Development with Docker

You can run and develop the site using only Docker and Docker Compose; no Ruby, Bundler, or system libraries (e.g. GSL) need to be installed on the host.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Run the site

From the project root:

```bash
docker compose up --build
```

Then open [http://localhost:5000](http://localhost:5000) in your browser.

### Build static output only (optional)

To build the site into `_site` on the host without running the server:

```bash
docker compose run --rm jekyll bundle exec jekyll build
```

### Updating Gemfile.lock

After adding or changing gems in `Gemfile`, regenerate the lockfile so CI and others get the same versions and CHECKSUMS:

```bash
docker compose run --rm jekyll bundle install
```

Then commit the updated `Gemfile.lock`. This keeps Bundler’s frozen install in GitHub Actions (and other environments) from failing on missing or empty CHECKSUMS.
