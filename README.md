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

Then open [http://localhost:4000](http://localhost:4000) in your browser.

The repo is mounted at `/srv/jekyll` inside the container, so local edits to content, layouts, or assets are reflected automatically. Jekyll runs with `--livereload` and `--force_polling`, so the browser can refresh when files change. The project avoids root-level symlinks so bind mounts work with Colima and other VM-based Docker hosts. Jekyll excludes `deploy` and `setup` (see `exclude` in `_config.yml`); they are scripts, not pages.

### Build static output only (optional)

To build the site into `_site` on the host without running the server:

```bash
docker compose build
docker run --rm -v "$(pwd):/srv/jekyll" -v "$(pwd)/_site:/srv/jekyll/_site" javier-io-jekyll bundle exec jekyll build
```

(Adjust the image name if you built with a different project path; it is typically `<directory>-jekyll`.)
