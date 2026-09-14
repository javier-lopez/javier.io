# TODO — javier.io/blog

Ideas editoriales pendientes. Este archivo no se publica (está en `exclude`
de `_config.yml`).

## Serie IA — parte 3: qué aprendí después

La serie (la falsa democratización → la brecha invisible) predijo que las
herramientas del meta-stack serían absorbidas por los modelos base.
Escribir la verificación de esa predicción unos meses después: qué
herramientas ya deseché, cuáles sobrevivieron y por qué, y qué cambió en
la práctica de dirigir agentes. La honestidad de auditar la predicción
propia es el post.

## Extraer aprendizajes de los apuntes de proyectos

Los repos privados acumulan postmortems y lecciones (incidentes, summaries,
reglas de agente) que son material de blog ya escrito — solo falta quitarle
secretos y ponerle narrativa. Ritmo sugerido: una lección por trimestre.

Candidatos:

- DO Spaces no soporta CopyObject con SSE-C (toca get+put re-poniendo
  ContentType y ACL a mano) — nadie ha escrito esto en internet.
- El incidente de credenciales de storage borradas por una intuición
  equivocada sobre quién es dueño del `.env` en los deploys.
- Migrar dos sitios de producción a un nodo compartido (la versión mayor
  de postgres derivada como MAX entre los árboles desplegados).
- Cuatro días iterando deploys antes de parar a auditar el pipeline
  completo — lo que 30 segundos de auditoría hubieran ahorrado.

---

# Mantenimiento

Lo de arriba es qué escribir. Lo de abajo es qué arreglar.

## Los 13 posts con grabaciones de showterm muertas

`showterm.io` dejó de existir — devuelve 404 hasta en la raíz. Trece posts
lo incrustan con `<iframe>`, catorce grabaciones en total, y hoy son marcos
vacíos en el sitio publicado.

**No se pueden recuperar.** Consulté cuatro de los catorce ids contra la API
del Wayback Machine y no hay copia de ninguno. Tampoco la habría: un
archivador guarda el HTML de la página que *reproduce* una grabación, nunca
la grabación, que llegaba por la API del servicio. Archivar antes tampoco
habría servido; lo único que servía era no alojar contenido propio en casa
ajena.

Los posts, con cuántos iframes lleva cada uno:

- `en/_posts/2010-07-11-fu-search.md` (1)
- `en/_posts/2010-11-28-send-emails-from-terminal.md` (1)
- `en/_posts/2011-04-05-dont-let-cd-slow-you-down-wcd-commacd.md` (1)
- `en/_posts/2011-11-18-deb-packages-cache.md` (1)
- `en/_posts/2012-03-19-rm-wrapper.md` (1)
- `en/_posts/2013-05-28-remote-environments-normalization.md` (1)
- `en/_posts/2013-06-18-bash-lib.md` (1)
- `en/_posts/2013-11-07-public-cloud-services-and-vagrant.md` (1)
- `en/_posts/2013-11-15-shundle.md` (2)
- `en/_posts/2013-11-19-simple-pxe-setup.md` (1)
- `en/_posts/2013-12-17-ssh-captcha.md` (1)
- `en/_posts/2014-02-22-github-page-build-failed.md` (1)
- `en/_posts/2014-02-25-howdoi-in-shell-scripting.md` (1)

Qué hacer, por post y en este orden:

1. **Quitar el iframe en los trece.** Es mecánico y quita trece agujeros del
   sitio hoy mismo. En su lugar, una frase diciendo qué mostraba la
   grabación; el post recupera sentido aunque pierda la demo.
2. **Regrabar solo los que lo merezcan.** Casi todos son trucos de shell que
   se pueden volver a ejecutar. Candidatos por valor: `shundle` (son dos y
   es el proyecto propio), `bash-lib`, `howdoi-in-shell-scripting`. El resto
   probablemente no vale el rato.
3. Regrabar con `asciinema rec` y seguir el patrón ya montado en
   `blog/es/_posts/2017-07-27-talks-vlide.md` (commit b35066b): el `.cast`
   comprimido en `assets/asciinema.org/casts/`, el reproductor autoalojado,
   y `assets/js/asciinema-local.js` + `assets/css/asciinema-local.css`
   haciendo el resto. Ese CSS ya trae los tres overrides que hacen falta
   para que un terminal sobreviva a las reglas de `pre` del sitio —
   están comentados ahí con el porqué.

No hay prisa y no se arregla solo: cuáles regrabar es criterio editorial,
no una decisión técnica que un agente pueda tomar por su cuenta.

## Enlaces muertos en el archivo viejo

Del mismo hallazgo. El corpus tiene 1132 enlaces externos a 386 dominios en
169 de 188 posts. En una muestra de 30 enlaces de 2010–2012, siete estaban
muertos: `behindmotu.wordpress`, `qa.ubuntuwire.org`, `anonscm.debian` (dos),
dos `tinyurl` y el propio `showterm.io`. Cerca de un 23%.

Hacia adelante ya está cubierto: el job `archive` del workflow manda cada
post publicado al Wayback Machine con `capture_outlinks=1`, así que lo que
cites de ahora en más queda copiado sin hacer nada. Lo que falta es el
pasado:

- Un `workflow_dispatch` que postee las 188 URLs de post con
  `capture_outlinks=1` para rellenar de una vez. Son 188 peticiones, no
  1132: el Archive recorre los enlaces de cada página por su cuenta.
- Un verificador de enlaces (`lychee` o `html-proofer`) en cron semanal que
  abra un issue con los caídos, para enterarse en días y no en doce años.
