---
layout: post
title: "comentarios aleatorios, semana 5-11/julio - motu"
tags: [ubuntu, motu]
description: "Cuarta entrega que corresponde a la semana del 5 al 11 de Julio del 2010. #ubuntu-bugs: < simar> Hello I want to change the affects package of the bug to ker..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Cuarta entrega que corresponde a la semana del 5 al 11 de Julio del 2010.

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;simar&gt; Hello I want to change the affects package of the bug to kernel. What should I choose in the search field ??
&lt;nigelb&gt; simar: the “linux” package
&lt;simar&gt; nigelb, thanks
&lt;nigelb&gt; np 🙂
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;simar&gt; Hola, me gustaria cambiar el paquete que afecta un determinado bug al kernel. Que deberia poner en el campo de busqueda?
&lt;nigelb&gt; simar: el paquete “linux”
&lt;simar&gt; nigelb, gracias
&lt;nigelb&gt; np (no hay problema) 🙂
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;drew212&gt; micahg: how do i install the LP scripts from GM? I lost it on my new install and i’m trying to set everything back the way it was =X
&lt;micahg&gt; drew212: &lt;https://launchpad.net/~gm-dev-launchpad/+archive/ppa/+packages&gt;
&lt;drew212&gt; micahg: thanks =)
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;drew212&gt; micahg: como instalo los scripts para launchpad (LP) de [greacemonkey][67] (GM)? los perdi en mi nueva instalacion y estoy tratando de dejar todo como estaba antes =X #Es un scripts que permiten agregar [respuestas rapidas][68] a reportes invalidos. No lo he podido hacer andar
&lt;micahg&gt; drew212: [https://launchpad.net/~gm-dev- launchpad/+archive/ppa/+packages][69]
&lt;drew212&gt; micahg: gracias =)
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;simar&gt; qense, Hi , While marking bugs as duplicate should I change the affects package(if its wrongly configured) of the bug before marking or not?
&lt;qense&gt; simar: When you mark bug X as a duplicate of bug Y you change nothing to bug X, but only leave a comment explaining that it is a duplicate and that the reporter should look at bug Y from now on. Then you mark bug X as a duplicate of bug Y.
&lt;qense&gt; simar: This is done to make it easy to continue the discussion on bug X if it turns out to not be a duplicate after all. The fact that the package is different from bug Y doesn’t matter
&lt;qense&gt; because duplicate bugs are hidden anyway.
&lt;simar&gt; qense, ok
&lt;simar&gt; qense, another thing How to triage bugs related to kernel ie touchpad bugs that are related to ubuntu kernel, I think these are not related to freedesktop ….
&lt;qense&gt; simar: Do you mean reporting them upstream?
&lt;simar&gt; qense, ya .. I’m sure the bug contains necessary information
&lt;qense&gt; simar: in that case: ask here, or ask at #ubuntu-kernel
&lt;qense&gt; simar: The kernel bug tracker is located at
&lt;[https://bugzilla.kernel.org/&amp;gt][70];, but I’m not sure whether the Ubuntu Kernel team handles the bugs themselves or not.
&lt;simar&gt; qense, i will try .. I think they do ..
&lt;simar&gt; qense, thnaks and have a nice day
&lt;qense&gt; simar: you’re welcome
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;simar&gt; qense, Hola , si marco un reporte como copia de otro, deberia cambiar los paquetes que afecta el reporte original o no? (si esta incorrecto)
&lt;qense&gt; simar: cuando estableces que un reporte X es copia de otro Y, no cambias nada en el reporte X, solo dejas un comentario donde explicas que es una copia de otro y que la persona que lo reporto deberia ver el reporte original de ahi en adelante.
&lt;qense&gt; simar: Se hace para mantener la discusion del reporte X mas facilmente si resulta que al final no es duplicado de otro reporte. El hecho que el paquete sea diferente del reporte Y no importa.
&lt;qense&gt; porque los reportes duplicados no se toman en cuenta.
&lt;simar&gt; qense, ok
&lt;simar&gt; qense, otra cosa, como puedo clasificar errores relacionados con el Kernel?, por ejemplo; errores del touchpad que esten relacionados con el kernel de ubuntu , creo que estos no se relacionan con freedesktop ….
&lt;qense&gt; simar: quieres decir, como reportarlos a upstream?
&lt;simar&gt; qense, see .. estoy seguro que este bug contiene toda la informacion necesaria
&lt;qense&gt; simar: en ese caso pregunta aqui o en #ubuntu-kernel
&lt;qense&gt; simar: el bug tracker del kernel esta en
&lt;[https://bugzilla.kernel.org/&amp;gt][70];, pero no estoy seguro si el equipo del Kernel de Ubuntu maneje los reportes por si mismo y no.
&lt;simar&gt; qense, lo intentare .. creo que lo hacen ..
&lt;simar&gt; qense, gracias que tengas un buen dia
&lt;qense&gt; simar: gracias
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;somethinginteres&gt; For this bug:
&lt;https://bugs.launchpad.net/ubuntu/+source/evolution/+bug/572985&gt; would you grab the src from LP to fix it or is the source on gnome.org somewhere?
&lt;ubot2&gt; Launchpad bug 572985 in evolution (Ubuntu) (and 2 other projects) “backup settings option uses unhelpful yes/no dialog (affects: 1) (heat: 52)” [Low,Triaged]
&lt;vish&gt; somethinginteres: adding a git patch to the upstream bug would be easier
&lt;bcurtiswx&gt; somethinginteres: since its an upstream issue, you’d try to use gnome git repositories
&lt;bcurtiswx&gt; git clone git://git.gnome.org/evolution maybe?
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;somethinginteres&gt; Para este bug:
&lt;https://bugs.launchpad.net/ubuntu/+source/evolution/+bug/572985&gt; obtendrian el codigo desde Launchpad o desde algun lugar de gnome.org para arreglarlo?
&lt;ubot2&gt; Launchpad bug 572985 in evolution (Ubuntu) (and 2 other projects) “backup settings option uses unhelpful yes/no dialog (affects: 1) (heat: 52)” [Low,Triaged]
&lt;vish&gt; somethinginteres: agregar un parche mediante git al bug de upstream seria mas sencillo
&lt;bcurtiswx&gt; somethinginteres: como es un error de upstream, deberias probar con el repositorio de gnome
&lt;bcurtiswx&gt; podrias probar git clone git://git.gnome.org/evolution _#umm este comentario tal vez no sea tan util, pero dado que me he tomado la molestia de escogerlo y traducirlo, lo dejo. Lo importante aqui es ver como diferenciar cuando un parche debe ir en ubuntu o en el proyecto original, creo…
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;xelister&gt;
&lt;https://bugs.launchpad.net/ubuntu/+source/tremulous/+bug/513918&gt;
&lt;ubot2&gt; Launchpad bug 513918 in tremulous (Ubuntu) “Tremulous is missing files and will not correctly start (affects: 9) (heat: 66)” [Undecided,Confirmed]
&lt;xelister&gt; please set priority to Medium – most native 3D games on linux (q3 based) do not work. We have so little of native games and they do not work. Year of linux on desktop…
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;xelister&gt;
&lt;https://bugs.launchpad.net/ubuntu/+source/tremulous/+bug/513918&gt;
&lt;ubot2&gt; Launchpad bug 513918 in tremulous (Ubuntu) “Tremulous is missing files and will not correctly start (affects: 9) (heat: 66)” [Undecided,Confirmed]
&lt;xelister&gt; por favor, establece la prioridad a Media – la mayoria de los juegos nativos para linux en 3D (que se basen en q3) no funcionan. Tenemos tan pocos de esos y no funcionan. Venga el [año de linux][71] en el escritorio…
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;micromix&gt; hey guys i an wondering how would we find out who fixes bugs for packages, do they have adopt a package like we do?
&lt;hggdh&gt; micromix: the fix may come from upstream, not from us; also *anyone* can propose a patch
&lt;hggdh&gt; micromix: and it is not necessary to adopt a package to work on fixes
&lt;hggdh&gt; although it helps to concentrate on a subset — you have to learn the code, and understand it
&lt;micromix&gt; hggdh: i was just curious to know what happens when we finish triage a bug
&lt;hggdh&gt; ah
&lt;micromix&gt; if it eventually reaches a developer
&lt;micromix&gt; or maybe we need to try to fix bugs ourselves
&lt;hggdh&gt; yes, eventually it reaches one. May take some time, since we are all quite busy
&lt;hggdh&gt; and, as I said above, *anyone* can work on a fix. We prefer fixes that the package developers approve
&lt;hggdh&gt; so — for example — if I write a fix for er, Evolution, then I should also propose it upstream
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;micromix&gt; hola chicos, me pregunto como podriamos saber quien arregla determinados paquetes, ustedes tambien adoptan paquetes como lo hacemos nosotros #referiendose a la forma en la que debian trabaja, jaja, tengo la sensacion de haberlo traducido mal
&lt;hggdh&gt; micromix: el parche puede venir de upstream, no especificamente de nosotros; ademas *todos* pueden contribuir parches
&lt;hggdh&gt; micromix: y no es necesario adoptar paquetes para poder trabajar en parches
&lt;hggdh&gt; aunque ayuda que te concentres en algunos — tienes que aprender el codigo, entenderlo
&lt;micromix&gt; hggdh: solo tenia curiosida que pasa cuando terminamos de clasificarlos
&lt;hggdh&gt; ah
&lt;micromix&gt; si eventualmente alcanza un desarrollador
&lt;micromix&gt; o tenemos que arreglarlos nosotros mismos
&lt;hggdh&gt; si, eventualmente lo revisa un desarrollador. Puede tomar algun tiempo, ya que todos estamos algo ocupados
&lt;hggdh&gt; y, como dije mas arriba, *todos* pueden trabajar en los bugs. Aunque preferimos parches que hayan sido aprobados por los mantenedores del paquete #### no estoy seguro si se refiere al mantenedor de debian, o al desarrollador de ubuntu
&lt;hggdh&gt; — por ejemplo — si hago un parche para Evolution, debo mandarlo tambien al proyecto original
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;drew212&gt; ddecator: and what if the work is already done before you do it, close it and put their name on it?
&lt;ddecator&gt; drew212: nah, when you close it using the tool it automatically puts your name. if you see they worked on it as part of the bugday, then you can usually ping them here and ask if there was something they still meant to do or if maybe they forgot to close it
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;drew212&gt; ddecator: y que pasa si el trabajo ya fue hecho por alguien mas?, se cierra y se pone su nombre en el? #hablando del ubuntu bug day
&lt;ddecator&gt; drew212: nop, cuando lo cierras el programa ($ hugday close #bug) automaticamente pone tu nick (en la wiki). Si ves que lo trabajaron como parte del bugday, puedes preguntarles aqui si aun piensan agregarle algo o si lo han olvidado cerrar
</pre>

**#ubuntu-bugs:**

<pre class="sh_sh">
&lt;elopio&gt; Hi there.
&lt;elopio&gt; I marked one of the ubuntu bug day bugs as incomplete. But I don’t yet know what package it belongs too. Should I mark it as green on the wiki even though it hasn’t been assigned to a package?
&lt;pedro_&gt; elopio, if you’re subscribed to it and are going to continue to triage that bug, sure, mark it as green 😉
</pre>

_**#ubuntu-bugs:**_

<pre class="sh_sh">
&lt;elopio&gt; Hola #sobre el [ubuntu bug day][72]
&lt;elopio&gt; He clasificado uno de los reportes del ubuntu bug day como incompleto. Pero aun no se a que paquete pertenece (el ubuntu bug day al que se refiere se trato sobre asignar paquetes a los errores que no tenian asignado uno). Puedo marcarlo en verde (cerrado) aunque no tenga asignado paquete?
&lt;pedro_&gt; elopio, si te suscribes al reporte para seguir viendo su avance puedes marcarlo en verde 😉
</pre>

**#ubuntu-bugs:** 09:34

<pre class="sh_sh">
&lt;mandara&gt; can I add a watch in Launchpad to connect with &lt;http://bugreports.qt.nokia.com&gt; issue tracker?
&lt;nigelb&gt; mandara: hold on, checking
&lt;mandara&gt; k
&lt;nigelb&gt; mandara: sorry, not yet. &lt;https://launchpad.net/bugs/bugtrackers&gt; doesn’t list it
</pre>

_**#ubuntu-bugs:** 09:34_

<pre class="sh_sh">
&lt;mandara&gt; puedo agregar un link en Launchpad para seguir el avance de un bug en &lt;http://bugreports.qt.nokia.com&gt; ?
&lt;nigelb&gt; mandara: espera un momento, deja checo
&lt;mandara&gt; ok
&lt;nigelb&gt; mandara: aun no, lo siento. [https://launchpad.net/bugs/bugtrackers][73] no lo tiene listado #en LP puedes agregar links para ir actualizando las discusiones con otros bug trackers, poco despues de este comentario, nigelb creo un reporte para agregar soporte al bugtracker de qt.nokia.com
</pre>

**#ubuntu-devel:**

<pre class="sh_sh">
&lt;damascene&gt; what is the version of mlterm that is going to be in Lucid
&lt;damascene&gt; sorry, Maverick Meerkat
&lt;jmarsden&gt; damascene: At the moment, Maverick has mlterm / 3.0.1-1 / maverick/universe / source, amd64, i386
&lt;damascene&gt; thanks
&lt;jmarsden&gt; Use rmadison to check for this.
</pre>

_**#ubuntu-devel:**_

<pre class="sh_sh">
&lt;damascene&gt; cual es la version de mlterm que va a venir en Lucid
&lt;damascene&gt; perdon, en Maverick Meerkat
&lt;jmarsden&gt; damascene: por el momento, Maverick tiene este mlterm / 3.0.1-1 / maverick/universe / source, amd64, i386
&lt;damascene&gt; gracias
&lt;jmarsden&gt; usa rmadison para checarlo por ti mismo #con rmadison -u puedes ver las versiones en debian
</pre>

**#ubuntu-devel:**

<pre class="sh_sh">
&lt;shapr&gt; Laney: I’m new to ubuntu, have used debian for many years, is there an equivalent of debian/unstable?
&lt;Laney&gt; no not really, there’s a development release but it’s subject to various freezes
</pre>

_**#ubuntu-devel:**_

<pre class="sh_sh">
&lt;shapr&gt; Laney: Soy nuevo en ubuntu, aunque he usado debian por muchos años, hay algun equivalente a debian/unstable en ubuntu?
&lt;Laney&gt; no realmente, hay versiones en desarrollo, pero estan sujetas a varios freezes #periodos donde no puedes modificar sustancialmente la distribución, solo agregar parches que arreglen problemas puntuales.
&lt;https://wiki.ubuntu.com/MaverickReleaseSchedule&gt;
</pre>

**#ubuntu-devel:**

<pre class="sh_sh">
&lt;maxwellian&gt; Out of curiosity, what do people mean by “inline” patches? Patches applied directly to the source, rather than saved in something like debian/patches?
&lt;ScottK&gt; maxwellian: Yes.
</pre>

_**#ubuntu-devel:**_

<pre class="sh_sh">
&lt;maxwellian&gt; solo por curiosidad, que es lo que la gente quiere decir cuando menciona parche “inline”? Parches que se aplican directamente al codigo fuente, en lugar de ponerse en sitios como debian/patches?
&lt;ScottK&gt; maxwellian: Si
</pre>

**#ubuntu-motu:**

<pre class="sh_sh">
&lt;ScottK&gt; ryanakca: If Debian doesn’t have a patch system, don’t add one.
</pre>

_**#ubuntu-motu:**_

<pre class="sh_sh">
&lt;ScottK&gt; ryanakca: Si Debian no integra sistema de parches (quilt, dpatch) no agregues uno
</pre>

  [67]: https://addons.mozilla.org/en-US/firefox/addon/748/
  [68]: https://wiki.ubuntu.com/Bugs/Responses
  [69]: https://launchpad.net/~gm-dev-launchpad/+archive/ppa/+packages
  [70]: https://bugzilla.kernel.org/&gt
  [71]: http://limulus.wordpress.com/2007/08/13/2010-the-year-of-the-linux-desktop/
  [72]: https://wiki.ubuntu.com/UbuntuBugDay/20100708
  [73]: https://launchpad.net/bugs/bugtrackers

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/07/13/comentarios-aleatorios-4/)
