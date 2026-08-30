---
layout: post
title: "links aleatorios, semana 21-26/junio - motu"
tags: [ubuntu, motu]
description: "Al igual que los \u201ccomentarios aleatorios\u201d, empezare a modo de reporte a escribir sobre algunos de los blogs/wikis/manuales que vaya leyendo y la impresion qu..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Al igual que los “comentarios aleatorios”, empezare a modo de reporte a
escribir sobre algunos de los blogs/wikis/manuales que vaya leyendo y la
impresion que me vayan dejando, probablemente todas esas impresiones no valgan
la pena tomar muy en serio, asi que deben tomarse con recelo.

Aqui el primer reporte, que corresponde a la semana 21-26 de Junio del 2010.

  * <http://daniel.holba.ch/blog/?cat=15>

Contiene una clase de FAQ no oficial. Altamente recomendable. Es una pena que
la ultima entrada sobre “Ask MOTU” haya sido hecho a finales del 2008.

  * <https://wiki.ubuntu.com/MOTU/Videos>

Contiene enlaces a varios videos, al parecer la idea esta abandonada, en
especial los tutoriales de “[Nicolas Valcárcel][42]“, quien solo nos muestra
como preparar el entorno para empezar a empaquetar pero corta abruptamente la
serie, no quiero parecer tan desalmado para quejarme sobre ese hecho, pero
esos videos en Español hacen falta en la comunidad latinoamericana, aunque por
otra parte tambien pienso que cualquiera que quisiera estar interesado en
participar deberia ser capaz de comunicarse en Ingles, esto en la practica no
siempre es posible (incluyendome). Lo agrego en mi lista de que haceres.

  * <https://wiki.ubuntu.com/UbuntuBugDay/BugsForExtraPoints>

El 24 de Junio fue un “[UbuntuBugDay][43]“, en ese dia se supone que se reunen
varios desarrolladores para concentrarse en arreglar muchos de los bugs
relacionados con un solo paquete. Me he pasado por #ubuntu-bugs para ofrecer
mi ayuda y aprender un poco mas del proceso al mismo tiempo, sin embargo no he
visto mucho movimiento asi que lo he dejado, ni modo, espero participar en el
siguiente Ubuntu bug day cuando (espero) tenga mayor experiencia. Me ha
parecido gracioso hasta morir el primer comentario que se encuentra en el
wiki, sobre el peor bug de Ubuntu, el [#1][44]

  * <http://lintian.debian.org/manual/>

Un mini manual (de 3 paginas) sobre lintian, un programa que sirve para
verificar que no haya errores al empaquetar paquetes fuente (.dsc) o binarios
(.deb). Despues de leer sobre la opcion -i, me he puesto a ver como estaban
los paquetes que hasta entonces habia descargado, jaja, ha sido un sin
sentido…

<pre class="sh_sh">
$ for paquete in `ls /var/cache/apt/archives/*.deb`;\
  do echo =======================; echo $paquete; \
  lintian -biv $paquete; echo; done|less
</pre>

Hasta entonces apenas habia notado la existencia de lintian (despues de correr
‘debuild’), pero ahora lo tengo un poco mas claro y eso me agrada :). Sin
embargo aun me ha quedado la duda de como verificar todos los paquetes desde
un directorio ($LINTIAN_DIST)

  * <http://www.xs4all.nl/~carlo17/howto/debian.html>
  * <http://www.eyrie.org/~eagle/notes/debian/>

El primer link son notas revueltas sobre el uso de dpkg, apt-file y un pequeño
how-to de parcheo de paquetes (incompleto desde mi punto de vista). El segundo
es un compendio mucho mas general de debian, aunque tiene partes especificas
de empaquetado y arreglo de errores (mucho mas completo).

  * <https://bugs.launchpad.net/ubuntu/+bug/596127>

Un curioso reporte al estilo del #1, una persona se queja de que los reportes
que manda no son respondidos y si lo son los errores no son corregidos, un
comportamiento mucho mas comun para el resto de usuarios mortales (como yo),
supongo.

Desde mi punto de vista este es un reporte valido, creo que es una buena idea
que los miembros de los diferentes equipos que se encargan de marcar (triage)
los bugs pudieran irse rotando el papel de “working on it” (o trabajando en
el), en parte para recordarse a si mismos la existencia de estos errores y en
otra para mostrar a la comunidad la cantidad de esfuerzo y de gente
involucrada que hay en ubuntu. Me imagino un bonito log de 30 paginas o mas
llena de gente rotandose el bug :)’

Tambien esta el otro pensamiento, este error no tiene una solucion practica,
es decir, no hay forma de que jamas Ubuntu pueda cerrar todos los errores que
tiene, esto porque esta limitado a nuestra naturaleza humana, propensa a
errores. Asi que estaria abierto por siempre, algo que podria ser frustante
para los que trabajan en la distribucion.

Igual sigo creyendo que seria romantico tenerlo abierto, solo por si acaso 😉

  [42]: http://www.youtube.com/watch?v=SLpoi5PlFP8
  [43]: https://wiki.ubuntu.com/UbuntuBugDay/
  [44]: https://bugs.launchpad.net/ubuntu/+bug/1

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/06/27/links-aleatorios-1/)
