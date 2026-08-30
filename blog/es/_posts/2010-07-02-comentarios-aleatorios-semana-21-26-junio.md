---
layout: post
title: "comentarios aleatorios, semana 21-26/junio - motu"
tags: [ubuntu, motu]
description: "Segunda entrega que corresponde a la semana del 21 al 26 de junio del 2010. #ubuntu-bugs : About kernel syncs < ogasawara> xteejx: right, we rebase with each..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Segunda entrega que corresponde a la semana del 21 al 26 de junio del 2010.

**#ubuntu-bugs** : About kernel syncs

<pre class="sh_sh">
&lt;ogasawara&gt; xteejx: right, we rebase with each 2.6.35-rc# candidate as they come out
</pre>

_**#ubuntu-bugs** : Sobre la sincronizacion del kernel_

<pre class="sh_sh">
&lt;ogasawara&gt; xteejx: correcto, sincronizamos el paquete base con cada version de 2.6.35-[rc#][45] que va saliendo
</pre>

**#ubuntu-bugs**

<pre class="sh_sh">
&lt;cwillu&gt; what’s the email address to email to a launchpad bug report?
&lt;cwillu&gt; &lt;bug#&gt;@bugs.launchpad.net?
&lt;cwillu&gt; ah, yep; just showed up
</pre>

_**#ubuntu-bugs**_

<pre class="sh_sh">
&lt;cwillu&gt; cual es el correo de los bugs que estan en launchpad?
&lt;cwillu&gt; &lt;#bug&gt;@bugs.launchpad.net?
&lt;cwillu&gt; oh, sip; lo acabo de encontrar
</pre>

**#ubuntu-devel**

<pre class="sh_sh">
&lt;zyga&gt; dholbach, where does ubuntu developer week take place? #ubuntu-meeting?
&lt;dholbach&gt; zyga: #ubuntu-classroom
</pre>

_**#ubuntu-devel**_

<pre class="sh_sh">
&lt;zyga&gt; dholbach, donde se va a dar el “[ubuntu developer week][46]” (la semana del desarrollador de ubuntu), en #ubuntu-meeting?
&lt;dholbach&gt; zyga: #ubuntu-classroom
</pre>

**#ubuntu-devel**

<pre class="sh_sh">
&lt;encodec&gt; hey all
&lt;encodec&gt; i want to understand how packages work
&lt;encodec&gt; by that i mean…
&lt;encodec&gt; who compiles them
&lt;encodec&gt; how are they added to package system
&lt;cjwatson&gt; developers upload source packages; they’re compiled by automatic build servers
&lt;encodec&gt; how?
&lt;cjwatson&gt; please expand on your question
&lt;encodec&gt; well i guess in linux its just a ./configure make script..
&lt;cjwatson&gt; dpkg-buildpackage is the official entry point
&lt;cjwatson&gt; unpack source package, cd into unpacked tree, run dpkg- buildpackage -b
&lt;cjwatson&gt; that calls debian/rules with various arguments, behind the scenes
&lt;cjwatson&gt; and debian/rules takes care of whatever the specifics of the package are. not everything is ./configure &amp;&amp; make
&lt;encodec&gt; ok ok
&lt;encodec&gt; what describes the dependencies, destination paths and such things?
&lt;cjwatson&gt; encodec: debian/control describes dependencies, although many of them are worked out dynamically by dpkg-shlibdeps
&lt;cjwatson&gt; encodec: destination paths are done by a mix of things; it’s easiest to run dpkg-buildpackage on a package and watch its output
&lt;cjwatson&gt; sometimes it’s the upstream build scripts (Makefile or whatever), sometimes debian/*.install, sometimes manual commands written directly into debian/rules, it varies
</pre>

_**#ubuntu-devel**_

<pre class="sh_sh">
&lt;encodec&gt; hola a todos
&lt;encodec&gt; me gustaria entender como funcionan los paquetes
&lt;encodec&gt; y con eso quiero decir..
&lt;encodec&gt; quien los compila
&lt;encodec&gt; como se agregan a los repositorios, etc
&lt;cjwatson&gt; encodec: los desarrolladores suben paquetes de codigo fuente (.dsc); y estos luego son compilados por servidores automatizados
&lt;encodec&gt; como?
&lt;cjwatson&gt; por favor se más concreto con tu pregunta
&lt;encodec&gt; bueno, yo creo que debería bastar con correr ./configure &amp; make
&lt;cjwatson&gt; dpkg-buildpackage es el punto oficial de entrada
&lt;cjwatson&gt; luego se descomprime el paquete fuente, se mueve a la carpeta descomprimida y se corre dpkg-buildpackage -b
&lt;cjwatson&gt; eso llama a debian/rules con varios parametros detras de escena
&lt;cjwatson&gt; y debian/rules se encarga de cualquier detalle que pueda tener el paquete, no todo es ./configure &amp;&amp; make
&lt;encodec&gt; ok ok
&lt;encodec&gt; como se describen las dependencias, el lugar donde se pondran los binarios y esas cosas?
&lt;cjwatson&gt; encodec: el archivo debian/control describe las dependencias, aunque muchas de ellas se descubren dinamicamente con dpkg-shlibdeps
&lt;cjwatson&gt; encodec: el lugar a donde se copian los binarios se conforman por una mezcla de cosas, es mas facil usar dpkg-buildpackage sobre un paquete y ver su salida para darse una idea
&lt;cjwatson&gt; algunas veces es el script que viene de upstream (ya sea un Makefile o cualquier otra cosa), otras veces son los archivos debian/*.install, o puede que sean comandos a escritos directamente en debian/rules, varia.
</pre>

**#ubuntu-devel**

<pre class="sh_sh">
&lt;KIAaze&gt; what is the name of the program/script to test install/uninstall/upgrade/etc of a package?
&lt;KIAaze&gt; I remember reading about something like that, but I can’t find it anymore
&lt;ScottK&gt; piuparts?
&lt;KIAaze&gt; yes, that looks like it. Thanks. 🙂
</pre>

_**#ubuntu-devel**_

<pre class="sh_sh">
&lt;KIAaze&gt; como se llama el script/programa que sirve para instalar/desinstalar/actualizar/etc un paquete?
&lt;KIAaze&gt; Recuerdo haber leido algo por el estilo, pero no puedo encontrarlo
&lt;ScottK&gt; [piuparts][47]?
&lt;KIAaze&gt; si, creo que ese es. Gracias 🙂
</pre>

**#ubuntu-packaging**

<pre class="sh_sh">
&lt;qnull&gt; hello everybody. Is it possible to let launchpad build packages for different versions of ubuntu (lucid, maverick) from just one source package?
&lt;geser&gt; no, you need one upload for each release (you just need to change the upload target and modify the version slightly as each version can only be uploaded once)
&lt;qnull&gt; thanks for reply! You mean the target in the changelog?
&lt;geser&gt; yes
&lt;qnull&gt; It’s kinda stupid that you have to modify the source for that, isn’t it?
&lt;geser&gt; but also required by the archive layout. As all debs for a source package are in the same directoy, you need different file names for each release which can be acomplished by changeing the version string
</pre>

_**#ubuntu-packaging:**_

<pre class="sh_sh">
&lt;qnull&gt; hola a todos. Será posible hacer que launchpad cree paquetes para diferentes version de ubuntu (lucid, maverick), desde un solo paquete fuente (.dsc)?
&lt;geser&gt; no, necesitas subirlo para cada version (lo unico que tienes que cambiar es el objetivo y la versión del paquete, ya que solo puedes subir 1 vez una version determinada)
&lt;qnull&gt; gracias! cuando dices el objetivo, te refieres a la versión de ubuntu en el changelog?
&lt;geser&gt; sip
&lt;qnull&gt; es un tanto estupido que tengas que modificar el paquete fuente para eso, no lo creen?
&lt;geser&gt; pero es requerido para conservar la estructura del archivo (donde se guardan los .deb). Ya que todos los debs del mismo paquete fuente se guardan en el mismo directorio, necesitas una forma de diferenciarlo con los paquetes de las otras versiones de ubuntu, y esto se logra modificando la version en el changelog.
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;micahg&gt; kaushal: In Ubuntu, we generally don’t have maintainers
&lt;micahg&gt; kaushal: it’s in universe, so MOTU is responsible for packaging
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;micahg&gt; kaushal: En Ubuntu, normalmente no tenemos mantenedores
&lt;micahg&gt; kaushal: esta en universe, asi que el equipo MOTU es responsable del mismo
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;slytherin&gt; Rhonda: Is there any particular reason why you repackage upstream tarball as .tar.gz for wesnoth?
&lt;Rhonda&gt; Because source format 1.0 doesn’t support .tar.bz2?
&lt;directhex&gt; presumably for backportability
&lt;directhex&gt; that’s the usual reason to repack these days
&lt;Rhonda&gt; And the benefits of source format 3.0 are pretty minor when one is using quilt already
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;slytherin&gt; Rhonda: hay alguna razon particular por la que hayas recomprimido el archivo tarball de upstream de wesnoth a un .tar.gz?
&lt;Rhonda&gt; porque un paquete fuente en formato 1.0 no soporta archivos .tar.bz2?
&lt;directhex&gt; probablemente para que sea capaz de mandarlo a versiones anteriores ([backports][48])
&lt;directhex&gt; esa es la razon mas frecuente para recomprimir
&lt;Rhonda&gt; eso y que las facilidades que pudiera darme un [formato 3.0][49] serian minimos si ya estoy usando quilt
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;shadeslayer_&gt; geser: uh… im using the new source format … the one with debian/source/format
&lt;shadeslayer&gt; so no need to use the get-orig-source part?
&lt;maxb&gt; You can use source format 1.0 with an explicit debian/source/format – that doesn’t tell us anything 🙂
&lt;shadeslayer&gt; maxb: so what do i have to do for fomat v3 ?
&lt;maxb&gt; To enable use of it? Have a debian/source/format that contains “3.0 (quilt)” or “3.0 (native)”
&lt;shadeslayer&gt; maxb: thats what i have 😛
&lt;maxb&gt; Right, the point was just that “the one with debian/source/format” doesn’t actually say anything
&lt;geser&gt; shadeslayer: no need for get-orig-source in this case (see point 4 in
&lt;http://wiki.debian.org/Projects/DebSrc3.0&gt;)
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;shadeslayer_&gt; geser: uh… estoy usando el nuevo formato … el que se usa con debian/source/format
&lt;shadeslayer&gt; asi que no necesito usar la parte de get-orig-source verdad?
&lt;maxb&gt; puedes usar el formato 1.0 con un archivo /debian/source/format explicito – eso no nos dice nada 🙂
&lt;shadeslayer&gt; maxb: umm, entonces que tengo que hacer para declararlo con el formato v3 ?
&lt;maxb&gt; para poder usarlo? debes tener un archivo /debian/source/format que contenga “3.0 (quilt)” o “3.0 (native)”
&lt;shadeslayer&gt; maxb: eso es lo que tengo 😛
&lt;maxb&gt; correcto, el punto era que si mencionas que tienes el formato que usa /debian/source/format no nos dices nada
&lt;geser&gt; shadeslayer: no hay necesidad de usar ‘get-orig-source‘ en este caso (ve el punto 4 en &lt;http://wiki.debian.org/Projects/DebSrc3.0&gt;)
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;carstenh&gt; gubatron: lintian is very helpful to find errors in the package, after you made this dget some/url/whatever.dsc part work and build the package locally you should run lintian -I -E –pedantic *.changes to see packaging errors and warnings
&lt;carstenh&gt; (or without options to see the more major ones if the list is very long)
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;carstenh&gt; gubatron: lintian es muy util para encontrar errores en los paquetes, despues de correrlo usa dget para descargar cualquier/url/descripcion.dsc y compilar el paquete localmente, ejecuta lintian con las opciones -I -E –pedantic *.changes para ver que errores/advertencias de avienta
&lt;carstenh&gt; (o sin ellas para ver las mas importantes en caso de que la lista sea muy larga)
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;Laney&gt; the orig.tar.gz should be in the parent directory of the root of your packaging
&lt;Laney&gt; ie debian/../..
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;Laney&gt; el paquete original (orig.tar.gz) deberia estar en el directorio superior de donde tienes el paquete descomprimido
&lt;Laney&gt; por ejemplo debian/../..
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;gastons&gt; Is it possible to use optional dependencies in a control file?
&lt;gastons&gt; Depends: openjdk-6-jre / sun-java6-jre
&lt;micahg&gt; gastons: yes, give a read to the policy 7.1
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;gastons&gt; es posible declarar dependencias opcionales en el archivo /debian/control?
&lt;gastons&gt; Depends: openjdk-6-jre / sun-java6-jre
&lt;micahg&gt; gastons: si, checate la seccion [7.1][50] de las [normas][51] (policy)
</pre>

13:09

<pre class="sh_sh">
&lt;shadeslayer&gt; so no need to use the get-orig-source part? 13:09
&lt;maxb&gt; You can use source format 1.0 with an explicit debian/source/format – that doesn’t tell us anything 🙂 13:10
&lt;shadeslayer&gt; maxb: so what do i have to do for fomat v3 ? 13:13
&lt;maxb&gt; To enable use of it? Have a debian/source/format that contains “3.0 (quilt)” or “3.0 (native)” 13:17
&lt;shadeslayer&gt; maxb: thats what i have 😛 13:17
&lt;maxb&gt; Right, the point was just that “the one with debian/source/format” doesn’t actually say anything 13:21
&lt;geser&gt; shadeslayer: no need for get-orig-source in this case (see point 4 in &lt;http://wiki.debian.org/Projects/DebSrc3.0&gt;)
</pre>

  [45]: http://kerneltrap.org/node/4044
  [46]: https://wiki.ubuntu.com/UbuntuDeveloperWeek
  [47]: http://piuparts.debian.org/
  [48]: https://help.ubuntu.com/community/UbuntuBackports
  [49]: http://www.debian.org/doc/maint-guide/ch-dother.en.html#s-sourcef
  [50]: http://www.debian.org/doc/debian-policy/ch-relationships.html#s-depsyntax
  [51]: http://www.debian.org/doc/debian-policy/

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/07/02/comentarios-aleatorios-2/)
