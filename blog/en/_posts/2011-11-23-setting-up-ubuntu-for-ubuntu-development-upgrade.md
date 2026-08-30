---
layout: post
title: "setting up ubuntu for ubuntu development (upgrade)"
tags: [ubuntu, motu]
description: "In this post I\u2019ll describe the way I upgrade my computers and my environment for working with Ubuntu development (if it can be call it that way\u2026). I always r..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

In this post I’ll describe the way I upgrade my computers and my environment
for working with Ubuntu development (if it can be call it that way…). I always
run in my main computer the latest LTS version (lucid at this moment), and in
my test machine the latest development version (precise), I believe that there
will one great day when I know enough to make development in the test machine
and [backports][137] / [SRU][138]‘s for the stable one =3

Since I use a lot my main computer, I install there pbuilder**/** devs
tools**/** virtualbox to modify packages for the development cycle, I only use
my test machine for packages that require real hardware to be tested. So, the
first thing I do when a new cycle starts is create a new directory for the
cycle that is starting, precise for this example.

<pre class="sh_sh">
$ mkdir -pv misc/ubuntu/ubuntu-12.04 &amp;&amp; cd misc/ubuntu/ubuntu-12.04
$ mkdir  -pv app  diffs  isos  merge  udw
</pre>

I mantain my ubuntu related stuff with this hierarchy:

<pre class="sh_sh">
$ tree -L 2 misc/ubuntu
 ├── results/
 │   ├── lucid-amd64/
 │   ├── lucid-i386/
 │   ├── maverick-i386/
 │   ├── natty-i386/
 │   ├── oneiric-i386/
 │   └── sid-i386/
 ├── ubuntu-10.04/
 │   ├── app/
 │   ├── diffs/
 │   ├── isos/
 │   ├── merge/
 │   └── udw/
 ├── ubuntu-10.10/
 │   ├── app/
 │   ├── diffs/
 │   ├── isos/
 │   ├── merge/
 │   └── udw/
 ├── ubuntu-11.04/
 │   ├── app/
 │   ├── diffs/
 │   ├── isos/
 │   ├── merge/
 │   └── udw/
 └── ubuntu-11.10/
 ├── app/
 ├── diffs/
 ├── isos/
 ├── merge/
 └── udw/
</pre>

Which can be disassemble it as follows:

_results_ **= >** contains the output of pbuilder (.debs ready to been
tested), I’ve added a [patch][139] to copy the packages keeping my ID as the
owner

_ubuntu-version_ **= >** which contains everything related to that version,
isos, packages ([FTBFS][140]), udw logs, diffs (which are actually debdiffs,
this is the classic format to send patches), and merges

Once the dirs have been created, I check the latest versions of some devs
packages ([ubuntu-dev-tools][141], [ubuntu-qa-tools][142] & [ubuntu-security-
tools][143])

<pre class="sh_sh">
$ bzr branch lp:ubuntu-dev-tools ~/misc/ubuntu/tools/ubuntu-dev-tools
$ bzr get \
  http://bazaar.launchpad.net/~ubuntu-bugcontrol/ubuntu-qa-tools/master \
  ~/misc/ubuntu/tools/ubuntu-qa-tools
$ bzr branch lp:ubuntu-security-tools \
  ~/misc/ubuntu/tools/ubuntu-security-tools
</pre>

With those tools under my fingers I can start downloading the last isos (to test them), I do this as soon as possible, and then I keep upgrading it once a week, I use the **$** ./dl-ubuntu-test-iso script who comes with the ubuntu-qa-tools package. Before I run it I edit the ~/.dl-ubuntu-test-iso file, currently it looks like [this][144], the parts that I change is RELEASE=”precise” and ISOROOT=”/home/chilicuil/misc/ubuntu/ubuntu-12.04/isos/” I only download the desktop / server and netbook versions, however the VARIANTS and FLAVORS variables can be edited to download more images. It will run faster if zsync is installed
    
<pre class="sh_sh">
$ cd ~/misc/ubuntu/tools/ubuntu-qa-tools/dl-ubuntu-test-iso &amp;&amp; \
  ./dl-ubuntu-test-iso &amp;
</pre>

The next thing I do is to set up pbuilder, I’ve already wrote [about it][145],
so I’ll just point out what variables I modify in ~/.pbuilder, for each new
release I change the UBUNTU_SUITES var:

UBUNTU_SUITES=(“oneiric” “natty” “lucid“) => UBUNTU_SUITES=(“precise”
“oneiric” “natty” “lucid“)

And add the aliases to ~/.bashrc:

<pre class="sh_sh">
alias pbuilder.precise='sudo DIST=precise pbuilder'
</pre>

I also modify the /etc/bash_completion.d/pbuilder to get autocompletion:

<pre class="sh_sh">
[ "$have" ] &amp;&amp; complete -F _pbuilder -o filenames pbuilder pbuilder.lucid pbuilder.maverick pbuilder.natty pbuilder.oneiric pbuilder.precise pbuilder.sid pbuilder.unstable
</pre>

The complete file is [here][146], finally I run:

<pre class="sh_sh">
$ pbuilder.precise create
</pre>

To obtain the precise environment where packages would be build

  [137]: https://help.ubuntu.com/community/UbuntuBackports
  [138]: https://wiki.ubuntu.com/StableReleaseUpdates
  [139]: https://gist.github.com/1387537
  [140]: http://qa.ubuntuwire.org/ftbfs/
  [141]: https://wiki.ubuntu.com/UbuntuDevTools
  [142]: https://launchpad.net/ubuntu-qa-tools
  [143]: https://launchpad.net/ubuntu-security-tools
  [144]: https://gist.github.com/1387600
  [145]: /blog/es/2010/08/10/notas-sobre-pbuilder.html
  [146]: https://gist.github.com/1388027

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2011/11/23/setting-up-ubuntu-for-ubuntu-development-upgrade/)
