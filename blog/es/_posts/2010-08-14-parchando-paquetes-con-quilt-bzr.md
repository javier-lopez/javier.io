---
layout: post
title: "parchando paquetes con quilt + bzr - motu"
tags: [ubuntu, motu]
description: "Introduccion Como parte del Ubuntu hug day de esta semana, el equipo de triagers (personas que se encargan de tener el primero contacto con los bugs de Ubunt..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

![][98]

**Introduccion**

Como parte del [Ubuntu hug day][99]de esta semana, el equipo de triagers
(personas que se encargan de tener el primero contacto con los bugs de Ubuntu)
se concentro en la operacion [Clean Sweep][100].

Y ya que he leido la respectiva wiki, me he lanzado a revisar algunos de estos
parches, a continuacion describire el proceso de uno de ellos.

[Xsane][101] es un front-end para sane, las librerias que hacen posible
controlar los scanners en linux. En su version mas reciente (al menos las
versiones que se encuentran en Ubuntu/Debian) el programa crea una carpeta en
~/.sane con permisos 770, lo que le da permisos de escritura/lectura al dueño
de la carpeta y al grupo al que pertenece ese usuario, alguien ha reportado el
[bug #611950][102] donde propone cambiar los permisos por unos mas prudentes
700, si he entendido bien, y se ha tomado la molestia de adjuntar un
[parche][103].

Ahora, como voluntario, y futuro colaborador de Ubuntu, uno debe asegurarse de
que el parche este en la forma adecuada para aplicarse al archivo, esto es,
con un changelog que indique los cambios y el parche en el formato adecuado, y
de ser necesario enviarlo a los desarrolladores o a Debian (upstream). En este
caso como el paquete usa ‘quilt‘ he agregado un parche de ese tipo y lo he
reenviado a Debian.

**Desarrollo**

Se descarga el codigo fuente, esta vez he usado bzr en lugar de $ dget -xu
<http://algun.mirror/ubuntu/maverick/etc/archivo.dsc> o $ apt-get source
paquete. Segun algunos desarrolladores de Ubuntu esta debe ser la manera
predilecta de arreglar bugs. Para una guia super rapida del proceso, ver
“[Como arreglar bugs con bzr –version corta”][104]

<pre class="sh_sh">
$ mkdir xsane; cd xsaane
$ bzr branch lp:/ubuntu/xsane
Branched 28 revision(s)
$ cd xsane;
</pre>

Ahora se le dice a quilt el nombre del parche.

<pre class="sh_sh">
$ quilt new fix_umask_permitions.patch
Patch fix_umask_permitions.patch is now on top
</pre>

OJO: hay que declarar antes en ~/.bashrc o en el archivo de configuracion que
use su shell “export QUILT_PATCHES=debian/patches“.

Y luego agregar el/los archivo (s) que se van a editar, en este caso y
siguiendo el parche original, se agrega ‘src/xsane.h‘.

<pre class="sh_sh">
$ quilt add src/xsane.h
File src/xsane.h added to patch fix_umask_permitions.patch
</pre>

Listo, =), ahora solo falta editar el archivo, en mi caso, he abierto con
‘vim’ y cambiado la cadena “#define XSANE_DEFAULT_UMASK 0007” por “#define
XSANE_DEFAULT_UMASK 0077“.

<pre class="sh_sh">
$ vim usr/xsane.h
</pre>

Una vez hecho, se sale y se actualiza el parche, esto creara un archivo en
debian/patches/fix_umask_permitions.patch

<pre class="sh_sh">
$ quilt refresh
Refreshed patch fix_umask_permitions.patch
$ less debian/patches/fix_umask_permitions.patch
Index: xsane/src/xsane.h
 ===================================================================
 --- xsane.orig/src/xsane.h      2010-08-14 06:21:02.826514370 -0500
 +++ xsane/src/xsane.h   2010-08-14 06:25:47.695512049 -0500
 @@ -104,7 +104,7 @@
 #define XSANE_DEBUG_ENVIRONMENT        "XSANE_DEBUG"
 #define XSANE_PROGRESS_BAR_MIN_DELTA_PERCENT 0.025
 -#define XSANE_DEFAULT_UMASK            0007
 +#define XSANE_DEFAULT_UMASK            0077
 #define XSANE_HOLD_TIME                        200
 #define XSANE_CONTINUOUS_HOLD_TIME     10
 #define XSANE_DEFAULT_DEVICE           "SANE_DEFAULT_DEVICE"
 debian/patches/fix_umask_permitions.patch (END)
</pre>

El parche no solo se ha creado, sino que se ha aplicado, esto se puede
corroborar con el comando:

<pre class="sh_sh">
$ quilt push
File series fully applied, ends at patch fix_umask_permitions.patch
</pre>

Ahora se modifica el changelog, describiendo el cambio:

<pre class="sh_sh">
$ dch -i
xsane (0.997-2ubuntu3) maverick; urgency=low
 [Adrien Thebo]
 * Fix umask permitions (LP: #611950)
 - debian/patches/fix_umask_permitions.patch
-- chilicuil &lt;chilicuil@i.am&gt;  Sat, 14 Aug 2010 06:28:55 -0500
</pre>

OJO: Los cambios siempre deben hacerse para la ultima version de Ubuntu, por
defecto $ bzr branch lp:ubuntu/paquete descargara la ultima version, asi que
no hay de que preocuparse, pero $ dhc -i pondra la version que se este
corriendo, en mi caso debo cambiar la cadena ‘lucid‘ por ‘maverick‘.

No hay que olvidar dar el credito a la persona que se tomo la molestia de
reportar y adjuntar el parche inicial. Despues de eso se debe agregar el
parche (s) a bzr, NO hay que OLVIDAR este paso o se obtendra un error al
momento de generar el paquete .dsc (codigo fuente de los .deb).

<pre class="sh_sh">
$ bzr add debian/patches/fix_umask_permitions.patch
adding debian/patches/fix_umask_permitions.patch
</pre>

Se hace el commit (el cambio que se intentara hacer al paquete original):

<pre class="sh_sh">
$ debcommit
bzr commit -m '* Fix umask permitions (LP: #611950)
 - debian/patches/fix_umask_permitions.patch' --fixes 'lp:611950'
 Committing to: /home/chilicuil/misc/packages/xsane/
 modified .pc/applied-patches
 modified debian/changelog
 added debian/patches/fix_umask_permitions.patch
 modified debian/patches/series
 modified src/xsane.h
 Committed revision 29.
</pre>

Y se crea el archivo fuente (dsc):

<pre class="sh_sh">
$ bzr bd -- -S -uc -us
Building using working tree
Looking for a way to retrieve the upstream tarball
Using pristine-tar to reconstruct the needed tarball ...
</pre>

Se crearan un archivo .dsc y uno .changes, $ ls ..xsane/
xsane_0.997-2ubuntu3.debian.tar.gz xsane_0.997-2ubuntu3.dsc
xsane_0.997-2ubuntu3_source.changes xsane_0.997.orig.tar.gz

Ahora se prueba con $ pbuilder para ver que aun compile correctamente y se
prueba en una maquina con maverick. Debo ser completamente honesto y decir que
para cambios tan sencillos como estos, solo verifico que compile y me olvido
de testear, sin embargo no lo omito por pereza , sino porque ahora mismo no
tengo otra maquina donde haga pruebas, estoy por comprarme una nueva
computadora con virtualizacion integrada, donde espero poder arreglar bugs mas
complicados que no solo requieran cambios triviales. Asi que si alguien por
cualquier razon llega a leer estas lineas, por favor pruebe el paquete.

<pre class="sh_sh">
$ sudo DIST=maverick pbuilder build  ../xsane_0.997-2ubuntu3.dsc
</pre>

OJO: Esto solo funcionara si tienen el mismo entorno que describo en “[Notas
sobre pbuilder][105]”

Una vez compilado y testeado, se suben los cambios a Ubuntu:

<pre class="sh_sh">
$ bzr push lp:~chilicuil/ubuntu/maverick/xsane/fix-611950
Using default stacking branch /~ubuntu-branches/ubuntu/maverick/xsane/maverick at lp-70590544:///~chilicuil/ubuntu/maverick/xsane
Created new stacked branch referring to /~ubuntu-branches/ubuntu/maverick/xsane/maverick.
</pre>

Es importante que se siga el formato:
lp:~usuario/ubuntu/version/paquete/nombre_de_rama (esta ultima puede llevar el
nombre que sea), de lo contrario launchpad no les dejara subir los cambios.

Una vez hechos, solo falta pedir que se integren,

<pre class="sh_sh">
$ bzr lp-open
Opening https://code.edge.launchpad.net/~chilicuil/ubuntu/maverick/xsane/fix-611950/ in web browser
</pre>

Hay que dar click en ‘Propose for merging‘

[![][106]][107]

De ahi en adelante, la rama podra verse desde la pagina del reporte:

[![][108]][109]

Con eso basta para que alguien pueda ver el cambio y pueda introducirlo a
ubuntu, para enviarlo a debian se debe hacer algunos pasos extra:

Primero hay que configurar $ reportbug –configure; ara algunas preguntas
sencillas y se podra continuar con el proceso, esto solo se ara 1 vez, las
siguientes veces el programa leera la configuracion de ~/.reportbugrc .

Luego sin salir del directorio donde esta debian/ se ejecuta:

<pre class="sh_sh">
$ submittodebian
﻿﻿=== modified file '.pc/applied-patches'
--- .pc/applied-patches 2010-06-21 12:50:50 +0000
+++ .pc/applied-patches 2010-08-14 11:19:21 +0000
@@ -12,3 +12,4 @@
 fix_preview_mouse_events.patch
 fix_spin_button_pagesize.patch
 pot_desktop_msgid.patch
+fix_umask_permitions.patch
=== modified file 'debian/changelog'
=== added file 'debian/patches/fix_umask_permitions.patch'
--- debian/patches/fix_umask_permitions.patch   1970-01-01 00:00:00 +0000
+++ debian/patches/fix_umask_permitions.patch   2010-08-14 11:25:59 +0000
@@ -0,0 +1,13 @@
+Index: xsane/src/xsane.h
+===================================================================
+--- xsane.orig/src/xsane.h     2010-08-14 06:21:02.826514370 -0500
++++ xsane/src/xsane.h  2010-08-14 06:25:47.695512049 -0500
+@@ -104,7 +104,7 @@
+ #define XSANE_DEBUG_ENVIRONMENT       "XSANE_DEBUG"
+
+ #define XSANE_PROGRESS_BAR_MIN_DELTA_PERCENT 0.025
+-#define XSANE_DEFAULT_UMASK           0007
++#define XSANE_DEFAULT_UMASK           0077
+ #define XSANE_HOLD_TIME                       200
+ #define XSANE_CONTINUOUS_HOLD_TIME    10
+ #define XSANE_DEFAULT_DEVICE          "SANE_DEFAULT_DEVICE"
=== modified file 'debian/patches/series'
--- debian/patches/series       2010-06-21 12:50:50 +0000
+++ debian/patches/series       2010-08-14 11:19:21 +0000
@@ -12,3 +12,4 @@
 fix_preview_mouse_events.patch
 fix_spin_button_pagesize.patch
 pot_desktop_msgid.patch
+fix_umask_permitions.patch
=== modified file 'src/xsane.h'
--- src/xsane.h 2010-06-21 12:50:50 +0000
+++ src/xsane.h 2010-08-14 11:25:47 +0000
@@ -104,7 +104,7 @@
 #define XSANE_DEBUG_ENVIRONMENT        "XSANE_DEBUG"
 #define XSANE_PROGRESS_BAR_MIN_DELTA_PERCENT 0.025
-#define XSANE_DEFAULT_UMASK            0007
+#define XSANE_DEFAULT_UMASK            0077
 #define XSANE_HOLD_TIME                        200
 #define XSANE_CONTINUOUS_HOLD_TIME     10
 #define XSANE_DEFAULT_DEVICE           "SANE_DEFAULT_DEVICE"
</pre>

De lo cual he descartado la primer a parte, sobre el cambio en
debian/changelog y .pc/applied-patches, quedando de esta forma:

<pre class="sh_sh">
=== added file 'debian/patches/fix_umask_permitions.patch'
--- debian/patches/fix_umask_permitions.patch   1970-01-01 00:00:00 +0000
+++ debian/patches/fix_umask_permitions.patch   2010-08-14 11:25:59 +0000
@@ -0,0 +1,13 @@
+Index: xsane/src/xsane.h
+===================================================================
+--- xsane.orig/src/xsane.h     2010-08-14 06:21:02.826514370 -0500
++++ xsane/src/xsane.h  2010-08-14 06:25:47.695512049 -0500
+@@ -104,7 +104,7 @@
+ #define XSANE_DEBUG_ENVIRONMENT       "XSANE_DEBUG"
+
+ #define XSANE_PROGRESS_BAR_MIN_DELTA_PERCENT 0.025
+-#define XSANE_DEFAULT_UMASK           0007
++#define XSANE_DEFAULT_UMASK           0077
+ #define XSANE_HOLD_TIME                       200
+ #define XSANE_CONTINUOUS_HOLD_TIME    10
+ #define XSANE_DEFAULT_DEVICE          "SANE_DEFAULT_DEVICE"
=== modified file 'debian/patches/series'
--- debian/patches/series       2010-06-21 12:50:50 +0000
+++ debian/patches/series       2010-08-14 11:19:21 +0000
@@ -12,3 +12,4 @@
fix_preview_mouse_events.patch
fix_spin_button_pagesize.patch
pot_desktop_msgid.patch
+fix_umask_permitions.patch
=== modified file 'src/xsane.h'
--- src/xsane.h 2010-06-21 12:50:50 +0000
+++ src/xsane.h 2010-08-14 11:25:47 +0000
@@ -104,7 +104,7 @@
#define XSANE_DEBUG_ENVIRONMENT        "XSANE_DEBUG"
#define XSANE_PROGRESS_BAR_MIN_DELTA_PERCENT 0.025
-#define XSANE_DEFAULT_UMASK            0007
+#define XSANE_DEFAULT_UMASK            0077
#define XSANE_HOLD_TIME                        200
#define XSANE_CONTINUOUS_HOLD_TIME     10
#define XSANE_DEFAULT_DEVICE           "SANE_DEFAULT_DEVICE"
</pre>

Despues de eso, submittodebian buscara problemas parecidos con el fin de
evitar reportes duplicados, hay que leer con cuidado que no este en la lista,
si lo esta verificar si hay algo que se pueda agregar y si no esta, generar el
nuevo reporte:

[![][110]][111]

Luego pedira el nombre del reporte y un pequeña descripcion, es una buena idea
apuntar al bug original, para este bug mi reporte ha quedado de esta manera:
<http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=592972> , no recuerdo donde
he leido que los bugs procedentes de Ubuntu deberan clasificarse como
‘wishlist‘, asi que no me he arriesgado y lo he clasificado de esa manera.

Finalmente , en el reporte original (en launchpad) se agrega la liga del
reporte en Debian o en del bugtracker de cualquier otro proyecto (se hace
click en ‘Also affects project‘ y luego se agrega el url), segun aplique y se
cambia el tag ‘patch‘ por ‘patch-forwarded-debian‘ o ‘patch-forwarded-
upstream‘. Si se acepta se volvera a cambiar por ‘patch-accepted-debian‘ ,
‘patch-accepted-upstream‘ o si se rechaza por ‘patch-rejected-debian‘ o
‘patch-rejected-upstream‘. Y eso es todo, tan pronto el parche sea aceptado en
upstream o debian, volvera a ubuntu en forma de una sincronizacion o en caso
de no darse, aun se podra usar en ubuntu, si es aceptado la peticion de
‘merge’.

NOTA: Esta entrada ha sido para mi autodocumentacion, sigase bajo su propio
riesgo.

  * [Parchando paquetes con quilt][112]
  * [Parchando paquetes con debdiff][113]

  [98]: /assets/img/viajemotu-parchando-paquetes-con-quilt-bzr-1.png
  [99]: https://wiki.ubuntu.com/UbuntuBugDay/20100812
  [100]: https://wiki.ubuntu.com/OperationCleansweep
  [101]: www.xsane.org
  [102]: https://bugs.launchpad.net/ubuntu/+source/xsane/+bug/611950
  [103]: http://launchpadlibrarian.net/52766337/xsane.h.diff
  [104]: /blog/es/2010/08/06/como-arreglar-bugs-con-bzr-version-corta.html
  [105]: /blog/es/2010/08/10/notas-sobre-pbuilder.html
  [106]: /assets/img/viajemotu-parchando-paquetes-con-quilt-bzr-2.png
  [107]: /assets/img/viajemotu-parchando-paquetes-con-quilt-bzr-2.png
  [108]: /assets/img/viajemotu-parchando-paquetes-con-quilt-bzr-3.png
  [109]: /assets/img/viajemotu-parchando-paquetes-con-quilt-bzr-3.png
  [110]: /assets/img/viajemotu-parchando-paquetes-con-quilt-bzr-4.png
  [111]: /assets/img/viajemotu-parchando-paquetes-con-quilt-bzr-4.png
  [112]: /blog/es/2010/06/20/parchando-paquetes-con-quilt.html
  [113]: /blog/es/2010/06/20/parchando-paquetes-con-debdiff.html

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/08/14/parchando-paquetes-con-quilt-bzr/)
