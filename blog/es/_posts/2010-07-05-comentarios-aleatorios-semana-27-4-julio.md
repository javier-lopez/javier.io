---
layout: post
title: "comentarios aleatorios, semana 27-4/julio - motu"
tags: [ubuntu, motu]
description: "Tercera entrega que corresponde a la semana del 27 al 4 de Julio del 2010. #ubuntu-bugs : < dkulchenko> If I\u2019ve been experiencing frequent kernel panics sinc..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Tercera entrega que corresponde a la semana del 27 al 4 de Julio del 2010.

**#ubuntu-bugs**

<pre class="sh_sh">
&lt;dkulchenko&gt; If I’ve been experiencing frequent kernel panics since I switched to Lucid, what should I file the bug against?
&lt;micahg&gt; dkulchenko: linux
</pre>

_**#ubuntu-bugs**_

<pre class="sh_sh">
&lt;dkulchenko&gt; si he estado teniendo [kernel panics][53] desde que me cambie a Lucid, a que paquete deberia reportar el error?
&lt;micahg&gt; dkulchenko: linux
</pre>

**#ubuntu-devel**

<pre class="sh_sh">
&lt;slangasek&gt; does BuildLiveCD also get updated on every build?
&lt;ogra_cmpc&gt; nope
</pre>

_**#ubuntu-devel**_

<pre class="sh_sh">
&lt;slangasek&gt; se actualiza el BuildLiveCD en cada compilacion? ## umm, debo aclararme a mi mismo luego que es el ‘BuildLiveCD’
&lt;ogra_cmpc&gt; nop
</pre>

**#ubuntu-devel**

<pre class="sh_sh">
&lt;pitti&gt; known bugs are better then breaking existing functionality
</pre>

_**#ubuntu-devel**_

<pre class="sh_sh">
&lt;pitti&gt; es preferible mantener errores en los paquetes que romper funcionalidades
</pre>

**#ubuntu-meeting**

<pre class="sh_sh">
&lt;lex79&gt; cdbs is fast for write a package
&lt;lex79&gt; debhelper is the new way 🙂
&lt;lex79&gt; but seems high quality than cdbs
&lt;lex79&gt; indeed, minion likes cdbs _**#ubuntu-meeting** :
&lt;lex79&gt; cdbs es rapido para crear un paquete
&lt;lex79&gt; mientras que debhelper es un nuevo metodo 🙂
&lt;lex79&gt; tambien parece ser que es de mejor calidad que cdbs
&lt;lex79&gt; aunque, a minion le gusta cdbs
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;dupondje&gt; whats the policy with packages that are removed in debian btw ?
&lt;Laney&gt; we usually follow them
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;dupondje&gt; por cierto, cual es la politica que corresponde a los paquetes que han sido eliminados en debian?
&lt;Laney&gt; normalmente los eliminamos
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;gubatron&gt; hi, is there a dh_&lt;something&gt; tool to copy your postinst script? (so I don’t do an ugly cp in my debian/rules)
&lt;Laney&gt; to copy it to where?
&lt;gubatron&gt; DEBIAN/
&lt;Laney&gt; yep, that’s dh_installdeb
&lt;gubatron&gt; you rule Laney17:47
&lt;ajmitch&gt; you shouldn’t ever need to touch the DEBIAN dir at all
&lt;gubatron&gt; it worked, thanks Laney. ajmitch: that’s what we want. The debian/rules file looks beautiful now. thanks.
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;gubatron&gt; hola, existe alguna herramienta del tipo
&lt;dh_&lt;algo&gt; para copiar los scripts [postinst][54]? (y asi no tenga que usar el horroso cp en el archivo debian/rules)
&lt;Laney&gt; para copiarlos donde?
&lt;gubatron&gt; DEBIAN/
&lt;Laney&gt; sip, [dh_installdeb][55]
&lt;gubatron&gt; gracias Laney
&lt;ajmitch&gt; aunque no deberias modificar el directorio DEBIAN para nada
&lt;gubatron&gt; funciono, gracias Laney. ajmitch: eso es lo que quiero. Ahora el archivo debian/rules (##este no es mas que un #makefile, aunque tecnicamente podria ser un ./configure o cualquier otro) luce fabulos, gracias.
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;Rhonda&gt; What do people put into the debian/changelog for backports? Version number and the likes?
&lt;Laney&gt; Source change backport from XX to YY (LP: #zzzzzz)
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;Rhonda&gt; Que es lo que la gente pone en el archivo debian/changelog cuando declara un backport ?(##paquetes que iran a parar a una version anterior a la que se usa en desarrollo, lucid para maverick) que numero de version y esas cosas?
&lt;Laney&gt; Source change backport from XX to YY (LP: #zzzzzz) ##no tengo idea de como traducir esto, =)
</pre>

**#ubuntu-motu**

<pre class="sh_sh">
&lt;tumbleweed&gt; test in a pbuilder if you can
&lt;shadeslayer&gt; tumbleweed: sure… i can use that too.. its just that qtcreator takes about 90 mins to build 😛
&lt;shadeslayer&gt; i can use debuild -nc if something goes wrong with debuild
&lt;shadeslayer&gt; not with pbuilder
&lt;tumbleweed&gt; shadeslayer: /usr/share/doc/pbuilder/examples/C10shell
&lt;shadeslayer&gt; tumbleweed: the hook that exits to shell?
&lt;shadeslayer&gt; i have it.. can i run debuild nc with it?
&lt;tumbleweed&gt; that hook fires up a shell and installs vim so you can look around and try things. not too sure what you are asknig on the second line
&lt;shadeslayer&gt; tumbleweed: ^^
&lt;shadeslayer&gt; oh sorry
&lt;shadeslayer&gt; tumbleweed: i meant that after i drop to shell,can i run debuild -nc ?
&lt;tumbleweed&gt; it’s a root shell, and doesn’t have devscripts installed, so I noramlly just do debian/rules binary
&lt;shadeslayer&gt; hm
&lt;tumbleweed&gt; not quite identical to building in fakeroot, but you can work out what’s wrong, test solutions, and then try again
</pre>

_**#ubuntu-motu**_

<pre class="sh_sh">
&lt;tumbleweed&gt; pruebalo si te es posible en pbuilder
&lt;shadeslayer&gt; tumbleweed: seguro… tambien puedo usarlo.. solo que tomara como 90 min para compilarlo 😛
&lt;shadeslayer&gt; puedo usar [debuild][56] -nc (##debuild acepta las mismas opciones ademas de las suyas de [dpkg-buildpackage][57] , gracias a dererkazo de #debian-es por explicarme esto) si falla debuild
&lt;shadeslayer&gt; pero no con pbuilder
&lt;tumbleweed&gt; shadeslayer: /usr/share/doc/pbuilder/examples/C10shell
&lt;shadeslayer&gt; tumbleweed: el script que devuelve una shell?
&lt;shadeslayer&gt; ok.. puedo correr debuild -nc con el?
&lt;tumbleweed&gt; el script regresa una shell e instala vim para que puedas probar cosas, no estoy seguro de lo que quieres hacer con la segunda pregunta
&lt;shadeslayer&gt; tumbleweed: ^^
&lt;shadeslayer&gt; ohh, perdon
&lt;shadeslayer&gt; tumbleweed: quiero decir que si despues de que me regresa la shell, puedo correr debuild -nc ?
&lt;tumbleweed&gt; es una shell con permisos de super usuario, y no tiene el paquete devscripts instalado, asi que normalmente deberias ser capaz de correr el script debian/rules
&lt;shadeslayer&gt; hm
&lt;tumbleweed&gt; tampoco es lo mismo compilarlo ahi que en fakeroot, pero seguro es suficiente para poder ver lo que esta mal, y para que puedas probar soluciones
</pre>

## Notas del traductor

  [53]: http://es.wikipedia.org/wiki/Kernel_panic
  [54]: http://www.debian.org/doc/FAQ/ch-pkg_basics.en.html
  [55]: http://www.tin.org/bin/man.cgi?section=1&topic=dh_installdeb
  [56]: http://man.he.net/man1/debuild
  [57]: http://man.cx/dpkg-buildpackage%281%29

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/07/05/comentarios-aleatorios-3/)
