---
layout: post
title: "notas sobre pbuilder - motu"
tags: [ubuntu, motu]
description: "He decidido hacer esta entrada despues de modificar muy levemente algunas de las opciones en la conf. de pbuilder. Mi objetivo ha sido poder trabajar mas fac..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

He decidido hacer esta entrada despues de modificar muy levemente algunas de
las opciones en la conf. de pbuilder.

Mi objetivo ha sido poder trabajar mas facilmente con diferentes versiones de
Ubuntu, lucid, maverick y sid (debian unstable).

Si por alguna razon alguien mas llega a leer esta entrada, le advierto que
probablemente tendra que cambiar algunas de estas opciones. Tambien me
gustaria aclarar que todo lo he encontrado en la documentacion oficial:

  * <http://www.netfort.gr.jp/~dancer/software/pbuilder-doc/pbuilder-doc.html>
  * <https://wiki.ubuntu.com/PbuilderHowto>

Primero explicare que es lo que he entendido por ‘pbuilder’, pbuilder es un
conjunto de scripts en bash que permiten crear un chroot donde se alojara 1 o
mas sistemas minimalistas, esto ademas de ayudar a la calidad de los paquetes
evitara que se descarguen y se dejen todas las dependencias regadas en la
maquina.

La primera vez que se ejecuta $ sudo pbuilder create; este llamara a
‘debootstrap‘ el cual descargara paquetes elementales para tener un sistema
funcional de la distribucion que se haya elegido. A continuacion pbuilder
copiara algunos archivos de /etc, y agregara los repositorios que se hayan
elegido. Cuando el sistema este listo, lo empaquetara en un .tar.gz y lo
depositara en el lugar que se le haya indicado, por defecto en
/var/cache/pbuilder/.

De ahi en adelante, cada vez que se llame para compilar algo, $ sudo pbuilder
build archivo.dsc; descomprimira el paquete, montara algunas carpetas,
descargara las dependencias y compilara el archivo que le hayan indicado. Una
vez completado el proceso, copiara el binario (.deb) al lugar que le hayan
especificado y las dependencias a su propia cache (que es diferente a la del
sistema) tambien destruira el entorno, asi la proxima vez que compile algo,
arrancara de 0, sin conocimiento previos de nada.

Antes de intentar configurar ‘pbuilder‘ he intentado usar ‘pbuilder-dist‘ un
script en python que viene en el paquete ‘ubuntu-dev-tools‘, sin embargo mi
experiencia no ha sido la mejor, ya que no he podido hacer que hiciera
exactamente lo que queria, la responsabilidad la tomo yo mismo por no haber
sabido interpretar la documentacion, si alguien ha podido armar un buen
entorno con el, me gustaria leer su comentario.

Lo primero que he hecho es agregar los siguiente a ~/.pbuilderrc :

<pre class="sh_sh">
# https://wiki.ubuntu.com/PbuilderHowto
if [ -z "$PATH_PBUILDER" ]; then
  PATH_PBUILDER="/var/cache/pbuilder" #without the last "/"
fi

# Codenames for Debian suites according to their alias. Update these when needed.
UNSTABLE_CODENAME="sid"
TESTING_CODENAME="squeeze"
STABLE_CODENAME="lenny"
STABLE_BACKPORTS_SUITE="$STABLE_CODENAME-backports"

# List of Debian suites.
DEBIAN_SUITES=($UNSTABLE_CODENAME $TESTING_CODENAME $STABLE_CODENAME
  "unstable" "testing" "stable")

# List of Ubuntu suites. Update these when needed.
UBUNTU_SUITES=("maverick" "lucid" "karmic" "jaunty" "hardy")

# Mirrors to use. Update these to your preferred mirror.
DEBIAN_MIRROR="ftp.us.debian.org"
UBUNTU_MIRROR="us.archive.ubuntu.com"
#UBUNTU_MIRROR="mirrors.kernel.org" #sometimes it's out of sync

# Optionally use the changelog of a package to determine the suite to use if
# none set.
if [ -z "${DIST}" ] &amp;&amp; [ -r "debian/changelog" ]; then
  DIST=$(dpkg-parsechangelog | awk '/^Distribution: / {print $2}')
  # Use the unstable suite for certain suite values.
  if $(echo "experimental UNRELEASED" | grep -q $DIST); then
    DIST="$UNSTABLE_CODENAME"
  fi
fi

# Optionally set a default distribution if none is used. Note that you can
# set your own default (i.e. ${DIST:="unstable"}).
: ${DIST:="$(lsb_release --short --codename)"}

# Optionally change Debian release states in $DIST to their names.
case "$DIST" in
  unstable)
    DIST="$UNSTABLE_CODENAME"
    ;;
  testing)
    DIST="$TESTING_CODENAME"
    ;;
  stable)
    DIST="$STABLE_CODENAME"
    ;;
esac

# Optionally set the architecture to the host architecture if none set. Note
# that you can set your own default (i.e. ${ARCH:="i386"}).
: ${ARCH:="$(dpkg --print-architecture)"}

NAME="$DIST"
if [ -n "${ARCH}" ]; then
  NAME="$NAME-$ARCH"
  DEBOOTSTRAPOPTS=("--arch" "$ARCH" "${DEBOOTSTRAPOPTS[@]}")
fi

#################
# Base settings #
#################
BASETGZ="$PATH_PBUILDER/$NAME/$NAME-base.tgz"
# Optionally, set BASEPATH (and not BASETGZ) if using cowbuilder
# BASEPATH="$PATH_PBUILDER/$NAME/base.cow/"
DISTRIBUTION="$DIST"
APTCACHE="$PATH_PBUILDER/$NAME/aptcache/"
BUILDPLACE="$PATH_PBUILDER/$NAME/build/"
BUILDRESULT="$HOME/misc/packages/ubuntu/results/$NAME/"

if $(echo ${DEBIAN_SUITES[@]} | grep -q $DIST); then
  # Debian configuration
  MIRRORSITE="http://$DEBIAN_MIRROR/debian/"
  COMPONENTS="main contrib non-free"
  # This is for enabling backports for the Debian stable suite.
  if $(echo "$STABLE_CODENAME stable" | grep -q $DIST); then
    EXTRAPACKAGES="$EXTRAPACKAGES debian-backports-keyring"
    OTHERMIRROR="$OTHERMIRROR | deb http://www.backports.org/debian $STABLE_BACKPORTS_SUITE $COMPONENTS"
  fi
elif $(echo ${UBUNTU_SUITES[@]} | grep -q $DIST); then
  # Ubuntu configuration
  MIRRORSITE="http://$UBUNTU_MIRROR/ubuntu/"
  COMPONENTS="main restricted universe multiverse"
else
  echo "Unknown distribution: $DIST"
  exit 1
fi

# ccache
#sudo mkdir -p "$PATH_PBUILDER/ccache"
#sudo chmod a+w "$PATH_PBUILDER/ccache"
if [ -f /usr/bin/ccache ]; then
  export PATH="/usr/lib/ccache:$PATH"
  export CCACHE_DIR="$HOME/.ccache_ubuntu"
  EXTRAPACKAGES="ccache ${EXTRAPACKAGES}"
  BINDMOUNTS="${CCACHE_DIR} ${BINDMOUNTS}"
  #if [ -n "${BUILDUSERID}" ]; then
  #chown "${BUILDUSERID}":"${BUILDUSERID}" "${CCACHE_DIR}" || true
  #fi
  #export CCACHE_PREFIX="distcc"
fi
</pre>

Usando esta configuracion, es posible hacer, cada comando me ha tomado 30 min,
con una conexion de 1 Mb/s.

<pre class="sh_sh">
$ sudo DIST=lucid pbuilder create
$ sudo DIST=maverick pbuilder create
$ sudo DIST=sid pbuilder create
</pre>

Y se crearan 3 diferentes .tar.gz en diferentes localidades:

<pre class="sh_sh">
$ tree /var/cache/pbuilder.
├── aptcache/
├── build/
├── lucid-i386/
│   ├── aptcache/
│   ├── build/
│   └── lucid-i386-base.tgz
├── maverick-i386/
│   ├── aptcache/
│   ├── build/
│   └── maverick-i386-base.tgz
├── pbuildd/
├── pbuilder-mnt/
├── pbuilder-umlresult/
├── result/
└── sid-i386/
    ├── aptcache/
    ├── build/
    └── sid-i386-base.tgz
</pre>

Para no tener que estar definiendo manualmente la distribucion, he creado unos
‘alias’ que lo hacen por mi, en ~/.bashrc:

<pre class="sh_sh">
alias pbuilder.lucid='sudo DIST=lucid pbuilder'
alias pbuilder.maverick='sudo DIST=maverick pbuilder'
alias pbuilder.sid='sudo DIST=sid pbuilder'
alias pbuilder.unstable='sudo DIST=unstable pbuilder'
</pre>

De esta forma, puedo usar $ pbuilder.lucid create, por poner un ejemplo.

Tambien he cambiado la ubicacion de donde se alojan los paquetes compilados,
porque comunmente hago backup de mi $HOME y me gustaria que estuvieran
incluidos sin tener que hacer una excepcion. Poco despues de hacer el cambio,
he notado que ‘pbuilder‘ escribe esa carpeta como ‘root‘ (pbuilder, hasta
donde se, siempre debe correr como root) lo cual me ha molesta un poco (soy
algo quisquilloso), asi que he modificado /usr/lib/pbuilder/pbuilder-
buildpackage para que cambie los permisos:

<pre class="sh_sh">
$ cd /usr/lib/pbuilder
$ diff -Naur  pbuilder-buildpackage  ../../../../pbuilder-buildpackage
--- ./pbuilder-buildpackage    2009-12-30 10:28:35.000000000 -0600
+++ ../../../../pbuilder-buildpackage    2010-08-09 18:08:34.896255762 -0500
@@ -58,6 +58,8 @@
 if [ ! -d "${BUILDRESULT}" ]; then
 if [ -n "${BUILDRESULT}" ] ; then
 mkdir -p "${BUILDRESULT}"
+        chown -R "${BUILDRESULTUID}:${BUILDRESULTGID}" "${BUILDRESULT}"../../
+        chgrp -R "${BUILDRESULTGID}" "${BUILDRESULT}"../../
 fi
 if [ -d "${BUILDRESULT}" ]; then
 log "I: created buildresult dir: ${BUILDRESULT}"
</pre>

Eso provoca que ~/misc/packages/ubuntu/results pertenezca a mi usuario y no a
root, OJO: este cambio dudo que alguien quiera usarlo, lo comento para mi
propia referencia.

Finalmente he decidio usar ‘ccache‘ para aumentar la velocidad en la que se
compilan los paquetes (al menos los que estan programados en C/C++). Para
darse una idea, un paquete que tarda 15 min sin ccache, reduce su tiempo a 12
min.

Aqui he tenido que estar probando porque tambien uso ccache independientemente
de la empaquetacion. Asi que he creado 2 directorios, el que uso para
programas personales, ~/.ccache tiene los permisos ordinarios, y el que usa
ubuntu ~/.ccache_ubuntu (se puede ver en el archivo de conf de pbuilder que
puse mas arriba) debe tener permisos 777, esto es permisos para cualquiera.
Pbuilder internamente usa el usuario con id 1234, asi que o se le dan permisos
777 o se agrega ese usuario al mismo grupo y se le da 774, lo primero creo que
es mas “seguro”. Despues de eso y para ver las estadisticas se debe llamar
ccache, de esta manera: $ CCACHE_DIR=~/.ccache_ubuntu , he agregado otro alias
para simplificarlo:

<pre class="sh_sh">
alias ccache.ubuntu='CCACHE_DIR=~/.ccache_ubuntu ccache'
</pre>

De esta manera, puedo llamar a ccache como: $ ccache -s o $ ccache.ubuntu -s;
dependiendo de las estadisticas que quiera ver.

Listo, eso es lo que he modificado al momento, me falta por investigar como
funcionan los ‘hooks‘, que al parecer son comandos que se ejecutan cuando se
cumplen determinadas caracteristicas, ya blogueare al respecto.

  * <http://www.debian.org/doc/maint-guide/ch-build.en.html#s-pbuilder>

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/08/10/notas-sobre-pbuilder/)
