---
layout: post
title: "parchando paquetes con quilt - motu"
tags: [ubuntu, motu]
description: "Esta originalmente fue escrita en mi blog , la muevo aqui porque esta mejor relacionada con la tematica de este blog. Introduccion rxvt-unicode es una emulad..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

_Esta originalmente fue escrita en mi blog, la muevo aqui
porque esta mejor relacionada con la tematica de este blog._

**Introduccion**

[rxvt-unicode][32] es una emulador de terminal ligero, lo mas sobresaliente es
su modo demonio, de esa forma se pueden lanzar muchas terminales sin consumir
demasiados recursos. En la ultima version de Ubuntu, viene con soporte para 88
colores, y un parche dentro del paquete de codigo fuente para obtener los 256
que son utiles para algunos programas como vim. Un reporte al respecto se
encuentra tanto en [Debian][33] como en [Ubuntu][34], [quilt][35] es una forma
de manejar parches, al igual que [dpatch][36]

**Desarrollo**

Al igual que en la entrada anterior, se crea una carpeta donde se aislara todo
el proceso y se descarga el codigo fuente junto con sus dependencias:

<pre class="sh_sh">
$ mkdir rxvt; cd rxvt
$ apt-get source rxvt-unicode
$ sudo apt-get build-dep rxvt-unicode
$ cd rxvt-unicode-9.06/
$ less doc/urxvt-8.2-256color.patch
</pre>

Aqui mismo se puede observar los archivos que modifica, que son 4:

> – rxvt-unicode/configure.ac
>
> – rxvt-unicode/src/feature.h
>
> – rxvt-unicode/src/init.C
>
> – rxvt-unicode/src/rxvt.h

Antes de continuar hay que establecer la ruta donde quilt buscara los parches:

<pre class="sh_sh">
$ export QUILT_PATCHES=debian/patches
</pre>

Por defecto, quilt buscara en /patches, es una buena idea agregar la variable
anterior a ~/.bashrc, despues de eso ya se pueden empezar a crear parches,
para hacerlo primero hay que dar de alta un parche, definir los archivos que
modificara, hacer los cambios y pedirle a quilt que genere el parche, para
este caso concreto:

<pre class="sh_sh">
$   quilt new urxvt-8.2-256color.patch
Patch urxvt-8.2-256color.patch is now on top
</pre>

Ahora se agregan los 4 archivos que se modificaran:

<pre class="sh_sh">
$ quilt add configure.ac
File configure.ac added to patch  urxvt-8.2-256color.patch
$ quilt add src/feature.h
File src/feature.h added to patch  urxvt-8.2-256color.patch
$ quilt add src/init.C
File src/init.C added to patch  urxvt-8.2-256color.patch
$ quilt add src/rxvt.h
File src/rxvt.h added to patch  urxvt-8.2-256color.patch
</pre>

Ya se pueden modificar, sin embargo como en este caso (seguro hay muchos mas
casos similares) el parche ya esta hecho, solo lo aplicamos:

<pre class="sh_sh">
$ patch -p1 &lt; doc/urxvt-8.2-256color.patch
patching file configure.ac
Hunk #1  succeeded at 90 (offset -14 lines).
Hunk #2 succeeded at 125 (offset  -24 lines).
Hunk #3 succeeded at 154 (offset -27 lines).
...................
</pre>

Finalmente se hace que quilt genere el parche, que se guardara en
/debian/patches

<pre class="sh_sh">
$ quilt refresh
Refreshed patch urxvt-8.2-256color.patch
</pre>

El parche ya esta creado, puede verse con:

<pre class="sh_sh">
$ less debian/patches/urxvt-8.2-256color.patch
</pre>

Ahora mismo el parche esta aplicado, para regresar el arbol a su estado
original, se usa ‘pop’:

<pre class="sh_sh">
$ quilt pop -a
Removing  patch urxvt-8.2-256color.patch
Restoring src/init.C
Restoring  src/rxvt.h
Restoring src/feature.h
Restoring configure.ac
No patches applied
</pre>

La opcion -a, indica que se deben remover todos los parches, en este ejemplo
solo se tiene 1, asi que $ quilt pop hubiera dado el mismo resultado. Se puede
jugar un poco con quilt para acostumbrarse a el, si se ejecuta:

<pre class="sh_sh">
$ quilt push
Applying patch urxvt-8.2-256color.patch
patching file  configure.ac
patching file src/feature.h
patching file  src/init.C
patching file src/rxvt.h
Now at patch  urxvt-8.2-256color.patch
</pre>

Se vuelve a parchar, para efectos de empaquetamiento, siempre se debe dejar en
el estado original, es decir hay que quitar todos los parches $ quilt pop -a

El archivo debian/patches/series nos indica cuales y en que orden se aplican
las modificaciones, a proposito de parches, hay una aplicacion en ubuntu-dev-
tools que se llama ‘what-patch’, que si se ejecuta dentro de la carpeta
/debian o en su superior nos avisa que sistema de parches usa si es que
utiliza uno.

Para integrar quilt al proceso de construccion, se creara un archivo en
debian/source/format con la cadena “3.0 (quilt)”, esto solo funciona en
versiones recientes de ubuntu (supongo que de debian tambien), [metodos
alternativos][37].

<pre class="sh_sh">
$ mkdir -pv debian/source
mkdir: created directory `debian/source'
$  echo "3.0 (quilt)" &gt; debian/source/format
</pre>

Y se agrega el archivo debian/README.source para informar que este paquete usa
quilt, el texto por defecto es:

<pre class="sh_sh">
$ cat  debian/README.source
This  package uses quilt to manage all modifications to the upstream source.
Changes are stored in the source package as diffs in debian/patches and
applied during the build.
See  /usr/share/doc/quilt/README.source for a detailed explanation.
</pre>

Hasta ahi llega el manejo de quilt propiamente dicho, solo faltaria actualizar
el changelog y en este caso particular la edicion de los scripts postinst
(post-instalacion) y prerm (pre-remove) que actualizara [terminfo,  
][38]

Esta vez he probado agregando ~chilicuil1,en lugar de $version_anterior+1,
quedando el paquete de esta forma:

_rxvt-unicode (9.06-3ubuntu1~chilicuil1) lucid; urgency=low_

NOTA: Al parecer, hay que especificar la $version+1+nick# si se quiere crear
“una rama” personalizada, aun no entiendo muy claramente esto, lo anterior
queda:

> _rxvt-unicode (9.06-3ubuntu2~chilicuil1) lucid; urgency=low_

Finalmente se crea el diff, se crean los debs y se sube el codigo fuente a
lauchpad.

<pre class="sh_sh">
$  debuild -S; cd ..;
$ debdiff rxvt-unicode_9.06-3ubuntu1.dsc \
rxvt-unicode_9.06-3ubuntu2~chilicuil1.dsc\
 &gt; rxvt-unicode_9.06-3ubuntu2~chilicuil1.debdiff
$ cd rxvt-unicode-9.06/; debuild -S  -sd; cd ..
$ dput ppa:chilicuil/pmx  \
rxvt-unicode_9.06-3ubuntu2~chilicuil1_source.changes
$ cd  rxvt-unicode-9.06/; debuild
</pre>

Me pregunto si abra una forma de crear los 3 con un solo comando…

Se instala el paquete:

<pre class="sh_sh">
$ cd  ..;
$ sudo dpkg -i \
rxvt-unicode_9.06-3ubuntu2~chilicuil2_i386.deb
</pre>

Referencias:

  * <http://www.miriamruiz.es/weblog/?p=134>
  * <https://wiki.ubuntu.com/Bugs/HowToFix>
  * <https://web.archive.org/web/20170910200600/http://pkg-perl.alioth.debian.org:80/howto/quilt.html>
  * <http://scie.nti.st/2008/10/13/get-rxvt-unicode-with-256-color-support-on-ubunut>

  [32]: http://software.schmorp.de/pkg/rxvt-unicode.html
  [33]: http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=493481
  [34]: https://bugs.launchpad.net/ubuntu/+source/rxvt-unicode/+bug/578129
  [35]: https://wiki.ubuntu.com/PackagingGuide/Howtos/Quilt
  [36]: https://wiki.ubuntu.com/PackagingGuide/Howtos/Dpatch
  [37]: https://web.archive.org/web/20170910200600/http://pkg-perl.alioth.debian.org:80/howto/quilt.html
  [38]: http://en.wikipedia.org/wiki/Terminfo

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/06/20/parchando-paquetes-con-quilt/)
