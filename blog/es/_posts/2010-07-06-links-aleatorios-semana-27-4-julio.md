---
layout: post
title: "links aleatorios, semana 27-4/julio - motu"
tags: [ubuntu, motu]
description: "Segunda entrega que corresponde a la semana del 27 al 4 de Julio del 2010. http://www.omgubuntu.co.uk/2010/06/test-drive-err-testdrives-new-gtk.html Sobre el..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Segunda entrega que corresponde a la semana del 27 al 4 de Julio del 2010.

  * <http://www.omgubuntu.co.uk/2010/06/test-drive-err-testdrives-new-gtk.html>

Sobre el proyecto de un estudiante del Google [Summer][58] of Code, para crear
un lanzador de maquinas virtuales de los daily builds, Ubuntu como supongo
muchas mas distribuciones crea images iso diaramente, estas imagenes contienen
los ultimos cambios, optimas para desarrolladores y testers que no tengan
miedo toparse con un sistema totalmente inservible :P, umm, los alpha y beta
son completamente estables a su lado, aun asi este programa intenta llevar
estas isos a muchos mas usuarios (noveles) [hasta el momento solo es posible
descargando las imagenes manualmente (hasta donde se) y con scripts en bash
(zsync)] <http://cdimage.ubuntu.com>

Lo he instalado para probarlo y aunque la interfaz grafica ya tiene forma,
todavia esta muy verde, al grado que cuando descargas las iso, no obtienes
ninguna respuesta y la aplicacion parece colgarse, el autor ha prometido
agregar soporte para hilos lo mas pronto posible, mantendre el proyecto en
marca personal.

  * <https://wiki.ubuntu.com/EfrainValles/MOTUJourney>

  * <http://effiejayx.wordpress.com/>

Efrain Valles tambien parecio aventurarse en un viaje motu hace tiempo, me
sorprende que no haya cientos de paginas parecidas por la web, estuve leyendo
casi todo su blog, y tiene muy buenos tutoriales, con imagenes y comandos paso
a paso, super recomendable, umm, aunque personalmente no le entendi al
tutorial de sync/merge que hizo, necesito desesperadamente que alguien me
explique eso xD, he dejado un comentario en su blog, espero se apiade de mi
alma.

  * <https://launchpad.net/harvest/>

Harvest era/sera una plataforma para arreglar algunos de los bugs mas faciles
que pudieran existir en ubuntu (hasta donde me entere), digo era porque al
parecer en algun momento funciono, pero dado que lo estan actualizando a
Django ahora ya no esta. Sin embargo ya que esta en launchpad, es muy facil
ver como va su desarrollo, $ bzr branch lp:harvest

Le he tomado unas capturas:

[![][59]][59]

[![][60]][60]

[![][61]][61]

  

[![][62]][62]

[![][63]][63]

[![][64]][64]

  

Hasta el momento parece manejar la autenticacion, y no se que tan bien, pero
hay una variedad de bugs, donde supongo que los colaboradores oficiales pueden
dejar comentarios/marcar los errores segun el nivel de complejidad, tambien
tiene links a los parches adjuntos, ummm, creo que me gusta, aunque viniendo
de Ubuntu esperaria un poco mas de efectos (eyecandy), y ademas el tema
deberia estar actualizado al de la ultima version, jejej, me impresiona la
facilidad con la que puedo criticar, siempre es mas facil de este lado del rio
🙂

Ademas de lo anterior, estuve recolectando algunos bits por aqui y por alla de
los cuales no recuerdo su url, por eso creo que a partir de hoy creare un
archivo ‘link.ubuntu’ para ir poniendo ahi los mas interesantes mientras
navego para que no me vuelva a pasar, $ cat ubuntu.notas

* **check-needs-packaging** – verifica los paquetes que requieren empaquetamiento y crea un html en el directorio desde donde es lanzado  
* **body-searching patron** – busca en el cuerpo de los bugs  
* **count-senders** – cuanto el numero de mensajes mandados por usuario, creo que requiere que la lista la tengas en local, no lo he usado  
* **tagged-bugs** – tampoco lo he usado, su descripcion dice que busca por la etiqueta de los bugs  
* **triager-query** – de este, no he entendido ni su descripcion ni su funcionamiento  
* **dl-ubuntu-test-iso** – descarga imagenes iso de los daily builds, su archivo de configuracion me ha parecido comodo, pero el script (en python) no ha funcionado como hubiera creido, estoy trabajando en mi propio version (en bash), sip, soy demasiado estupido para reinventar la rueda, obvio solo pretendo hacerla usable para mi mismo, no creo que nadie mas deba sufrir con sus posibles errores.  
* **iso-ripper** – de la descripcion, descomprime las imagenes iso a un directorio  
* **debian-bug-search patron** – busca en el cuerpo de lo errores de debian  
* **hugday** – lista y ayuda a marcar los errores que vas corrigiendo en el ubuntu hug day (dia en el que los desarrolladores se centran en reparar los bugs de 1 paquete)  
* **grab-merge paquete** , descarga de [MoM][65] y del [PTS][66] de debian, este script me ha traido bastante frustracion :(, descarga tantos paquetes que no se por donde empezar, me gustaria que alguien me aclarara que es y para que sirve cada uno  
* **rmadison paquete** devuelve la ultima version en todas las versiones de ubuntu, si se usa con la opcion -u entonces devuelve las versiones de debian, util para ver cuando un paquete necesita una sincronizacion (sync)  
* **update-maintainer** , edita el archivo debian/control para actualizar el mantenedor del paquete de debian a la lista de ubuntu (ubuntu-devel-discuss@lists.ubuntu.com)  
* **grab-attachments Numero_bug** , descarga todos los adjuntos de un reporte (debdiffs), antes de poder usarlo se requiere correr los siguientes comandos:
    
<pre class="sh_sh">
$ BROWSER=/usr/bin/firefox manage-credentials create -c ubuntu-dev-tools -l 2
</pre>

Si no especifican BROWSER se abrira launchpad con links2 o uno de esos
navegadores minimalistas.

Tambien encontre de buen gusto la herramienta apt-rdepends, puede crear
graficos con las dependencias inversas de un paquete, es decir los paquetes
que dependen de el, un ejemplo, aqui para ‘notification-daemon‘

<pre class="sh_sh">
$ apt-rdepends --dotty notification-daemon | dot -Tpng &gt; notification.png
$ apt-cache rdepends paquete
$ apt-rdepends -r paquete
</pre>

Tienen funciones mas o menos similares, aunque al parecer apt-rdepends maneja
mejor el listado de dependencias.  
Tambien recogi unas notas sobre BUILDERS (constructores).  
Estos comandos vendrian siendo equivalentes, todos contruiran al menos un
archivo .deb y otros tambien un paquete fuente .dsc, otros por el contrario
construiran el .deb a partir de un paquete fuente .dsc.

<pre class="sh_sh">
$ dpkg -b directory packagename.deb
$ dpkg-buildpackage -rfakeroot
$ fake root debian/rules binary
$ sudo pbuilder build paquete.dsc
$ debuild -us -uc -b #parece ser un wrapper alrededor de dpkg-buildpackage
$ sbuild -As paquete.dsc #no estoy seguro de este ultimo
</pre>

Y tambien hice algunas notas sobre el proceso de combinar paquetes (merge),
estas aun no las he entendido, en cuando lo comprenda, are una entrada
exclusivamente para este tema:

La combinacion va de debian testing (actualmente sid) a la ultima version de
ubuntu, maverick a 4 de Julio del 2010. Al no ser MOTU ni core-dev, es
necesario que alguien te apruebe los cambios. Comunmente segun esto que lei,
deberian comentarte detalles del paquete hasta que queden comformes para
despues subirlo a los archivos. El proceso ‘corto’ es el siguiente:

* Seleccionar un paquete de MoM: <https://merges.ubuntu.com/universe.html>  
* Descargarlo con $ grab-merge y leer el archivo REPORT (el cual me parece cifrado :S)  
* Buscar y solucionar los conflictos de cada archivo, dando preferencia a los cambios de Debian  
* Actualizar debian/changelog para anotar los cambios  
* Crear un nuevo paquete fuente $ merge-buildpackage -rfakeroot  
* Verificar que se compila correctamente en pbuilder y si funciona pedir a un MOTU que revise los cambios y si estan bien que suba el paquete.

  [58]: https://web.archive.org/web/2010/http://code.google.com/soc/
  [59]: /assets/img/viajemotu-links-aleatorios-semana-27-4-julio-1.png
  [60]: /assets/img/viajemotu-links-aleatorios-semana-27-4-julio-2.png
  [61]: /assets/img/viajemotu-links-aleatorios-semana-27-4-julio-3.png
  [62]: /assets/img/viajemotu-links-aleatorios-semana-27-4-julio-4.png
  [63]: /assets/img/viajemotu-links-aleatorios-semana-27-4-julio-5.png
  [64]: /assets/img/viajemotu-links-aleatorios-semana-27-4-julio-6.png
  [65]: https://merges.ubuntu.com/
  [66]: http://packages.qa.debian.org/common/index.html

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/07/06/links-aleatorios-2/)
