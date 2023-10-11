---
layout: post
title: "install tmux on windows 10"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Download and install [https://www.msys2.org/#installation](https://www.msys2.org/#installation)

If behind a firewall, compress as gz or bz2, upload a custom server and download from it, eg:

  - [http://f.javier.io/public/bin/msys2-x86_64-20221028.exe.gz](http://f.javier.io/public/bin/msys2-x86_64-20221028.exe.gz)
  - [http://f.javier.io/public/bin/msys2-x86_64-20221028.exe.bz2](http://f.javier.io/public/bin/msys2-x86_64-20221028.exe.bz2)

## Install tmux

    $ pacman -S tmux

If behinf a firewall (SSL issue), modify **/etc/pacman.conf**:

    >> XferCommand = /usr/bin/curl --insecure -L -C - -f -o %o %u

And Git:

    $ git config --global http.sslVerify false

Copy tmux and dependencies to Git for Windows path:

    $ cp C:\msys64\usr\bin\tmux C:\msys64\usr\bin\msys-event* C:\Program Files\Git\usr\bin

Restart Git for Windows

## Extra

If you want to keep msys2 you may want to change the **$HOME** directory so it points to the same place as Git for Windows, modify **/etc/nsswitch.conf**

    db_home: windows

Happy hacking!
