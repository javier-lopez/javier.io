---
layout: post
title: "talks: vlide"
tags: [talks, vim, vlide]
featured: true
description: "Hoy di una charla sobre programación de plugins para vim en el meetup Vim-CDMX — presentada con vlide.vim, un plugin que escribí para dar charlas desde vim. Los slides ejecutan shell y orquestan tmux en vivo..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Hoy di una charla sobre **programación de plugins para vim** en el meetup
[Vim-CDMX](https://www.meetup.com/cdmx-vim-meetup/): la anatomía de un
plugin, autoload, mappings, y cómo pasar de "tengo una función en mi
vimrc" a "publiqué un plugin que otros pueden instalar".

Es la secuela de la
[introducción a vim que di en el ENLI 2011](/blog/es/2011/02/24/talks-introduccion-a-vim.html)
— y esta vez la meta-demostración fue más lejos: la presenté con
[vlide.vim](https://github.com/javier-lopez/vlide.vim), un plugin que
escribí precisamente para dar charlas desde vim. Una charla de plugins,
presentada con un plugin, dentro del editor — no se puede ser más meta.

Aquí está la grabación completa:

<script id="asciicast-132191" src="https://asciinema.org/a/132191.js" data-start-at="10" async></script>

### Lo más poderoso: los slides ejecutan

vlide no es un visor de láminas — cada slide puede traer bloques
`@autoexe` que **se ejecutan al renderizarse**. Esta charla usa 44
bloques de shell (y por esa vía, cualquier intérprete que la shell
invoque: python, awk, lo que sea): el slide que explica un concepto es
el mismo programa que corre su demo.

Y la jugada maestra es la orquestación de **tmux**: la presentación
arranca verificando que exista una sesión de tmux activa, y de ahí en
adelante los slides abren splits y mandan keystrokes a un segundo vim en
vivo. El demo del *monkey typer*: un slide escribe
`/tmp/vlide_monkey_typer.c` con la indentación hecha un desastre, lo
abre en el panel de al lado, y el slide siguiente lo formatea frente al
público con `gg=G` — sin que el presentador toque ese panel. Los slides
no describen la demo: la ejecutan.

### Revívela en tu terminal

<pre class="sh_sh">
$ wget -qO- https://raw.githubusercontent.com/javier-lopez/talks/master/vim-plugins-dev-es.md | vim +Vlide -
</pre>

Córrela **dentro de una sesión de tmux** — los slides la usan para las
demos en vivo. Con [vlide.vim](https://github.com/javier-lopez/vlide.vim)
instalado, espacio avanza y backspace retrocede; sin vlide, igual se
deja leer como un archivo de ayuda de vim. El fuente vive en
[talks/vim-plugins-dev-es.md](https://github.com/javier-lopez/talks/blob/master/vim-plugins-dev-es.md).
