---
layout: post
title: "talks: empaquetado de software para ubuntu"
tags: [talks, ubuntu]
description: "Di una charla sobre empaquetado en el TelmexHub. La pregunta equivocada es cómo hago un .deb — la buena es hasta dónde quieres que llegue tu paquete. Cinco caminos, un mapa, y una profecía..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Di una charla sobre **empaquetado de software para Ubuntu** en el
TelmexHub, Ciudad de México. La tesis: la pregunta equivocada es *"¿cómo
hago un `.deb`?"* — la buena es *"¿hasta dónde quiero que llegue mi
paquete?"*. Porque un `.deb` no tiene nada de mágico:

<pre class="sh_sh">
$ ar t hello_1.0_amd64.deb
debian-binary
control.tar.gz
data.tar.gz
</pre>

Eso es todo: un archivo `ar` con dos tarballs adentro — el control
(metadatos, dependencias, scripts) y los datos (los archivos que se
instalan). Cualquiera puede fabricar uno a mano. Lo difícil no es el
formato: es la **distancia** que quieres que recorra.

<pre>
 tu código ──┬─► ar a mano ──────► .deb ──► hospedaje propio
             ├─► checkinstall ───► .deb ──► tu máquina, y ya
             ├─► fpm ────────────► .deb/.rpm/.gem… ──► tus repos
             └─► debian/ formal ─► source package
                                       │  dput
                                       ▼
                                      PPA ──► daily builds ──► usuarios
                                       │
                                       ▼
                             archivo oficial de Ubuntu/Debian
</pre>

La guía de decisión que armamos en la charla:

- **¿Solo quieres instalarlo en TU máquina sin que dpkg pierda el
  rastro?** → `checkinstall`: intercepta el `make install` y lo vuelve
  paquete. Muy fácil, rápido, está en los repos oficiales — pero
  requiere root y su resultado no puede entrar a un PPA.
- **¿Quieres entender qué hay adentro, o no tienes un sistema Debian a
  mano?** → a mano con `ar`. Fácil, rápido, educativo — pero casi sin
  documentación, y a lo que produzcas te tocará hospedarlo tú (con
  `apt-ftparchive` montas tu propio repositorio).
- **¿Distribuyes a varios formatos (deb, rpm, gem) desde un solo
  lugar?** → [fpm](https://github.com/jordansissel/fpm), *effing package
  management*: muy fácil, poderoso, convierte entre formatos, con
  comunidad activa y sin depender de dpkg. Su único pecado: sus
  paquetes tampoco entran a un PPA.
- **¿Quieres PPA, daily builds, o que tu paquete termine en el archivo
  oficial?** → no hay atajo: empaquetado **formal** con el directorio
  `debian/`. Es el único camino con recompensa completa — `dput` al PPA,
  recetas de bzr-builder para builds diarios desde tu repo público, y la
  posibilidad de integrarte a Debian/Ubuntu — pero el costo es real:
  entre formatos de fuente, helpers y flujos hay *por lo menos 32
  combinaciones* documentadas de procedimientos. Mi conclusión en la
  charla, textual: **empaquetar formalmente es difícil; si pueden,
  evítenlo — tienen mejores cosas que hacer.**

Cerramos asomándonos al futuro: [0install](https://0install.net/)
(universal, sin root), [nix](https://nixos.org/) (declarativo,
funcional), los *click packages* de Ubuntu 14.04+ (un `manifest.json`,
instalación a nivel usuario) y la propuesta de systemd sobre btrfs con
actualizaciones por deltas. Y la provocación final para el público: los
sistemas de empaquetamiento de Ubuntu/RedHat tienen 15 años —
**difícilmente sobrevivirán otros 15**.

Los slides están en
[people.ubuntu.com/~javier-lopez/talks/empaquetado-de-software-para-ubuntu](http://people.ubuntu.com/~javier-lopez/talks/empaquetado-de-software-para-ubuntu/).
