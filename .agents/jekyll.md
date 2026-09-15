# What the build publishes

Jekyll renders a file only when it opens with a `---` front matter block.
Anything else is copied byte for byte: no Liquid, no layout, no includes.

Two consequences:

- A root-level file is published unless `exclude` in `_config.yml` names it.
  `AGENTS.md` and `CLAUDE.md` were served as pages until they were excluded.
  `.agents/` needs no entry — Jekyll skips dot-directories.
- For a page without front matter the source file *is* the served output, so it
  can be opened directly rather than through the server. `comida.html` is the
  large one: a standalone page with its own `<head>`, where `{{ site.title }}`
  would reach the browser as literal text.
