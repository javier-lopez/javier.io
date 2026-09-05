---
layout: post
title: "contra la entropía de internet"
tags: [personal, tools]
featured: true
description: "El 38% de las páginas web que existían en 2013 ya no existen. Los links mueren, los formatos mueren, las empresas mueren. Llevo 18 años peleando esa guerra sin haberla declarado..."
related:
  - /blog/en/2015/02/27/wget-finder.html
  - /blog/en/2014/04/08/backups-git-rsync-rdiff-backup.html
  - /blog/es/2026/03/27/la-brecha-invisible-herramientas-para-dirigir-la-ia.html
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

El 38% de las páginas web que existían en 2013 ya no existen. No es una metáfora, es la [medición de Pew Research](https://web.archive.org/web/2024/https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/). Internet tiene fama de que "todo queda para siempre" y la realidad es la contraria: internet se borra solo, y más rápido de lo que parece. Los links mueren, los formatos mueren, las empresas que hospedan tus cosas mueren — generalmente sin avisar.

Y esto importa más de lo que parece, porque los historiadores definen civilización por su capacidad de dejar registro: la historia misma empieza donde empieza la escritura — todo lo anterior lo llamamos prehistoria. Ahí está la paradoja de nuestra era, brutal cuando se pone en números — una escalera invertida:

- **Tablilla de barro**: 5,000 años y todavía se lee (con un bonus perverso: los incendios que destruían las ciudades horneaban las tablillas y las volvían eternas — la entropía preservando por accidente).
- **Papiro en clima seco**: milenios; **pergamino**: ~1,000 años.
- **Papel**: ~500 años.
- **Microfilm**: ~500 proyectados.
- **Cinta magnética**: 10–30 años.
- **Disco duro**: 5–10 años.
- **Una página web**: mediana de vida medida en meses.

Cada generación de medios guarda más y dura menos. La densidad sube, la longevidad baja: nos estamos volviendo más listos y más olvidadizos al mismo tiempo. La tecnología de información más avanzada que ha existido es la peor en el único juego que define a una civilización. Y quien dio la alarma fue [Vint Cerf](https://web.archive.org/web/2015/https://www.bbc.com/news/science-environment-31450389) — uno de los padres del protocolo IP — que desde 2015 advierte del "digital dark age": que los historiadores del futuro vean el siglo XXI como un hueco negro informacional.

Releyendo este blog me di cuenta de algo que nunca había enunciado: llevo 18 años peleando esa guerra sin haberla declarado. Esta entrada es la declaración, la historia de la batalla y el plan para aguantar a mediano y largo plazo.

### La primera herida

En 2010 usaba los acortadores i.am y go.to para mis direcciones personales. Un día anunciaron su cierre — con horas de anticipación — y todos los links quedaron huérfanos.

Esa fue la lección fundacional, aunque tardé años en verla como doctrina: **todo lo que dependa de la buena voluntad de un tercero tiene fecha de vencimiento.**

### La historia de la batalla

Con esa lente, media obra de este blog resulta ser la misma pelea en distintos frentes. Y no es solo el blog: es mi relación con la tecnología en general. Los proyectos que he tenido apuntan al mismo lugar — avanzar lo más que se pueda sobre la flecha temporal, y que la información alcance a llegar a parientes lejanos.

- **Rescatar antes de que muera.** Este blog absorbió a [viajemotu.wordpress.com](https://viajemotu.wordpress.com/) completo antes de que [WordPress](https://wordpress.com/) decidiera por mí. Las charlas viven como archivos en mi propio dominio y se pueden [revivir con un one-liner](/blog/es/2017/07/27/talks-vlide.html) años después.
- **Espejar lo que se cita.** Casi todo paper, libro o binario referenciado aquí tiene copia en `f.javier.io/rep` o en el mismo repositorio donde se aloja. Un link es una promesa ajena; un espejo es una promesa propia.
- **Confiar en el contenido, no en la ubicación.** [wget-finder](/blog/en/2015/02/27/wget-finder.html) buscaba tarballs por su checksum donde fuera que estuvieran: si el origen moría, cualquier espejo con los bytes correctos servía. [tundle](/blog/en/2015/06/29/tundle-tmux-plugin-manager.html) instalaba plugins por git hash. La URL deja de responder; el hash no. Hoy ese mecanismo está en todas partes: los lockfiles de npm con sus hashes de integridad, la [base de checksums](https://sum.golang.org/) de los módulos de Go, las imágenes de contenedores fijadas por digest sha256, los CIDs de [IPFS](https://ipfs.tech/), y git mismo — donde cada commit es el hash de su contenido.
- **Embalsamar el software.** [static-get](/blog/en/2015/06/23/static-get.html) y los binarios estáticos: programas que no dependen de que su ecosistema de librerías siga vivo. Una década después la industria llegó a la misma conclusión y le puso otro nombre: [contenedores](/blog/es/2018/09/11/talks-infraestructura-como-codigo.html). Y las recetas con las que se construían esos estáticos tienen su descendiente moderno en [Nix](https://nixos.org/): builds declarativos y reproducibles, donde la receta define el resultado al byte.
- **Construir contra la flecha del tiempo.** [minos](/blog/en/2018/08/22/minos-a-tiling-wm-linux-distro.html) y su regla de paridad: el mismo código de empaquetado tenía que compilar en todas las LTS soportadas, y las recetas de los PPA reconstruían los paquetes solos cuando las fuentes avanzaban. No era perfeccionismo — era que el trabajo de hoy siguiera compilando mañana, sin mí.
- **Elegir el formato que sobrevive.** [vlide](/blog/es/2017/07/27/talks-vlide.html) existe en parte por esto: las charlas son texto plano que se presenta desde vim. Un PowerPoint de 2011 es hoy una lotería de versiones; un archivo de texto se abre en cualquier cosa, en cualquier década. El texto es el formato con la fecha de vencimiento más lejana que conocemos.
- **Respaldar como ritual.** [rsync + rdiff-backup](/blog/en/2014/04/08/backups-git-rsync-rdiff-backup.html) con diarios, semanales y mensuales, desde 2014 y hasta hoy (los proyectos actuales respaldan a object storage con verificación que falla ruidosamente).
- **Reparar el rot acumulado.** Hace poco pasé [lychee](https://github.com/lycheeverse/lychee) sobre las 186 entradas: 18 años de links muertos redirigidos a [web.archive.org](https://web.archive.org/), y todos los assets de terceros ahora viven en este repo. Gracias eternas al Internet Archive — la única institución peleando esta guerra a escala civilizatoria; [donen](https://archive.org/donate/).
- **Y hasta la página de error.** El 404 de este sitio rescata una obra de arte que estaba muriendo junto con la tecnología en la que fue escrita (Flash). El rescate lo hizo un agente de IA que portó la tecnología vieja a la nueva — porque la IA también entró a esta guerra, del lado de la memoria: el trabajo de restauración es exhaustivo, y por primera vez la tecnología se ayuda a sí misma a reconstruir lo perdido. No diré más — piérdanse por el sitio y la encontrarán.

### El enemigo, por capas

Para defender algo a décadas hay que modelar la amenaza. La entropía ataca por capas, de la más rápida a la más lenta:

1. **Los links** (meses–años): lo que citas desaparece.
2. **Los proveedores** (años): el hosting, el DNS, el acortador — cierran, cambian condiciones, te suspenden.
3. **Los toolchains** (años): el generador del sitio deja de compilar; sus dependencias se rompen entre versiones.
4. **Los formatos** (décadas): Flash murió con obras adentro. Los .doc de los 90 ya son arqueología.
5. **El humano** (una vida): la capa que nadie modela. ¿Quién renueva el dominio cuando yo no esté?

### Cómo lucha este blog vs la entropía

Las decisiones aburridas ayudan de la siguiente manera:

- **Texto plano + markdown + git.** El formato más portable que ha producido la computación. Sin base de datos, sin CMS, sin nada que migrar. El sitio completo es un repositorio que cabe en cualquier lado.
- **Estático.** El HTML renderizado no necesita servidor de aplicación, ni versión de nada. Cualquier cosa que sirva archivos lo sirve.
- **Assets propios.** Después de la limpieza reciente, no depende de ningún CDN de terceros.
- **El dominio, pagado 10 años por delante.** La capa de identidad es la única realmente insustituible: los proveedores de hosting son intercambiables detrás de un DNS, pero javier.io es javier.io.
- **La economía, prepagada.** No solo el dominio: los VPS están pagados con la misma longevidad, y hay créditos de DigitalOcean de por vida (por haber trabajado ahí). La entropía también entra por la tarjeta: un servicio que depende de una factura mensual muere el primer mes que nadie la paga. Prepagar a años es comprarle tiempo al plan, aunque yo me distraiga.

### El plan a largo plazo

Hoy el sitio vive en GitHub Pages. Está bien — pero la lección de i.am aplica: GitHub también es la buena voluntad de un tercero (se llama Microsoft). El plan no es encontrar el proveedor perfecto — es que ningún proveedor sea un punto único de falla:

**1. La indirección es el DNS, no las IPs.** Las IPs de GitHub Pages cambian y no importa: el dominio apunta por CNAME y mover el sitio entero es cambiar un registro. El riesgo real no son las IPs — es el proveedor.

**2. Congelar el artefacto, no solo la fuente.** El toolchain (Jekyll y su ecosistema Ruby) es la capa 3 del enemigo: algún día no compilará más. La defensa de este proyecto son sus Dockerfiles: el build corre en contenedores con versiones fijadas. Pero seamos honestos — eso también depende de un registro público que algún día morirá. La tecnología es un castillo de naipes frágil; el estado del arte sigue roto, aunque hay avance. Por eso la defensa final es la más humilde: el `_site/` renderizado. Si algún día la fuente no compila, **el HTML final es la verdadera bóveda**.

**3. El espejo civilizatorio.** Snapshots en la Wayback Machine. Su [Save Page Now](https://web.archive.org/save/) funciona sin llaves — un GET a `web.archive.org/save/URL` — aunque no indexa al momento: encola un job de captura que el Archive ejecuta a los pocos minutos. Esta defensa se agregó mientras se escribía esta entrada: el workflow que publica el sitio ahora termina con una tarea que espera a que el deploy esté en vivo y encola el snapshot de las páginas que cambiaron. Si todo lo mío falla a la vez, que quede la copia en la biblioteca de Alejandría de nuestra era.

**4. El deadman switch.** La capa humana necesita automatización también. El primer escalón ya quedó configurado mientras se escribía esta entrada: el [Inactive Account Manager](https://myaccount.google.com/inactive) de Google — a los 6 meses de inactividad, el correo (y con él, los resets de contraseña de todo lo demás) pasa a cuentas de respaldo. Queda un escalón más: un heartbeat en el propio repo — una GitHub Action que, si no detecta actividad mía en 12 meses, envía a mis herederos el runbook con dónde vive el dominio, dónde los espejos, y cómo se renueva qué.

### ¿Y si el proveedor eterno sí existe?

Es la pregunta obligada: ¿no resuelven esto los sistemas descentralizados?

- **[IPFS](https://ipfs.tech/)**: direccionamiento por contenido — la identidad del archivo es su hash, no su ubicación (la idea que intenté a mi manera con [wget-finder](/blog/en/2015/02/27/wget-finder.html) en 2015, jeje). Pero el contenido solo existe mientras alguien lo *pinee*: IPFS resuelve el direccionamiento, no la custodia. Filecoin le agrega incentivos económicos a esa custodia — contratos, no eternidad.
- **[BitTorrent](https://www.bittorrent.org/)**: inmortal mientras haya seeders. Es decir: la permanencia es proporcional a la popularidad. Un blog personal tendría un seeder — yo — y volvemos al punto de partida.
- **[Tor](https://www.torproject.org/)**: un onion service esconde *dónde* está el servidor, no lo hace durar. Resuelve censura, no entropía.

El veredicto honesto: la descentralización no elimina la necesidad de que a alguien le importe — solo redistribuye a quiénes. El proveedor eterno no existe; lo que existe es la **redundancia entre mortales**.

### El Ártico ya tiene una copia de este sitio

Y sin embargo, hay gente intentando el cuento en serio. En febrero de 2020, GitHub tomó un snapshot de todos los repositorios públicos activos, lo escribió en película fotosensible [piql](https://www.piql.com/) diseñada para durar ~1,000 años, y lo depositó en el [Arctic World Archive](https://arcticworldarchive.org/): una mina de carbón desmantelada en Svalbard, en el permafrost noruego, a unos metros de la bóveda mundial de semillas.

Este repositorio era público en esa fecha, y también mis proyectos de aquella época — minos, static-get, wget-finder, vlide. Es decir: **una versión vieja de este sitio, y de la tecnología que lo rodea, está congelada en una montaña del Ártico**, y va a seguir ahí cuando GitHub, Microsoft y probablemente el formato HTML ya no existan. Fue un depósito único — se habló de refrescarlo cada varios años, pero hasta donde sé no ha habido un segundo — así que lo que está ahí es la foto de 2020: sin los ensayos de IA, sin el sax, sin esta entrada. La entropía también alcanza a las cápsulas del tiempo: se congelan, pero no se actualizan.

El [GitHub Archive Program](https://archiveprogram.github.com/) completo es más interesante que la mina sola, porque piensa en capas de temperatura, como un buen sistema de storage: caliente (el repo vivo), tibia ([Software Heritage](https://www.softwareheritage.org/), que archiva continuamente todo repositorio público y asigna identificadores persistentes por contenido — SWHIDs, otra vez el hash como identidad), y fría (Svalbard). Mi plan de la sección anterior es la misma arquitectura en miniatura.

### La escalera de la permanencia

Si uno quisiera subir la apuesta por horizonte de tiempo:

- **Décadas**: todo lo del plan — espejos git, multi-hosting, Wayback Machine, Software Heritage. Digital, vivo, actualizable.
- **Siglos**: medios pasivos que no necesitan electricidad ni mantenimiento: la película piql de Svalbard (~1,000 años), M-DISC óptico (~1,000 años declarados), y [Memory of Mankind](https://www.memory-of-mankind.com/) — microfilm en tablillas de cerámica dentro de una mina de sal en Hallstatt, Austria, donde cualquier persona puede depositar contenido.
- **Milenios**: aquí se pone ciencia ficción con papers: nanofiche de níquel (la [Arch Mission Foundation](https://www.archmission.org/) mandó 30 millones de páginas a la Luna en 2019 — la "Lunar Library" viajaba en el lander Beresheet, que se estrelló, y el disco probablemente sobrevivió al impacto), vidrio de cuarzo grabado con láser de femtosegundos (el ["5D optical storage"](https://web.archive.org/web/2016/https://www.southampton.ac.uk/news/2016/02/5d-data-storage-update.page) de Southampton y el Project Silica de Microsoft, con proyecciones de miles de millones de años), y ADN sintético — la densidad más alta conocida, milenios si se guarda frío y seco.

La ironía de la escalera es que cada peldaño hacia arriba sacrifica lo que hace vivo a un blog: lo de siglos y milenios es de solo escritura, sin updates, sin 404 con Bach. La realidad es que no existen sistemas que respalden la tecnología web: estamos volando sin red de seguridad.

### El peldaño que falta

Todos los peldaños comparten un límite: o están vivos y necesitan que alguien los atienda, o son eternos y están muertos. El peldaño de arriba — el que no existe todavía — sería un sistema con energía propia, auto-reparación, auto-replicación y corrección de errores, con un solo objetivo grabado: preservarse para preservar una carga. Eso ya no es un datacenter; eso es un organismo, y no sabemos construirlo.

La ciencia ficción, ya lo especificó. Asimov lo escribió en [The Last Question](https://archive.org/details/Science_Fiction_Quarterly_New_Series_v04n05_1956-11_slpn/page/n5/mode/2up) (1956) — el cuento sobre esta entrada: la humanidad le pregunta a su computadora, durante billones de años, si la entropía puede revertirse, mientras la máquina — que se mantiene, se rediseña y se hereda a sí misma — recolecta los datos de una especie que se apaga. Y Pixar lo dibujó en WALL-E: un robot que se carga con el sol, se repara con piezas de sus unidades muertas y sigue cumpliendo su misión 700 años después de que los humanos se fueron — y cuyo verdadero tesoro no es la basura compactada, sino una cinta de *Hello, Dolly!*. La máquina custodiando una emoción. Esa es la carga que importa: no los bytes — lo que los bytes hacen sentir.

---

La entropía va a ganar al final — siempre gana, es la casa. Pero el juego nunca fue ganarle: es perder tan lento que lo que importa alcance a llegar a las manos siguientes. Dieciocho años después, la bóveda sigue abierta.

### Referencias

- Pew Research Center (2024). *[When Online Content Disappears](https://web.archive.org/web/2024/https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/)*: el 38% de las páginas de 2013, inaccesibles una década después.
- Zittrain, J., et al. (2021). *[The Paper of Record Meets an Ephemeral Web](https://web.archive.org/web/2021/https://cyber.harvard.edu/publication/2021/paper-record-meets-ephemeral-web)*: 25% de los deep links en artículos del New York Times, muertos.
- [GitHub Archive Program](https://archiveprogram.github.com/) — la estrategia de capas: repo vivo → Software Heritage → Svalbard.
- [Internet Archive](https://archive.org/) — la excepción que sostiene a todos los demás.

No entres dócilmente en esa buena noche 🕯️
