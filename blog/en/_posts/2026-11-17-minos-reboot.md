---
layout: post
title: "minos, rebooted for 22.04, 24.04 and 26.04"
tags: [linux, ubuntu, tools, videos]
featured: true
description: "minos, the tiling desktop on top of Ubuntu LTS, now runs on the three releases under standard support, 22.04, 24.04 and 26.04: rebuilt, re-tested and a bit lighter..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

In 2018 I wrote [about minos](/blog/en/2018/08/22/minos-a-tiling-wm-linux-distro.html),
the Linux respin I had been tinkering with in my spare time: a thin layer of
packages on top of Ubuntu LTS for people who live in a terminal. `minos-core`
brings bash in vi mode, tmux and vim with their plugins; `minos-desktop` puts
an i3 tiling desktop around them, keyboard first and mostly black.

Minos now installs on the three Ubuntu LTS releases under standard support,
22.04, 24.04 and 26.04, from one packaging, with the same i3 desktop and the
same vi-everywhere habits as before.

### Install

On an existing Ubuntu LTS:

    $ sh <(wget -qO- minos.io/s) core       # no X: shell, tmux, vim
    $ sh <(wget -qO- minos.io/s) desktop    # i3 desktop, includes core

Or by hand:

    $ sudo add-apt-repository ppa:minos-archive/main
    $ sudo apt-get update
    $ sudo apt-get install --no-install-recommends minos-desktop

Onto a blank disk from any live USB, as before:

    $ sh <(wget -qO- minos.io/s) live desktop /dev/sdX username passwd

### What stayed

    ▸ i3 4.12 with minos' patches: XBM icons in the bar, low title bars, no
      urgency hint on hidden workspaces. Newer i3 is fine, but this one was
      enough, so it got ported instead of replaced (PCRE2, GCC 10, 26.04)
    ▸ One packaging for every LTS: the same debian/ builds on 22.04, 24.04 and
      26.04, renamed dependencies become alternatives, nothing per release
    ▸ One config file, /etc/minos/config and ~/.minos/config, and every
      settings module still turns off with dpkg-reconfigure

### What changed

    ▸ tmux: Ubuntu's own now, tundle and its plugins updated to work from tmux
      2.1 to 3.6, older versions untouched
    ▸ the lock: i3lock-color, painting the same shades the old i3lock did
    ▸ commands: the small scripts come through shundle, and missing programs
      go through cmdfound (more below)
    ▸ network: connman with cmst (AltGr+n), wicd left Ubuntu in 20.04
    ▸ Qt programs (cmst, umplayer): minos' black palette through qt5ct and
      qt6ct, instead of Qt's light default
    ▸ umplayer: ported to Qt 5 with its dark icons; magnifier: built from its
      source instead of shipping a binary
    ▸ vim: about 50 plugins as before, minus python completion, and cloned
      shallow, submodules included: a new ~/.vim went from 142 MB to 45 MB
    ▸ sudo: 26.04 ships sudo-rs, and minos keeps Ubuntu's choice; sudo-rs has
      no insults, so those live on only where the classic sudo runs
    ▸ the installer: deb822 sources, the archive key in /etc/apt/keyrings and
      carried inside the script, and third party sources put back even when
      something fails halfway

Some things left:

    ▸ the browser: the old Firefox let minos drive it deeply, and nothing
      today does, so minos ships none; AltGr+w opens whichever you install
    ▸ mutt and irssi are optional: minos still configures them (3 mail, 4 im),
      installing them is up to you
    ▸ wicd, mpd and ncmpcpp

[cmdfound](/blog/en/2026/10/27/cmdfound.html) deserves a line of its own: on a
minos shell, a command that isn't installed doesn't end in "command not
found", it gets looked up and run.

### Built and checked before it ships

Launchpad still builds the packages, but the recipes moved from bzr to git:
23 sources, each for the three releases. Before a change is pushed it is built
and installed in clean containers of every release, on separate build
machines, with checks for what each fix promises: the i3 config loads, the
compositor starts, the lock paints its colours, Qt programs get the dark
palette. Most of the typing this time was done by AI agents; every decision
about what minos is stayed mine.

### minos.io

[minos.io](http://minos.io) is new too: the page is a minos desktop. Five i3
workspaces, each running the program i3 assigns to it, with the bar's status
at the bottom; `1`-`5` change workspace, `f` maximizes, `Esc` comes back.

### Videos

The best of minos, in one short film:

<video controls muted playsinline preload="none" poster="https://minos.io/videos/resumen-cinco-respuestas-h.jpg" style="width: 100%"><source src="https://minos.io/videos/resumen-cinco-respuestas-h.mp4" type="video/mp4"></video>

The rest play on their own desk of [minos.io](http://minos.io/#tv), one film per
window, like everything else there.

### Vagrant, VirtualBox and Packer

Boxes for VirtualBox: minos-core on 22.04, 24.04 and 26.04, minos-desktop on
24.04. The core ones weigh about 240 MB, like the 2018 boxes did:

    $ vagrant box add https://minos.io/vagrant/core-24.04.json
    $ vagrant init minos/core-24.04 && vagrant up

The same machine without Vagrant, as an appliance:

    $ VBoxManage import minos-core-24.04.ova

Both come from one [Packer recipe](https://github.com/minos-org/packers):
Ubuntu's live-server ISO, installed by Ubuntu's own installer with minos'
install recipe. On a cloud server or inside a plain Ubuntu container, the
one-liner above does the rest.

That's it, happy tiling again &#128522;
