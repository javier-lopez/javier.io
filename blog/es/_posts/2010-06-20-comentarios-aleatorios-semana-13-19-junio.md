---
layout: post
title: "comentarios aleatorios, semana 13-19/junio - motu"
tags: [ubuntu, motu]
description: "En adicion de las entradas que pudiera escribir, intentare subir cada semana comentarios que vaya encontrando tanto en los canales (#ubuntu-bugs, #ubuntu-mot..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

En adicion de las entradas que pudiera escribir, intentare subir cada semana
comentarios que vaya encontrando tanto en los canales (#ubuntu-bugs, #ubuntu-
motu, etc) como en las listas (<https://lists.ubuntu.com/#Development+Lists>).

Aqui la primera entrega, que corresponde a la semana del 13 al 19 de Junio del
2010.

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;geser&gt; build a deb mostly involves: installing the build- dependencies, apply patches if needed, build using the upstream Makefile, install using the upstream Makefile into a stage directory, build the debs from that staging directory
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;geser&gt; crear un paquete deb basicamente implica: instalar las dependencias, aplicar parches segun se requieran, compilar usando el archivo Makefile que viene con el codigo, instalar usando el mismo archivo Makefile dentro de un directorio de pruebas. Crear el paquete deb a partir de ese directorio.
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;dupondje&gt; How can I request a new package into universe? An update of another package is now depending on libopensync-plugin-vformat, but thats not in universe yet…&lt;tumbleweed&gt; dupondje: before debian import freeze, it should come in by itself, afterwards, a sync request works
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;dupondje&gt; Como puedo hacer que un nuevo paquete entre en universe (repositorio)? La actualizacion de un paquete depende de libopensync-plugin-vformat, pero libopensync-plugin-vformat aun no esta en universe…&lt;tumbleweed&gt; dupondje: antes del [DIF][6] (debian import freeze), el paquete deberia sincronizarse automaticamente, despues de ello, una [peticion][7] para sincronizarlo deberia funcionar
</pre>

**#ubuntu-motu:** Abut FTBFS testing

<pre class="sh_sh">
&lt;xteejx&gt; Does it matter that I’m using Lucid?
&lt;Laney&gt; You’ll at least want a maverick chroot, and maybe a VM depending on what you’re up to
</pre>

_**#ubuntu-motu:** Sobre testeo de __[FTBFS][8] (Fails To Build From Source –Paquetes que fallan al compilarse desde el codigo fuente)_

<pre class="sh_sh">
&lt;xteejx&gt; Importa si uso Lucid?
&lt;Laney&gt; Necesitaras al menos un chroot con maverick, y probablemente una maquina virtual dependiendo en lo que estes trabajando
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;ari-tczew&gt; I’m pissed due to outdated packages.ubuntu.com
&lt;Laney&gt; I never use that
&lt;Laney&gt; lp/ubuntu/+source/package is always up to date debdiffs aren’t wrong, but bazaar is like a fashion, modern system for patches
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;ari-tczew&gt; Estoy molesto porque los paquetes de packages.ubuntu.com estan desactualizados
&lt;Laney&gt; Yo nunca uso eso
&lt;Laney&gt; lp/ubuntu/+source/paquete siempre esta en la ultima version, los debdiffs no estan mal, pero bazaar esta de moda, un sistema moderno para manejar los parches.
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;shadeslayer&gt; are there any packaging jobs that i can look at to contribute to MOTU and eventually become one myself?
&lt;micahg&gt; shadeslayer: merges?
&lt;shadeslayer&gt; geser: where do i upload a package once i work upon it?
&lt;geser&gt; shadeslayer: file a bug, attach the debdiff, and subscribe the ubuntu-sponsors team
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;shadeslayer&gt; hay algo relacionado con empaquetamiento que pueda hacer para contribuir con la comunidad y eventualmente convertirme en un MOTU?
&lt;micahg&gt; shadeslayer: [merges][9] (fusiones)?
&lt;shadeslayer&gt; geser: donde subo los paquetes una vez que haya trabajado en ellos?
&lt;geser&gt; shadeslayer: reporta un bug, adjunta el debdiff, y suscribe al equipo ubuntu-sponsors
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;trombonechamp_&gt; How would one go about getting included in the ubuntu repos?
&lt;funkyHat&gt; trombonechamp_: the ideal way to go about it would be to get included in Debian’s repos, then the package will be automatically synced into Ubuntu in the next (or current) development cycle
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;trombonechamp_&gt; Como podria uno incluir paquetes en los repositorios de ubuntu?
&lt;funkyHat&gt; trombonechamp_: la forma ideal seria que incluyeras tus paquetes en los repositorios de Debian (mentors.debian.net) y luego que los paquetes se sincronizaran automaticamente en la siguiente (o en esta misma) version de ubuntu
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;BlackZ&gt; when I do a merge should I do the debdiff between the old ubuntu modified package and the new one modified, right?
&lt;geser&gt; BlackZ: between “new” Debian and “merged” Ubuntu
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;BlackZ&gt; cuando hago un merge, deberia hacer el debdiff entre el paquete anterior de ubuntu y el nuevo, verdad?
&lt;geser&gt; BlackZ: es entre el nuevo paquete de Debian y el que haz combinado (merged) en Ubuntu
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;dupondje&gt; somebody knows if there is a way to build packages remotely ?
&lt;dupondje&gt; want to build maverick packages on my remote debian system 🙂
&lt;micahg&gt; dupondje: pbuilder?
&lt;dupondje&gt; but is there some easy way ? like pbuilder interacts remotely ?
&lt;dupondje&gt; or really need to ssh and do pbuilder remote ?
&lt;pochu&gt; dupondje: you can set up a build farm. DktrKranz wrote something for that, can’t remember its name though
&lt;DktrKranz&gt; dupondje, pochu: something like that is called debomatic
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;dupondje&gt; alguien sabe si hay alguna forma de crear paquetes remotamente?
&lt;dupondje&gt; quiero compilar algunos paquetes para maverick en un sistema remoto que corre debian 🙂
&lt;micahg&gt; dupondje: pbuilder?
&lt;dupondje&gt; no hay una forma mas facil? por ejemplo hacer que pbuilder funcione remotamente?
&lt;dupondje&gt; o realmente necesito logearme via ssh y correr pbuilder?
&lt;pochu&gt; dupondje: puedes crear una granja. DktrKranz escribio algo al respecto, aunque ahora mismo no recuerdo el nombre
&lt;DktrKranz&gt; dupondje, pochu: hay una aplicacion llamada [debomatic][10] que puede hacer eso
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;jariq&gt; I am not sure what to do then there is new upstream release available. Should I create new orig.tar.gz file and start with clean changelog ???
&lt;BlackZ&gt; jariq: nope, just add a new changelog entry, and yes, you need a new .orig.tar.gz for the new upstream release
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;jariq&gt; No estoy seguro de lo que tengo que hacer cuando haya una nueva version en upstream (la pagina del proyecto original). Debo crear un nuevo archivo orig.tar.gz y empezar otro changelog ???
&lt;BlackZ&gt; jariq: no, solo agrega otra entrada en el changelog, por otro lado, si tendras que utilizar el nuevo archivo .orig.tar.gz de upstream
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;xteejx&gt; Would source that builds/compiles with “./configure make make install” be easier to package than something that hasn’t got these, or are these scripts easy enough to make that it doesn’t make any difference?
&lt;cpscotti&gt; afaikm, if you use the standard (./conf, make , make install ) everything will get better for you
&lt;cpscotti&gt; (unless your app is in python or the like)
&lt;xteejx&gt; well I’m not a dev so I’d be picking an easy-ish one to package for my 1st time 🙂
&lt;Laney&gt; I advise you not to start with packaging new software
&lt;xteejx&gt; really? why?
&lt;Laney&gt; both because it’s very difficult and because it tends to lead to unmaintained packages in the archive
&lt;Laney&gt; it’s a better idea to get to grips with how stuff works by fixing existing bugs. And we have enough of those to work on
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;xteejx&gt; Los programas que usan “./configure make make install” son mas faciles de empaquetar que aquellos no lo usan?, o no hay mucha diferencia?
&lt;cpscotti&gt; hasta donde se, si usan la forma estandar (./conf, make , make install ) todo deberia ser mas facil para ti.
&lt;cpscotti&gt; (a menos que tu aplicacion este escrita en python o lenguajes similares)
&lt;xteejx&gt; bueno, no soy programador, asi que creo que escogere uno facil para iniciarme 🙂
&lt;Laney&gt; No te recomiendo que empieces empaquetando nuevos programas
&lt;xteejx&gt; no?, porque?
&lt;Laney&gt; umm, porque es dificil y tiende a crear paquetes que despues no son mantenidos en el archivo (el lugar donde estan los repositorios)
&lt;Laney&gt; es mejor, si quieres familiarizarte, que empiezas corrigiendo bugs. De esos tenemos muchos en los que podrias trabajar.
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;charlie-tca&gt; Bugs marked confirmed mean someone else also has it, or there is enough information to determine it is indeed a bug. there may not be a known workaround for it, though.
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;charlie-tca&gt; Los bugs marcados como ‘confirmados’ quieren decir que alguien mas los tiene o que hay suficiente informacion para determinar que realmente es un bug, eso no significa que exista una forma de arreglarlo todavia.
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;somethinginteres&gt; hi all, some n00b questions: I am wondering if there’s a place I can go to explain the basics of launchpad? What each status of a bug means what ‘branch exists’ means etc. Also, when a patch is submitted for a reported bug how does that fix get to me? Will ubuntu find patches and send them out in the upgrade manager?
&lt;micahg&gt; somethinginteres: help.launchpad.net
&lt;micahg&gt; somethinginteres: patches are reviewed and applied when appropriate
&lt;micahg&gt; somethinginteres: patches normally go through -proposed and then to -updates if they test fine
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;somethinginteres&gt; hola a todos, algunas preguntas de novato: Me pregunto si hay algun lugar donde pueda encontrar como aprender a usar launchpad? Que significa cada etiqueta de estado de los bugs, y lo que significa que exista un ‘branch’ etc. Tambien me gustaria saber que pasa cuando un parche se adjunta a un reporte como llega ese parche a mi?, ubuntu encuentra esos parches y me los envia a traves del gestor de actualizaciones?
&lt;micahg&gt; somethinginteres: [help.launchpad.net][11]
&lt;micahg&gt; somethinginteres: los parches se revisan y se aplican cuando no contienen errores
&lt;micahg&gt; somethinginteres: luego normalmente se suben a -proposed y de ahi a -updates si funcionan correctamente
</pre>

**#ubuntu-devel:** <BlackZ>e.g. 6 months are enough for become a MOTU, if you
have demostrated your skills

<pre class="sh_sh">
&lt;BlackZ&gt; (merge, packaging work, bug fix …)
</pre>

_**#ubuntu-devel:** <BlackZ>por ejemplo, 6 meses son suficientes para
convertirse en un MOTU, si has demostrado suficientementes habilidades<
BlackZ> (combinando, empaquetando, corrigiendo errores …)_

**#ubuntu-devel:**

<pre class="sh_sh">
&lt;ogra&gt; you have to either be MOTU or a delegated team developer before applying for core-dev
</pre>

_**#ubuntu-devel:**_

<pre class="sh_sh">
&lt;ogra&gt; tienes que convertirte ya sea en un MOTU o en un delegado de un equipo de desarrollo antes de aplicar para ser miembro del equipo [core-dev][12]
</pre>

**#ubuntu-devel:**

<pre class="sh_sh">
&lt;BlackZ&gt; netshine: if you join the MOTU team you will be an ubuntu member too
</pre>

_**#ubuntu-devel:**_

<pre class="sh_sh">
&lt;BlackZ&gt; netshine: si te unes al equipo MOTU entonces tambien seras un miembro de ubuntu (y tendras uno de esos aliases @ubuntu.com :)’
</pre>

**#ubuntu-devel:**

<pre class="sh_sh">
&lt;nzmm&gt; whats the ‘official’ way to upgrade to a dev version?
&lt;nzmm&gt; upgrade-manager -d?
&lt;zyga&gt; nzmm, yes
</pre>

_**#ubuntu-devel:**_

<pre class="sh_sh">
&lt;nzmm&gt; cual es la manera ‘oficial’ de actualizar el sistema a la version en desarrollo?
&lt;nzmm&gt; upgrade-manager -d?
&lt;zyga&gt; nzmm, sip
</pre>

**#ubuntu-devel:**

<pre class="sh_sh">
&lt;javanix&gt; hey everyone, who should i talk to (and where do i find them) if i want to help out with development?
&lt;blueyed_&gt; javanix: join #ubuntu-motu and look at wiki.ubuntu.com for starters – try also googling for “ubuntu development”. Also, there are bugs tagged “bitesize” on launchpad.net/ubuntu.
</pre>

_**#ubuntu-devel:**_

<pre class="sh_sh">
&lt;javanix&gt; hola gente, a quien le deberia preguntar (y donde podria encontrar a las personas adecuadas) si quisiera ayudar con el desarrollo de ubuntu?
&lt;blueyed_&gt; javanix: entra a #ubuntu-motu y hechale un ojo a [wiki.ubuntu.com][13] en la parte de principiantes – prueba buscando en google por “[ubuntu development][14]“. y, checa los bugs que tienen la etiqueta “bitesize” en [launchpad.net/ubuntu][15].
</pre>

**#ubuntu-packaging:**

<pre class="sh_sh">
&lt;nigelb&gt; having a pbuilder is not must for having the code.
&lt;nigelb&gt; you can always push to a ppa instead of using pbuilder
</pre>

_**#ubuntu-packaging:**_

<pre class="sh_sh">
&lt;nigelb&gt; usar pbuilder no siempre es necesario
&lt;nigelb&gt; tambien puedes mandar tus cambios a tu [ppa][16] en su lugar
</pre>

**#ubuntu-packaging:**

<pre class="sh_sh">
&lt;svaksha&gt; so wget &lt;lp branch link&gt; should get me the branch
&lt;nigelb&gt; no
&lt;nigelb&gt; svaksha: bzr branch should get you the branch
&lt;geser&gt; svaksha: using wget is like downloading the same file with your browser (e.g. firefox)
&lt;geser&gt; it has nothing to do with “branching” in the context of a version control system (like e.g. bzr)
</pre>

_**#ubuntu-packaging:**_

<pre class="sh_sh">
&lt;svaksha&gt; umm, asi que wget &lt;liga del branch en lp (launchpad)&gt; deberia descargar el branch?
&lt;nigelb&gt; no
&lt;nigelb&gt; svaksha: bzr branch deberia hacerlo
&lt;geser&gt; svaksha: usar wget seria como descargarlo desde tu navegador (por ejemplo firefox)
&lt;geser&gt; no tiene nada que ver con el concepto de “branching” en el contexto de un sistema de control de versiones (como bzr –bazaar–)
</pre>

**#ubuntu-packaging:**

<pre class="sh_sh">
&lt;YoJack&gt; Any good links for creating a debian package ?
&lt;nigelb&gt; &lt;https://wiki.ubuntu.com/PackagingGuide/Complete&gt;
&lt;nigelb&gt; Also, &lt;http://www.debian.org/doc/maint-guide/&gt;
</pre>

_**#ubuntu-packaging:**_

<pre class="sh_sh">
&lt;YoJack&gt; Alguien sabe de algunas ligas donde expliquen como crear paquetes .deb?
&lt;nigelb&gt; &lt;https://wiki.ubuntu.com/PackagingGuide/Complete&gt;
&lt;nigelb&gt; Tambien puedes ver, &lt;http://www.debian.org/doc/maint-guide/&gt;
</pre>

**#ubuntu-packaging:**

<pre class="sh_sh">
&lt;shadeslayer&gt; backports are : packages uploaded to maverick and ‘ backported ‘ to lucid
</pre>

_**#ubuntu-packaging:**_

<pre class="sh_sh">
&lt;shadeslayer&gt; los backports son : paquetes que son subidos a maverick y de ahi exportados a lucid o a una version anterior
</pre>

**#ubuntu-packaging:**

<pre class="sh_sh">
&lt;shadeslayer&gt; micahg: does motu have all their packaging stuff in bzr ?
&lt;micahg&gt; shadeslayer: well, everything in the archive is in bzr
</pre>

_**#ubuntu-packaging:**_

<pre class="sh_sh">
&lt;shadeslayer&gt; micahg: los integrantes del equipo MOTU tienen todos sus paquetes en bzr?
&lt;micahg&gt; shadeslayer: bueno, todo lo que esta en el archivo esta en bzr
</pre>

**#ubuntu-packaging:** About how ppa works

<pre class="sh_sh">
&lt;shadeslayer&gt; you upload your sources and packaging stuff to servers where the packages get built and published 😛
</pre>

_**#ubuntu-packaging:** Sobre como funcionan los repositorios ppa <
shadeslayer> subes tu archivo fuente (.dsc) a los [servidores][17] y ellos se
encargan de compilarlo y publicarlo 😛_

**#ubuntu-classroom:** About how patche management should work

<pre class="sh_sh">
&lt;@dholbach&gt;  in an ideal world, it’d work like this:
&lt;@dholbach&gt;  – we get a patch in ubuntu
&lt;@dholbach&gt;  – we send it to the software authors of that piece of software (upstream)
&lt;@dholbach&gt;  – they like it
&lt;@dholbach&gt;  – it gets integrated
&lt;@dholbach&gt;  – the new release makes it into debian
&lt;@dholbach&gt;  – then we get it
&lt;@dholbach&gt;  sometimes you’ll find that it’s a patch that has only to do with packaging 07:20
&lt;@dholbach&gt;  in that case and if the package is in debian too, you’d just send it to debian 07:21
&lt;@dholbach&gt;  if the package is just in ubuntu, we need to integrate it ourselves
</pre>

_**#ubuntu-classroom:** Sobre como deberia funcionar el manejo de parches_

<pre class="sh_sh">
&lt;@dholbach&gt;  en un mundo ideal, funcionaria de esta manera:
&lt;@dholbach&gt;  – obtenemos un parche en ubuntu
&lt;@dholbach&gt;  – lo mandamos a los autores del software (upstream)
&lt;@dholbach&gt;  – les gusta
&lt;@dholbach&gt;  – lo integran
&lt;@dholbach&gt;  – la nueva version aparece en debian
&lt;@dholbach&gt;  – entonces lo copiamos de ahi
&lt;@dholbach&gt;  algunas veces veran que el parche solo se aplica a un defecto en el paquete
&lt;@dholbach&gt;  en ese caso y si el paquete tambien esta en debian, se manda el parche ahi
&lt;@dholbach&gt;  si el paquete solo esta en ubuntu, entonces nosotros mismos lo integramos
</pre>

  [6]: https://wiki.ubuntu.com/DebianImportFreeze
  [7]: https://wiki.ubuntu.com/SyncRequestProcess
  [8]: https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/glossary
  [9]: https://wiki.ubuntu.com/UbuntuDevelopment/Merging
  [10]: https://launchpad.net/debomatic
  [11]: help.launchpad.net
  [12]: https://launchpad.net/~ubuntu-core-dev
  [13]: wiki.ubuntu.com
  [14]: http://www.google.com/search?client=ubuntu&channel=fs&q=ubuntu+development&ie=utf-8&oe=utf-8
  [15]: launchpad.net/ubuntu
  [16]: https://help.launchpad.net/Packaging/PPA
  [17]: https://edge.launchpad.net/builders

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/06/20/comentarios-aleatorios-1/)
