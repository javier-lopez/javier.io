---
layout: post
date: 2010-06-15 12:07:44 -0600
title: "primer paso, configurar el entorno - motu"
tags: [ubuntu, motu]
description: "Este es un peque\u00f1o paso para la humanidad pero un gran paso para mi. Para poder empezar se necesita lo siguiente: Abrir una cuenta en launchpad: https://logi..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

> Este es un pequeño paso para la humanidad pero un gran paso para mi.

* * *

Para poder empezar se necesita lo siguiente:

  1. Abrir una cuenta en launchpad: <https://login.launchpad.net/+new_account>
  2. Crear una clave ssh y se [subirla][1] a launchpad o subir la que ya tengas
  3. Crear una clave [gpg][2] y se subirla a launchpad o subir la que ya uses
  4. Firmar el codigo de [conducta][3] de Ubuntu
  5. Instalar los scripts de desarrollo ‘ubuntu-dev-tools’ y se correr el programa ‘setup-packaging-environment’
  6. Crear un entorno de desarrollo para compilar software. Yo uso pbuilder.
  7. Crear un entorno de [desarrollo][4] para probar software, esto es diferente de crear un chroot para compilar/empaquetar paquetes. Yo uso virtualbox.
  8. Crear un ppa (repositorio personal), eso es opcional, pero lo he encontrado muy util para que puedan probar tus cambios rapidamente, usa: [https://launchpad.net/~**usuario** /+activate-ppa][5]
  9. Tener en marca personal canales importantes, como #ubuntu-motu #ubuntu-bugs, #ubuntu-devel, #ubuntu-meeting, #ubuntu-packaging
  10. Suscribirse a listas relacionadas:

  * <https://lists.ubuntu.com/#Development+Lists>
  * <https://lists.ubuntu.com/#Bug+Lists>

Creo que eso es todo.

  [1]: https://help.launchpad.net/YourAccount/CreatingAnSSHKeyPair
  [2]: https://help.ubuntu.com/community/GnuPrivacyGuardHowto
  [3]: https://launchpad.net/codeofconduct
  [4]: https://wiki.ubuntu.com/UbuntuDevelopment/UsingDevelopmentReleases
  [5]: https://launchpad.net/%7Eusuario/+activate-ppa

Publicado originalmente en [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2010/06/15/primer-paso-configurar-el-entorno/)
