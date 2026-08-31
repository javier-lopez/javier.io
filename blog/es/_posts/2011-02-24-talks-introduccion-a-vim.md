---
layout: post
title: "talks: introduccion a vim"
tags: [talks, vim]
description: "Hoy di una charla de introducción a vim en el ENLI (enli.org.mx). Los slides no son un pdf ni un powerpoint: son 65 archivos .vim que se presentan desde vim mismo..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Hoy di una charla de introducción a [vim](https://www.vim.org/) en el
[ENLI](http://enli.org.mx) — el Encuentro Nacional de Linux y Software
Libre, en Puebla, México.

Los slides no son un pdf ni un powerpoint: son **65 archivos `.vim` que se
presentan desde vim mismo** — cada lámina es un buffer, y navegar la charla
es navegar archivos. Si la charla es sobre el editor, ¿qué mejor
demostración que no salir de él en ningún momento?

Los slides completos están disponibles en
[talks/introduccion-a-vim/vim.feb.2011.tar.gz](/talks/introduccion-a-vim/vim.feb.2011.tar.gz).
Para verlos:

<pre class="sh_sh">
$ wget -qO- javier.io/talks/introduccion-a-vim/vim.feb.2011.tar.gz | tar xz --one-top-level=vim.feb.2011 && vim -u NONE -N vim.feb.2011/*.vim
</pre>

Con los 65 slides en la lista de argumentos, `:n` avanza y `:N` retrocede
— y ya sabes cómo salir ;)

Update (2017): seis años después di la secuela —
[programación de plugins para vim](/blog/es/2017/07/27/talks-vlide.html),
esta vez presentada con un plugin escrito a la medida para dar charlas.
