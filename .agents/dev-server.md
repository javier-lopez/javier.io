# Running the dev server

`docker compose up` fails like this when 5000 is taken:

```
Bind for 0.0.0.0:5000 failed: port is already allocated
```

The error names no remedy. This is it:

```bash
JEKYLL_PORT=5100 docker compose up -d
```

`JEKYLL_LIVERELOAD_PORT` (default `35729`) works the same way. Pass them on the
command line; a port belongs to one machine, not to the repo.

Two wrong ways out of that error:

- **Do not edit `docker-compose.yml`.** It is committed, so a port picked for
  one machine moves the server for everybody who pulls.
- **Do not stop whatever holds 5000.** Other projects on this machine publish
  5000 from their own stacks, and stopping one kills unrelated work.

Each variable drives both the published port and the port Jekyll listens on, and
the two must stay equal: `--livereload` makes Jekyll inject a `<script>` aimed at
the port it believes it is serving, so a mismatch yields a site that loads
perfectly and silently stops refreshing.

Prefer `up -d`. A foreground server dies with the shell that started it, and this
Docker daemon is shared with other stacks.

`docker-compose.yml` pins `user: "${UID:-1000}:${GID:-1000}"` so files the
container writes into the repo are committable. If Jekyll dies at boot with
`EACCES` on `.jekyll-cache`, the tree still holds root-owned artifacts from
before that change; the comment above that line has the one-time cleanup.
