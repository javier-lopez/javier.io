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
