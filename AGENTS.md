# Working in this repo

A Jekyll blog, built and served entirely through Docker. What follows is only
the handful of things that are expensive to get wrong and invisible from the
code itself.

## The dev server port is a variable, not a constant

`docker compose up` fails like this when 5000 is taken:

```
Bind for 0.0.0.0:5000 failed: port is already allocated
```

The error names no remedy. This is it:

```bash
JEKYLL_PORT=5100 docker compose up -d
```

`JEKYLL_LIVERELOAD_PORT` (default `35729`) works the same way. Either can also
go in a `.env` file next to `docker-compose.yml`, which is gitignored.

Two wrong ways out of that error:

- **Do not edit `docker-compose.yml`.** It is committed. A port picked for one
  machine would move the server for everybody who pulls.
- **Do not stop whatever is holding 5000.** Other projects on this machine
  publish 5000 from their own compose stacks, and stopping one kills work that
  has nothing to do with this repo. Take a free port instead; that is the whole
  reason the variable exists.

Each variable drives both the published port and the port Jekyll listens on
inside the container, and the two must stay equal. `--livereload` makes Jekyll
inject a `<script>` into every page aimed at the port it believes it is serving,
so a mismatch yields a site that loads perfectly and silently stops refreshing.

Prefer `up -d` over a foreground `up`: this repo shares a Docker daemon with
other stacks, and a foreground server dies with the shell that started it.

## Files without YAML front matter are copied byte for byte

Jekyll only renders a file that opens with a `---` front matter block. Anything
else is a static copy: no Liquid, no layout, no includes. `comida.html` is the
large one in this category — it is a standalone page with its own `<head>`, and
`{{ site.title }}` written into it would reach the browser as literal text.

The practical consequence is that the source file *is* the served output, so it
can be opened directly instead of through the server when all you need is a
look at it.

## Build artifacts are written by an unprivileged container user

`docker-compose.yml` pins `user: "${UID:-1000}:${GID:-1000}"` because a plugin
downloads files into the repo, and as root those arrive unwritable by whoever
has to commit them. If Jekyll dies at boot with `EACCES` on `.jekyll-cache`,
the tree still has root-owned artifacts from before that change; the comment
above that line in `docker-compose.yml` has the one-time cleanup.
