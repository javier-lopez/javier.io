---
layout: post
title: "como arreglar bugs con bzr –version corta - motu"
tags: [ubuntu, motu]
description: "De la presentacion de dholbach en #ubuntu-classroom : \u2013 bzr branch lp:ubuntu/<pkg> \u2013 cd <pkg> # work on the fix \u2013 dch -i (to document it) \u2013 debcommit (to com..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

De la presentacion de [dholbach][93] en [#ubuntu-classroom][94]:

<pre class="sh_sh">
bzr branch lp:ubuntu/&lt;pkg&gt;
cd &lt;pkg&gt;
# work on the fix
dch -i        # to document it
debcommit     # to commit locally
bzr bd -- -S -us -uc   # build a source package you can pass to pbuilder and other tools
# test-build the package and test it locally
bzr push lp:&lt;lpid&gt;/ubuntu/&lt;release&gt;/&lt;pkg&gt;/&lt;branchname&gt;
bzr lp-open
# click 'propose for merging'
# DONE
</pre>

_En espanol:_

<pre class="sh_sh">
bzr branch lp:ubuntu/&lt;pkg&gt;   # descarga la ultima version del codigo fuente del paquete
cd &lt;pkg&gt;
# trabaja en el parche
dch -i        # documenta
debcommit     # hace un 'commit' localmente
bzr bd -- -S -us -uc   # crea un paquete .dsc que puede pasarse a pbuilder u otras herramientas
# compilar y probar localmente
bzr push lp:&lt;lpid&gt;/ubuntu/&lt;release&gt;/&lt;pkg&gt;/&lt;branchname&gt;   # envia los cambios a tu cuenta de launchpad
bzr lp-open   # abre una pagina que describe los cambios y ofrece enviarlos a ubuntu
# hacer click en 'propose for merging' -- eso enviara tus cambios al equipo ubuntu-branches
# LISTO! =)
</pre>

You must have the bzr-builddeb package installed / Se debe tener el paquete
bzr-builddeb instalado.

_NOTA: se pueden ver las ramas en las que se ha trabajado en:_
<https://code.launchpad.net/~nombre_de_usuario>

Relacionado: [parchando paquetes con quilt + bzr - motu](/blog/es/2010/08/14/parchando-paquetes-con-quilt-bzr.html)

  [93]: http://daniel.holba.ch/blog/
  [94]: http://irclogs.ubuntu.com/2010/08/05/%23ubuntu-classroom.html

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/08/06/como-arreglar-bugs-con-bzr-version-corta/)
