---
layout: post
title: "upgrade to bash-completion >= 2.0"
tags: [ubuntu, motu]
description: "bash-completion is the package responsible for autocompletion in the Ubuntu cli (by default), whenever you write: A script on /usr/share/bash-completion/ is ..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

[bash-completion][276] is the package responsible for autocompletion in the
Ubuntu cli (by default), whenever you write:

<pre class="sh_sh">
$ sudo apt-get [TAB][TAB] #or any other cli app
</pre>

A script on /usr/share/bash-completion/ is executed which list the options you
have.

<pre class="sh_sh">
$ sudo apt-get
autoclean build-dep check dist-upgrade dselect-upgrade purge source
upgrade autoremove changelog clean download install remove update
</pre>

This is plain awesome, however it has the drawback that it requires to read
many of these same files at the beginning of your shell session (every time
you open a new terminal, gnome-terminal) which may take time (2 seconds on my
current machine, core duo, 4gb of ram). A new version of bash-completion has
been on the air for some time, the 2.0 version loads a **lot faster** (3x on
my own machine).

On ubuntu bash-completion >= 2.0 is provided in the following releases:

<pre class="sh_sh">
bash-completion | 1:2.0-1ubuntu2 | quantal | source, all
bash-completion | 1:2.0-1ubuntu3 | raring | source, all
bash-completion | 1:2.0-1ubuntu3 | saucy | source, all
</pre>

So if you’re running Quantal|Raring|Saucy you’re covered, if you’re not (for
example if you’re running the Ubuntu Precise release) you can do it easily.

1.- Download the [bash-completion][277]package

2.- Install it

<pre class="sh_sh">
$ sudo dpkg -i bash-completion*.deb
</pre>

3.- Enjoy

The package has no dependencies, so it’s a drop and replace action. Thanks to
the bash-completion team for the great optimization work =D!

  [276]: http://bash-completion.alioth.debian.org/
  [277]: http://mirrors.us.kernel.org/ubuntu//pool/main/b/bash-completion/bash-completion_2.0-1ubuntu3_all.deb

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2013/10/16/upgrade-to-bash-completion-2-0/)
