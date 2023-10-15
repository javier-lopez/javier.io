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
    $ colima start
    $ docker run hello-world
    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    70f5ac315c5a: Pull complete
    ...

- [https://github.com/abiosoft/colima](https://github.com/abiosoft/colima)

Happy hacking! &#128522;
