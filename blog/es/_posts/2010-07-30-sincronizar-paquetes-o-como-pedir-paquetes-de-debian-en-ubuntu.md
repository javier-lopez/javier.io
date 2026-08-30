---
layout: post
title: "sincronizar paquetes, o como pedir paquetes de debian en ubuntu"
tags: [ubuntu, motu]
description: "Al rededor del 70% de las aplicaciones de Ubuntu son copiadas de Debian sin hacer un solo cambio (ojo, esta cifra me la he sacado de la manga, pero igual cre..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Al rededor del 70% de las aplicaciones de Ubuntu son copiadas de Debian sin hacer un solo cambio (ojo, esta cifra me la he sacado de la manga, pero igual creo que el verdadero porcentaje es alto), esto es, una maquina se conecta a los repositorios de Debian y baja indiscriminadamente todos los paquetes que puede, los prueba (compila), y si funcionan los copia a su propio repositorio y de esa forma estara disponible en Ubuntu de ahi en adelante, el proceso es indoloro y es la ventaja de ser el downstream de Debian, las cosas fluyen facilmente cuesta bajo. Si falla, el paquete pasara a engrosar la lista (de por si ya muy grande) de [FTBFS][84] (fail to build from source). Este proceso se esta llevando continuamente hasta una fecha establecida como “[debian import freeze][85]“.

Para Maverick el DIF (para abreviar) fue el 24 de Junio del 2010 hace ya mas
de un mes, puede verse el calendario completo [aqui][86].

Que pasa con todas las actualizaciones y los nuevos paquetes que aparezcan en
Debian despues de esta fecha?, AUN se PUEDEN sincronizar, pero el proceso ya
no es automatico, se tiene que crear un reporte, jurar y perjurarar que el
paquete funciona correctamente con la ultima version de Ubuntu y suscribir al
equipo ‘ubuntu-sponsor‘. En general la mayoria de estos reportes son aceptados
hasta otra fecha llamada “[feature freeze][87]“, como su nombre lo dice a
partir de ahi, ya no se sigue desarrollando Ubuntu, solo se arreglan errores.
El FF (para abreviar) para Maverick sera el 12 de Agosto del 2010.

Despues de esa fecha y solo en caso de que se trate de un paquete que mejore
significativamente la distribucion o que corriga algun error critico podra ser
sincronizado.

**_Ejemplo:_**

Hace 6-7 dias [aparecio][88] en Debian un paquete para [zathura][89], zathura
es un visor de pdf super minimalista y con interfaz parecida a la de vim, hace
tiempo que lo utilizo (desde git), de hecho supe que estaba en Debian porque
ya habia empezado a empaquetarlo para Ubuntu cuando se me ocurrio buscarlo ( $
rmadison -u debian zathura).

Para sincronizar este paquete se puede crear un reporte con un titulo similar
a _“ Sync zathura X (universe) from Debian sid (main)”_ por poner un ejemplo,
donde X es la version de zathura, (universe) es el repositorio en Ubuntu y
(main) es la seccion de Debian. Luego en el cuerpo del reporte se escriben las
razones por las que se quiere sincronizar y se adjunta un log donde muestre
que compila correctamente, algunos [reportes][90]. Para poder crear este
reporte, he tenido que descargar/compilar e instalar zathura en mi sistema.

Descargando el archivo .dsc desde Debian:

<pre class="sh_sh">
$ mkdir zathura; cd zathura
$ dget -xu http://ftp.de.debian.org/debian/pool/main/z/zathura/zathura_0.0.7-1.dsc
</pre>

Compilando:

<pre class="sh_sh">
$ cd zathura-0.0.7/
$ debuild -us -uc
</pre>

Instalando:

<pre class="sh_sh">
$ sudo debi
Selecting previously deselected package zathura.
 (Reading database ... 197048 files and directories currently installed.)
 Unpacking zathura (from zathura_0.0.7-1_i386.deb) ...
 Setting up zathura (0.0.7-1) ...
 Processing triggers for menu ...
 Processing triggers for man-db ...
</pre>

Haciendo pruebas:

<pre class="sh_sh">
$ zathura archivo.pdf
</pre>

Una vez que funcione, se puede crear el reporte, como ya habia mencionado se
puede hacer a “mano” pero tambien con “requestsync” este script esta en el
paquete “ubuntu-dev-tools” y se encarga de llenar el reporte y asignar los
equipos adecuados por nosotros, este es el que voy a usar para este ejemplo.

Primero se le deben dar permisos en launchpad:

<pre class="sh_sh">
$ BROWSER=firefox manage-credentials create -c ubuntu-dev-tools -l 2
</pre>

Firefox abrira una pagina y pedira el nivel de confiabilidad, ahi se debe
seleccionar “**Change non-private data** “. Como en este caso zathura no
existe en Ubuntu, se utiliza la bandera ‘-n’ (new), tambien ‘-s’ porque aun no
tengo permisos sobre el archivo y –lp para que utilice la interfaz web de
launchpad, de lo contrario se mandara por correo (y puede tomar mas tiempo)
Ver $ man requestsync

<pre class="sh_sh">
$ requestsync -n -s --lp zathura
Currently the report looks as follows:
Summary (one line):
Sync zathura 0.0.7-1 (universe) from Debian unstable (main)
Description:
Please sync zathura 0.0.7-1 (universe) from Debian unstable (main)
All changelog entries:
zathura (0.0.7-1) unstable; urgency=low
 [ Sebastian Ramacher ]
 * Initial release (Closes: #582119)
 [ Jakub Wilk ]
 * Add myself to uploaders.
 -- Sebastian Ramacher &lt;s.ramacher@gmx.at&gt;  Fri, 23 Jul 2010 12:18:37 +0200
Do you want to edit the report [y/N]?
</pre>

Listo, el reporte esta hecho, se le pueden agregar detalles extra, presionando
‘y’ , de lo contario basta con presionar ‘n’ y ‘requestsync’ subira el
reporte, en este caso, me ha devuelto:
<https://bugs.edge.launchpad.net/ubuntu/+bug/611623>

Eso es todo, en unos pocos dias zathura sera copiado a Ubuntu, y en la proxima
version podre instalarlo con $ sudo apt-get install zathura =), facil hasta
para mi.

  * <https://wiki.ubuntu.com/SyncRequestProcess>

NOTA: Antes de crear el reporte hay que verificar que no haya sido pedido con
anterioridad.

  [84]: http://qa.ubuntuwire.org/ftbfs/
  [85]: https://wiki.ubuntu.com/DebianImportFreeze
  [86]: https://wiki.ubuntu.com/MaverickReleaseSchedule
  [87]: https://wiki.ubuntu.com/FeatureFreeze
  [88]: http://packages.qa.debian.org/z/zathura.html
  [89]: zathura.pwmt.or
  [90]: https://launchpad.net/ubuntu/+bugs?field.searchtext=Sync&orderby=-datecreated&search=Search&field.status%3Alist=NEW&assignee_option=any&field.assignee=&field.bug_reporter=&field.bug_supervisor=&field.bug_commenter=&field.subscriber=&field.component-empty-marker=1&field.tag=&field.tags_combinator=ANY&field.status_upstream-empty-marker=1&field.has_cve.used=&field.omit_dupes.used=&field.omit_dupes=on&field.affects_me.used=&field.has_no_package.used=&field.has_patch.used=&field.has_branches.used=&field.has_branches=on&field.has_no_branches.used=&field.has_no_branches=on

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/07/30/sincronizar-paquetes-o-como-pedir-paquetes-de-debian-en-ubuntu/)
