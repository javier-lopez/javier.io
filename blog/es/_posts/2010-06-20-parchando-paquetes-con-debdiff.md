---
layout: post
title: "parchando paquetes con debdiff - motu"
tags: [ubuntu, motu]
description: "Esta y la siguiente entrada originalmente fueron escritos en mi blog , los muevo aqui porque estan mejor relacionados con la tematica de este blog. Introducc..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

_Esta y la siguiente entrada originalmente fueron escritos en
miblog, los muevo aqui porque estan mejor relacionados con la tematica
de este blog._

**Introduccion.**

En la ultima version de Ubuntu existe un error en [mpd][20] que hace que se
detenga al reproducir archivos mp4a, el bug en cuestion esta documentado en
varios [sitios][21], el [parche][22] tambien esta disponible e integrado en la
ultima version de upstream (upstream es como se llama al proyecto original,
Debian es el upstream de Ubuntu y Ubuntu es el downstream de Debian), asi el
upstream del paquete mpd puede ser el paquete en Debian si se habla del
paquete o el sitio donde se desarrolla mpd si se habla del programa.

[Launchpad][23] tambien alberga el error
(<https://bugs.launchpad.net/ubuntu/+source/mpd/+bug/519787>).

**Desarrollo**

Se puede empezar creando una carpeta para el paquete en cuestion (apt-get
source descargara mas de 3 paquetes desde el lugar donde se invoque).
Personalmente he creado una carpeta en ~/misc/packages/ubuntu-10.04 y luego un
alias ‘ubuntu’ que me ubica en el directorio independientemente de donde este.

<pre class="sh_sh">
$ mkdir mpd; cd mpd #se crea un directorio  para aislar todo
$ sudo apt-get install devscripts ubuntu-dev-tools  cdbs quilt
$ sudo  apt-get source mpd
</pre>

Descarga el codigo fuente de mpd _debianizado_ (esto es, con diffs y archivos
de control/rules/patches/etc)

<pre class="sh_sh">
$ sudo  apt-get build-dep mpd
</pre>

Descarga las dependencias del paquete para comprobar que funcione despues de
hacer cualquier cambio

<pre class="sh_sh">
$ cd  mpd-0.15.4; vim src/algun_archivo.fuente
</pre>

Y en este punto se modifica el codigo, para este caso particular tuve que
hacerlo a mano porque el parche no funcionaba al 100%, pero para otros casos o
solo se editan detalles, como cambio de directorios/variables o se aplica el
respectivo parche, espero comentar en mi siguiente entrada como hacerlo con
[quilt][24] , un metodo un poco más elegante. Es indispensable que se tenga
una idea clara de como funciona patch y diff
(<https://web.archive.org/web/20240809185331/http://www.gnu.org/software/diffutils/manual/diff.html>), otra guia un poco
mas digerible esta en: (<http://andalinux.wordpress.com/2009/08/24/crear-y-aplicar-parches-patches-en-linux/>).

Una vez editado se actualiza debian/changelog:

<pre class="sh_sh">
$ dch  -i
</pre>

La ventaja de editarlo con dch es que agrega automaticamente la version del
paquete y tambien el email y la hora en el formato adecuado. La modificación
al changelog se hace dependiendo de como se vea el resto, tratando de mantener
el estilo. Si esta es la primera entrada, el estilo bien podria ser (para este
caso particular):

_mpd (0.15.4-1ubuntu4) lucid; urgency=low_

_* Apply patch from upstream to fix LP: #519787  
– usr/decoder/ffmpeg_plugin.c (Debian bug #556198)  
ffmpeg: align the output buffer_

_— chilicuil <chilicuil@i.am> Mon, 17 May 2010 08:14:46 -0500_

Con estilo me refiero a la forma en la que se introducen los comentarios, el
esqueleto por decirlo de alguna forma **siempre** debe ser como se muestra:

_paquete - > version del paquete -> version de la distribucion -> urgencia_

_descripcion muy breve de los errores que cierra, o caracteristicas que
integra_

_descripcion mas extensa, describiendo cada uno de los archivos que se
modificaron y que se hizo en cada caso, tambien se vale mencionar errores de
otros bugtracks._

La version del paquete tambien tiene algunas consideraciones, como regla
general, si el paquete ya existia en Ubuntu (lo mas probable, al hablar de
parches), es decir, si termina en ubuntu**X** , donde **X** es un numero, se
le suma +1, esto ara que apt-get prefiera este paquete sobre el original.
Tambien se puede cambiar por algo como ubuntu**X** ~usuario**X,** para indicar
que es un paquete personal. Cualquiera de las 2 es valida, mas tarde espero
que alguien me aclare cuando usar una en lugar de la otra, que yo tampoco lo
tengo muy claro.

**OPCIONAL:**

No hay que olvidar modificar debian/control si el paquete aun no tiene
mantenedor en Ubuntu, en ese caso se debe cambiar:

_Maintainer: Original developer <dev@debian.org>_

por:

_Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>_

_XSBC-Originial-Maintainer: Original developer <dev@debian.org>_

Eso es todo a partir de aqui se pueden hacer 3 cosas (hasta donde se).

  * Se puede crear un paquete con el codigo (con las instrucciones necesarias para compilarlo) y con el que se aran los debdiff (el formato estandar que se maneja en launchpad para enviar parches).

<pre class="sh_sh">
$  debuild -S; cd .. ; debdiff mpd_0.15.4-1ubuntu3.dsc  \
mpd_0.15.4-1ubuntu4.dsc &gt; mpd_0.15.4-1ubuntu4.debdiff
</pre>

El ultimo es el que se envia

  * Se puede generar un archivo con los cambios e instrucciones para compilar, que se puede subir a launchpad para crear un [ppa][25] (repositorio personal) que distribuya los *.deb

<pre class="sh_sh">
$  debuild -S -sd #si el paquete ya existia \
en ubuntu, o con -sa si  no existe aun
$ cd ..; dput ppa:chilicuil/pmx  mpd_0.15.4-1ubuntu4.source.changes
</pre>

Esto empujara los cambios a launchpad –en codigo fuente, se compilaran los
debs finales en la nube

  * O se pueden crear los *.deb en local para su instalación inmediata.

<pre class="sh_sh">
$  debuild
</pre>

En cuyo caso el *deb aparecera en el directorio superior ($ cd ..), los 3
comandos anteriores firmaran los paquetes con la clave de **$DEBEMAIL** , si
no se desea asi, se tienen que especificar las opciones -us -uc

Al terminar y si no se quiere conservar el paquete, se elimina exceptuando
mpd_0.15.4-1ubuntu4.debdiff, para recuperar el entorno o para probar que el
parche se aplica sin errores se usa esto:

<pre class="sh_sh">
$ mkdir mpd_nuevo; cd mpd_nuevo
$ sudo  apt-get source mpd; cp ~/mpd/mpd_0.15.4-1ubuntu4.diff  \
~/mpd_nuevo/
$ cd   mpd-0.15.4/
</pre>

Cuando se hace apt-get source el paquete es descomprimido, este es el
‘original’ (no es 100% original, puesto que ya esta debianizado)

<pre class="sh_sh">
$ patch -p1 &lt; ../mpd_0.15.4-1ubuntu4.debdiff
</pre>

El resultado deberia poder volver a general los 3 paquetes descritos con
anterioridad.

Los parches se pueden integrar a los reportes de launchpad:

**====Resumiendo===**

  * Se decarga desde apt-get source el paquete y sus dependencias
  * Se modifica el codigo, reglas, changelog
  * Se crea un paquete fuente y de ahi un parche, o un paquete fuente para subirse a launchpad, o se compila el binario. Claro que tambien se pueden hacer las 3 si se desea.

Referencias:

  * <https://wiki.ubuntu.com/Bugs/HowToFix>
  * [http://www.youtube.com/watch?v=SAxFpKBG-bU&feature=channel][27]
  * <http://blog.bodhizazen.net/linux/launchpad-ppa-tips/>
  * [http://ubuntuforums.org/showthread.php?s=1e88fa1ad823decb139b63258360baeb&t=929498][28]

  [20]: http://mpd.wikia.com/wiki/Music_Player_Daemon_Wiki
  [21]: http://us.generation-nt.com/answer/bug-556198-mpd-segfault-when-trying-play-m4a-aac-lc-file-help-168868501.html?page=2
  [22]: http://tinyurl.com/2d2usxt
  [23]: https://launchpad.net/
  [24]: https://web.archive.org/web/20260802205332/http://savannah.nongnu.org/projects/quilt
  [25]: https://help.launchpad.net/Packaging/PPA
  [27]: http://www.youtube.com/watch?v=SAxFpKBG-bU&feature=channel
  [28]: http://ubuntuforums.org/showthread.php?s=1e88fa1ad823decb139b63258360baeb&t=929498

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/06/20/parchando-paquetes-con-debdiff/)
