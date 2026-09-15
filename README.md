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

If port 5000 is taken — it often is, and other projects on the same machine may
already be using it — set `JEKYLL_PORT`, either inline or in a `.env` file next
to `docker-compose.yml` (gitignored, since a port is a property of one
machine and not of the project):

```bash
JEKYLL_PORT=5100 docker compose up
```

`JEKYLL_LIVERELOAD_PORT` (default `35729`) works the same way. Each variable
drives both the published port and the port Jekyll listens on, so the two can
never drift apart; livereload breaks silently if they do, because Jekyll
injects a script tag aimed at whatever port it thinks it is serving.

The repo is mounted at `/srv/jekyll` inside the container, so local edits to content, layouts, or assets are reflected automatically. Jekyll runs with `--livereload` and `--force_polling`, so the browser can refresh when files change. The project avoids root-level symlinks so bind mounts work with Colima and other VM-based Docker hosts. Jekyll excludes `deploy` and `setup` (see `exclude` in `_config.yml`); they are scripts, not pages.

### Build static output only (optional)

To build the site into `_site` on the host without running the server:

```bash
docker compose run --rm jekyll bundle exec jekyll build
```

Going through Compose rather than a bare `docker run` avoids two traps. The
image name is derived from the directory with punctuation *removed*, so
`javier.io` yields `javierio-jekyll` and not `javier-io-jekyll`; and a plain
`docker run` ignores the `user:` line in `docker-compose.yml`, leaving a
`_site` owned by root that the next unprivileged build cannot overwrite.

### Notes for AI agents

`AGENTS.md` in the repo root holds the few things that are expensive to get
wrong here and not visible from the code — above all that the dev server port
is a variable, and that a port collision is solved with `JEKYLL_PORT` rather
than by editing `docker-compose.yml` or stopping whatever else is listening.
`CLAUDE.md` is a one-line import of that same file, so both conventions read
one source.

### Updating Gemfile.lock

After adding or changing gems in `Gemfile`, regenerate the lockfile so CI and others get the same versions and CHECKSUMS:

```bash
docker compose run --rm jekyll bundle install
```

Then commit the updated `Gemfile.lock`. This keeps Bundler’s frozen install in GitHub Actions (and other environments) from failing on missing or empty CHECKSUMS.
