---
layout: post
title: "using colima to run docker on a mac"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

## Install docker / docker-compose

    $ brew install docker
    $ brew install docker-compose
    $ docker run hello-world
    docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

## Install colima

    $ brew install colima

## Configure colima

[Cannot chown or chmod bind mounted files/dirs](https://github.com/abiosoft/colima/issues/83#issuecomment-1339269542)

    $ cat $HOME/.colima/_lima/_config/override.yaml
    mountType: 9p
    mounts:
  - location: "/Users/<USERNAME>"
    writable: true
    9p:
      securityModel: mapped-xattr
      cache: mmap
  - location: "~"
    writable: true
    9p:
      securityModel: mapped-xattr
      cache: mmap
  - location: /tmp/colima
    writable: true
    9p:
      securityModel: mapped-xattr
      cache: mmap

## Use colima

    $ colima start --mount-type 9p #or colima start --cpu 4 --memory 8 --mount-type 9p
    $ docker run hello-world
    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    70f5ac315c5a: Pull complete
    ...

- [https://github.com/abiosoft/colima](https://github.com/abiosoft/colima)

Happy hacking! &#128522;
