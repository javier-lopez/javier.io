---
layout: post
title: "talks: infraestructura como codigo"
tags: [talks, devops, vlide]
description: "Durante casi un año di una serie de charlas en el meetup Infraestructura como Código, CDMX: provisionamiento con vagrant y terraform, packer, docker y docker compose, ansible y shell scripting. Cada sesión con su video y su one-liner para revivirla en tu terminal..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Entre diciembre de 2017 y septiembre de 2018 di una serie de charlas en el
meetup [Infraestructura como Código](https://www.meetup.com/Infraestructura-como-codigo)
(Ciudad de México), recorriendo el stack DevOps de arriba hacia abajo:
primero provisionar máquinas, luego contenedores, luego configurarlas, y
al final la pieza que sostiene todo lo demás — la shell. Las sesiones se
transmitieron en vivo por hangouts; tres quedaron grabadas y están
embebidas en su bloque.

Todas se presentaron desde la terminal con
[vlide.vim](https://github.com/javier-lopez/vlide.vim): cada deck abre con
su portada ASCII de arte espacial, pide una sesión de tmux (los slides
abren panes y les mandan keystrokes para correr sus propias demos), y
cierra con un crawl de créditos estilo Star Wars — campo de estrellas
incluido — escrito en vimscript.

### 1 · Provisionamiento de infraestructura: vagrant, cloudformation, terraform

**2 de diciembre de 2017.** La charla fundacional de la serie: por qué
codificar infraestructura. El argumento es que el código tiene propiedades
que un servidor configurado a mano jamás tendrá — es auditable,
reproducible, autodocumentado, reutilizable y transparente. Y la regla
cultural que da el filtro: **CLI != IAC, SSH != IAC** — iniciar sesión en
un servidor a instalar paquetes, crear imágenes a mano o abrir tickets
para pedir recursos son las prácticas que hay que aprender a reconocer y
eliminar.

De ahí, el mapa del ecosistema por capas — saber qué herramienta juega en
qué posición evita compararlas mal:

<pre>
 gestor de versiones ──────── git / svn / hg
 provisionamiento ─────────── vagrant / terraform / cloudformation / cobbler
 gestor de configuraciones ── ansible / puppet / chef / saltstack
 generador de artefactos ──── packer / kickstart / preseed / Dockerfile
 consumidor de artefactos ─── docker / ec2 / gce / virtualbox
 orquestador de servicios ─── kubernetes / docker swarm / nomad
</pre>

Las demos: `vagrant init && vagrant up && vagrant ssh` como hello world, y
después el salto a infraestructura real — un cluster en alta
disponibilidad (keepalived + haproxy + nginx en round robin) levantado
localmente desde [vagrants](https://github.com/javier-lopez/vagrants), y
el mismo patrón en la nube con terraform contra DigitalOcean desde
[terraforms](https://github.com/javier-lopez/terraforms):
`init`, `plan`, `apply`, `destroy` — el ciclo de vida completo de la
infraestructura en cuatro comandos.

<pre class="sh_sh">
$ wget -qO- https://raw.githubusercontent.com/javier-lopez/talks/master/iac/provisionamiento-de-infraestructura-vagrant-cloudformation-terraform/vlide.md | vim +Vlide -
</pre>

### 2 · IAC spotlight

**Febrero de 2018.** Sesión formato demo: mínima teoría, una herramienta
tras otra encadenadas para mostrar cómo se complementan.

- **Vagrant + ansible** — el cluster HA de la sesión anterior, pero ahora
  provisionado por ansible, con un `while :; do curl; done` mostrando el
  round robin en vivo.
- **Packer** — fabricar tus propias imágenes base: de un JSON de
  definición sale una box de OpenBSD 6.2
  (`packer build` → `vagrant box add` → `vagrant up`).
- **Docker compose** — una app de microblogging completa con un
  `git clone` y un `setup.sh`.
- **Terraform + docker swarm + traefik** — el gran final: terraform
  levanta un cluster de 6 nodos (3 managers, 3 workers) en DigitalOcean,
  y encima se despliegan tres stacks con `docker stack deploy`: traefik
  como reverse proxy, un visualizador del cluster y un servicio echo que
  responde al curl en round robin a través de traefik.

<pre class="sh_sh">
$ wget -qO- https://raw.githubusercontent.com/javier-lopez/talks/master/iac/iac-spotlight/vlide.md | vim +Vlide -
</pre>

### 3 · Contenedores de software: docker y docker compose

**Agosto de 2018.** La sesión abre con tres pares de historias — el mismo
rol, con y sin docker: José pasa su primera semana instalando dependencias
mientras Jimena hace `docker-compose up` y programa el mismo día; Carmen
malabarea Java 5/6/7/8 y Python 2/3 para probar 5 proyectos mientras
Marcos reproduce cualquier entorno al instante; Federico le teme a cada
release mientras Mónica libera varias veces al día con rollback
automático.

La definición didáctica que estructura todo: un contenedor es una
**plantilla de archivos + un punto de entrada**. Y para demostrar que no
hay magia, el deck destripa `hello-world` en vivo — `docker inspect` para
leer el entrypoint y `docker image save | tar tvf -` para abrir la imagen
con tar y vim (el mismo truco que usé con `ar` en
[la charla de empaquetado](/blog/es/2015/06/15/talks-empaquetado-de-software-para-ubuntu.html):
si un formato se deja abrir, se deja entender).

De ahí, cuatro Dockerfiles progresivos — de un `echo` a un servidor web
con `EXPOSE` y mapeo de puertos — y el paso natural a compose: los mismos
`docker build`/`docker run` de antes, pero declarados en un
`docker-compose.yml` (convención sobre configuración), cerrando con un
stack real nginx + flask + mongodb.

<iframe src="https://www.youtube.com/embed/_R004Xn_wxc" title="DevOps Tools: Docker, Docker-compose" style="width:100%;max-width:720px;aspect-ratio:16/9;border:0;display:block;margin:0 auto" allowfullscreen></iframe>

<pre class="sh_sh">
$ wget -qO- https://raw.githubusercontent.com/javier-lopez/talks/master/iac/docker-compose/vlide.md | vim +Vlide -
</pre>

### 4 · Provisionamiento de infraestructura: vagrant

**Agosto de 2018.** ¿Para qué máquinas virtuales cuando ya existen los
contenedores? Para todo lo que un contenedor no puede: balanceadores y
proxies inversos, docker sobre Windows/Mac, software de otras plataformas
— la demo hace hello world con OpenBSD, Windows 10 y Solaris, los tres
desde el mismo `vagrant init`.

Los conceptos espejo con docker: una box es una plantilla de archivos +
metadatos, y el `Vagrantfile` es el equivalente del `docker-compose.yml`
— el TAO de vagrant es que cualquier proyecto se replique con un solo
`vagrant up`. Como la virtualización es lenta, buena parte de la sesión
son trucos de velocidad: linked clones, ajustar CPU/RAM, cachés de
paquetes (`vagrant-cachier`) e imágenes base pre-cocinadas con packer.
Después, los tres provisionadores (file, shell, ansible) y los plugins
útiles.

El cierre es el demo más teatral de la serie: el cluster HA de keepalived
donde se van matando nodos — y el `while :; do curl 10.10.10.10; done`
sigue respondiendo mientras la IP virtual flota de un haproxy al otro.
Alta disponibilidad que se ve, no que se cuenta.

<iframe src="https://www.youtube.com/embed/fHxsPMfXgRo" title="DevOps Tools: Vagrant" style="width:100%;max-width:720px;aspect-ratio:16/9;border:0;display:block;margin:0 auto" allowfullscreen></iframe>

<pre class="sh_sh">
$ wget -qO- https://raw.githubusercontent.com/javier-lopez/talks/master/iac/vagrant/vlide.md | vim +Vlide -
</pre>

### 5 · Configuración de infraestructura: ansible

**Agosto de 2018.** El principio rector es la **idempotencia**: ejecutar
la receta dos veces produce el mismo resultado — lo que un shell script no
garantiza sin esfuerzo. Frente a chef/puppet, ansible gana en simpleza:
sin agentes y sin dependencias en los nodos (con su lista honesta de
contras: menos módulos, sin reportería).

Lo más práctico de la sesión es el problema del huevo y la gallina del
**bootstrapping**: el primer playbook corre con `remote_user: root` y
`gather_facts: no`, porque ni el usuario ansible ni python existen todavía
en la máquina recién nacida. De ahí, la anatomía de un proyecto real:
inventarios por entorno (prod/dev) con secretos cifrados en
`ansible-vault`, playbooks que aplican roles por grupo de nodos, y roles
con su estructura de tasks, handlers (`notify: restart docker`) y
plantillas jinja2.

El caso de uso integra todo: un cluster docker swarm levantado por vagrant
y provisionado por ansible, con traefik y su visualizador al frente.

<pre class="sh_sh">
$ wget -qO- https://raw.githubusercontent.com/javier-lopez/talks/master/iac/ansible/vlide.md | vim +Vlide -
</pre>

### 6 · Shell scripting

**Septiembre de 2018.** La sesión con la que cerré la serie, dedicada a la
pieza que está debajo de todas las demás: la shell como código pegamento
por excelencia — UNIX como IDE, el principio de composición.

La postura técnica de la charla: escribir **POSIX**, no bashisms
(`printf` y no `echo`, `[` y no `[[`, `case` y no `=~`), bajo el lema
*write once, run anywhere* — el mismo script corre en ksh/bash/dash/zsh
sobre Linux, macOS, *BSD y Cygwin. Después el lenguaje completo en
miniatura: dos tipos de datos (números y cadenas), control de flujo,
funciones como predicados (`_is_root`, `_validmail` con `case`), y las
trampas clásicas — `for f in $(ls)` está tres veces MAL en el slide, con
[la explicación de wooledge](https://mywiki.wooledge.org/ParsingLs) al
lado. Cierra con el kit de supervivencia: `bash -x`, un profiler propio y
[shellcheck](https://www.shellcheck.net/), y un caso de uso real — el
postinstalador que automatiza instalar software que las distribuciones
tienen desactualizado, de [learn](https://github.com/javier-lopez/learn).

<iframe src="https://www.youtube.com/embed/HU2yOTqk2yg" title="DevOps Tools: Shell Scripting" style="width:100%;max-width:720px;aspect-ratio:16/9;border:0;display:block;margin:0 auto" allowfullscreen></iframe>

<pre class="sh_sh">
$ wget -qO- https://raw.githubusercontent.com/javier-lopez/talks/master/iac/shell-scripting/vlide.md | vim +Vlide -
</pre>

### Cómo revivirlas

Cada one-liner abre su deck listo para navegar — con
[vlide.vim](https://github.com/javier-lopez/vlide.vim) instalado, espacio
avanza y backspace retrocede; sin vlide, igual se dejan leer. Córrelos
**dentro de una sesión de tmux**: los slides abren panes y ejecutan sus
demos ahí — con las herramientas instaladas la demo corre de verdad
(vagrant levanta máquinas, terraform toca la nube), sin ellas solo verás
los comandos intentarlo. El material completo — slides, `setup.sh` y demos
— está en
[github.com/javier-lopez/talks](https://github.com/javier-lopez/talks/tree/master/iac).
