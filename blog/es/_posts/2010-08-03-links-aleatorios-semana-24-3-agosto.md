---
layout: post
title: "links aleatorios, semana 24-3/agosto - motu"
tags: [ubuntu, motu]
description: "Esta semana me he concentrado en asignar paquetes a los reportes que no tienen uno, estos reportes son de los mas faciles porque muchos de ellos los puedes c..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Esta semana me he concentrado en asignar paquetes a los reportes que [no
tienen][91] uno, estos reportes son de los mas faciles porque muchos de ellos
los puedes convertir en preguntas o invalidar. Explico un poco como he
entendido el asunto o como no lo he entendido. Cuando reportas un error, la
[forma correcta][92] es hacerlo con $ ubuntu-bug, este comando adjunta un buen
de archivos sobre tu sistema, y asigna el error a determinado paquete fuente
(source package), sin embargo muchos usuarios tambien reportan errores desde
launchpad y olvidan ese dato, sin ello es muy probable que el reporte quede
sin solucionarse porque nadie se entera de su existencia. Al momento de
asignarle paquete, se hace un ping al “encargado” del paquete y es mas facil
que puedan verlo. Esta parte no me queda clara, por un lado he leido una y
otra vez que Ubuntu no tiene mantenedores, pero luego esta esta caracteristica
en lp. El procedimiento es muy sencillo, he leido al menos 3 veces la wiki:
<https://wiki.ubuntu.com/Bugs/FindRightPackage> y configurado mi sistema para
que use los scripts de grasemonkey. El detalle estaba en instalar el paquete
‘firefox-lp-improvements‘, yo lo habia hecho manualmente descargando cada
archivo .js. Entonces cada vez (para ser completamente sincero, no siempre
hago el ping) que quiero asignar un paquete, encuentro el paquete fuente, hago
un ping en #ubuntu-bugs para corroborar, le doy en ‘No-package’ y gm
(gracemonkey, de ahora en adelante) autocompleta un comentario y asigna el
paquete al paquete fuente que deseo. Al ser mis primeros pasos me suscribo a
cada uno de los reportes que toco, y he leido con alegria que despues de
reasignarlos por lo general alguna persona con mayores conocimientos le da una
leida rapida, le asigna mejor importancia, empieza a trabajar en ella o la
anula por falta de datos, genial =)

<https://wiki.ubuntu.com/Bugs/HowToTriage/Charts>

Un dia de estos terminare imprimiendolo para pegarlo en mi pared.

<https://web.archive.org/web/20171024015234/http://hall-of-fame.ubuntu.com/>

Inspirador

<http://www.debian.org/doc/maint-guide/ch-dreq.en.html#fr14>

Voy lento, pero seguro, ahora mismo estoy leyendo dh*, un conjunto de scripts
en perl que hacen basicamente toda la empaquetacion.

<https://wiki.ubuntu.com/UbuntuGlobalJam>

Del 27 al 29 de agosto, abran algunas conferencias virtuales, al estilo del
Ubuntu developer week pero enfocandose mucho mas en el arreglo de bugs. Tengo
la fantasia de algun dia poder correr un Local Jam por aqui, con un poco de
suerte el proximo año.

  [91]: https://bugs.launchpad.net/ubuntu/+bugs?field.searchtext=&orderby=-datecreated&field.status%3Alist=NEW&field.importance%3Alist=UNDECIDED&assignee_option=none&field.assignee=&field.bug_reporter=&field.bug_contact=&field.bug_commenter=&field.subscriber=&field.component-empty-marker=1&field.status_upstream-empty-marker=1&field.omit_dupes.used=&field.omit_dupes=on&field.has_patch.used=&field.has_cve.used=&field.tag=&field.tags_combinator=ANY&field.has_no_package.used=&field.has_no_package=on&search=Search
  [92]: https://help.ubuntu.com/community/ReportingBugs

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/08/03/links-aleatorios-semana-24-3agosto/)
