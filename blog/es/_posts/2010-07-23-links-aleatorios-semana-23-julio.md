---
layout: post
title: "links aleatorios, semana ?-23/julio - motu"
tags: [ubuntu, motu]
description: "No he podido leer mucho ultimamente asi que esta vez añadire lecturas que aun no haya concluido. He terminado de leer las platicas que me habia perdido. Aun sigo pensando que la de..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

No he podido leer mucho ultimamente asi que esta vez añadire lecturas que aun
no haya concluido.

  * <https://wiki.ubuntu.com/UbuntuDeveloperWeek>

He terminado de leer las platicas que me habia perdido. Aun sigo pensando que
la de “getting started” (introduccion al desarrollo de ubuntu) por dholbach y
las de los papercuts, tanto de servidor como de escritorio fueron las mejores
platicas, esto posiblemente se deba a mi bajo nivel tecnico. Otras personas
probablemente opinen diferente.

  * <http://qa.ubuntuwire.org/ftbfs/>

Aqui es donde se reportan los paquetes que fallan en la compilacion desde su
codigo fuente (fail to build from source), prometo a mi mismo intentar
solucionar un par de estos antes del domingo o me arranco el curita.

  * <https://wiki.ubuntu.com/PbuilderHowto>

Por recomendacion de dholbach (que bien me cae este tipo, jaja, creo que a
todos, al grado que he visto una foto donde aparece como el “osito cariñosito”
de ubuntu) estoy releyendo esta wiki, tratando de encontrarle sentido a cada
una de las opciones, esto despues de irritarlo al extremo con reiteradas
preguntas sobre el tema. Uno que es bruto.

  * <http://nullcortex.com/2009/12/visualizing-team-membership/>

Se trata sobre un script que crea un grafico sobre la pertenencia de
determinado usuario (en launchpad) a los grupos (en launchpad cualquier puede
crear grupos, de ahi que existan muchisimos y algunas veces termines perdido),
para correr el script basta con descargarlo con bazaar (necesito leer una guia
para aprender a usar esto)

<pre class="sh_sh">
$ bzr branch lp:~bnrubin/+junk/lpdot
$ sudo apt-get install python-pydo
$ BROWSER=firefox ./lpdot.py chilicuil #ustedes pongan su nick
</pre>

Abrira firefox y pedira permisos para que el script pueda accesar a
determinados datos de su cuenta, yo le di de lectura no personales, cosa que
basto. Ya que pertenezco a muy pocos grupos mi imagen es bastante humilde,
para que no se viera tan egocentrico el asunto tambien he subido la de mi
tutor, [mrand][81]. Es una maravilla ese pedazo de codigo!

[![][82]][82]

[![][83]][83]

  

  * <http://behindmotu.wordpress.com/>

A traves de <ubuntu-motu_A_T_lists.ubuntu.com> (tendra utilidad que intente
proteger la direccion de la lista?) me he enterado de este inspirador blog, se
trata de entrevistas con varios MOTU’s. Conviene la pena hecharle un ojo, solo
con fines recreacionales.

Tambien he empezado a leer:

<http://www.debian.org/doc/maint-guide/ch-start.en.html>

<http://www.debian.org/doc/debian-policy/ch-scope.html>

Dos manuales obligados si realmente quiero convertirme en un MOTU, sin embargo
estos francamente los terminare en un buen tiempo, tengo la mala costumbre
(por que no creo que sea practico) de leer sobre cada termino que no entiendo,
en este caso es practicamente sobre todas las utilidades, me siendo como si
fuera uno de esos bots de google, intentando indexar todo lo que encuentra a
su paso… Tal vez algun dia comprenda que eso es estupido y que mas vale buscar
conforme se requiera, por el momento ese es mi metodo.

Estos ultimos dos los vengo haciendo en segundo plano, por el momento tambien
tengo que empezar a leer mas detalladamente sobre triaging bugs (clasificar
bugs), mi tutor me ha pedido que lea las siguientes wikis:

  * <https://wiki.ubuntu.com/BugSquad/GettingInvolved>
  * <https://wiki.ubuntu.com/BugSquad>
  * <https://wiki.ubuntu.com/Bugs/HowToTriage>
  * <https://wiki.ubuntu.com/Bugs/Status>
  * <https://wiki.ubuntu.com/Bugs/Importance>
  * <https://wiki.ubuntu.com/Bugs/Tags>

Asi que tengo trabajo por delante.

  [81]: https://launchpad.net/~mrand
  [82]: /assets/img/viajemotu-links-aleatorios-semana-23-julio-1.png
  [83]: /assets/img/viajemotu-links-aleatorios-semana-23-julio-2.png

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/07/23/links-aleatorios-3/)
