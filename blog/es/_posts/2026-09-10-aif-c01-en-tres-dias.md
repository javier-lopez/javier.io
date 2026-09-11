---
layout: post
title: "aif-c01 (aws certified ai practitioner) en tres días"
description: "Aprobé el AWS Certified AI Practitioner con 85 % después de tres días de estudio. Llevo un año dirigiendo agentes de IA en proyectos reales. Esta certificación no enseña a hacer eso. Sirve para hablar el idioma de AWS..."
tags: [ai, personal]
related:
  - /blog/es/2026/03/27/la-brecha-invisible-herramientas-para-dirigir-la-ia.html
  - /blog/es/2026/02/17/la-falsa-democratizacion-de-la-tecnologia.html
  - /blog/es/2026/01/25/de-nand-a-tetris.html
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

### Por qué este examen

Aprobé el AWS Certified AI Practitioner con 85 % después de tres días de estudio. Llevo un año dirigiendo agentes de IA en proyectos reales (lo conté en [la brecha invisible](/blog/es/2026/03/27/la-brecha-invisible-herramientas-para-dirigir-la-ia.html)). Esta certificación no enseña a hacer eso. Sirve para hablar el idioma de AWS sobre ello: qué servicio es qué, cuándo RAG y cuándo ajuste fino, qué significa cada sigla. Es una credencial-puente sobre la teoría y la práctica.

### Consideraciones sobre el examen

**AWS publicó la versión 1.1 de la guía el 30 de abril de 2026 y el examen la refleja desde junio**. La v1.1 añade IA agéntica, MCP, Bedrock AgentCore (Identity y Policy), Strands Agents, Kiro, Amazon Quick, AWS Transform, precio por tokens, ingeniería de contexto, destilación, Prompt Management, LLM-as-a-judge y detección de alucinaciones. Amazon Q Business ya no existe con ese nombre; ahora es Amazon Quick. Q Developer es Kiro.

La mayoría de cursos se hicieron en 2024 o 2025, cuidado a la hora de comprar.

Hice el examen en español y me arrepentí. La traducción tiene errores, y en casi todas las preguntas tuve que abrir la versión en inglés.

### El método: una guía que se escribe con mis dudas

En vez de un curso, construí una guía propia con Claude Code (modelo Fable 5.1), como un artefacto HTML que se publica y se corrige al vuelo. La estructura:

- Los cinco dominios digeridos por el agente, ordenados por peso: primero lo que más puntos devuelve.
- Lo nuevo de la v1.1 marcado como tal.
- Un acordeón con:
  - **«si la pregunta dice… piensa en…»**:
  - **Texto a voz** → Polly.
  - **PII en S3** → Macie.
  - **Datos propios, con citas y sin reentrenar** → RAG.
- Una pestaña de siglas con tooltips al pasar el ratón, porque la guía de AWS asume que sabes qué es RLHF, PEFT o A2I.
- Dos simuladores propios, 104 y 87 preguntas en los cuatro formatos, con modo estudio (explicación inmediata) y modo examen de 65 preguntas y 90 minutos de reloj, y repetición de las falladas.

El bucle de trabajo fue: leía una sección. Discutía con el agente lo que no entendía, la explicación llegaba con un ejemplo concreto y volvía a la guía en el mismo sitio; a veces, si el tema no era claro, lo agregaba, pero la mantuve con un largo de máx. 30 min de lectura.

### Los recursos, con veredicto

Todos gratis. El único gasto fue el examen: 50 USD con el código de descuento **AIF2CLOUD**.

**[La guía oficial v1.1](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)** — la fuente de verdad, pero no la leí yo. La leyó la IA para generar resúmenes, junto con la [página de cambios de v1.0 a v1.1](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html) y la [lista de servicios en alcance](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-in-scope-services.html), que fue la que resolvió dudas como «¿S3 Vectors entra?» (no aparece como entrada propia; aparece Amazon S3).

**[Set oficial de 20 preguntas de AWS Skill Builder](https://skillbuilder.aws/learn/4URFGY63KV/official-practice-question-set-aws-certified-ai-practitioner--aifc01--english/FVG43Y1PAX)** — el estilo exacto del examen. Fallé tres, y las tres eran de «elige DOS» con una de las dos bien, así que estudié más preguntas en ese formato.

**[CloudCertPrep](https://www.cloudcertprep.io/aws/aif-c01)** — declara estar alineado con la v1.1. Gratis y de código abierto. Simulacro completo de 65: 889/1000, 88 %, en 33 minutos. Su explicación de una pregunta sobre S3 está desactualizada (S3 Vectors ya existe), pero la respuesta que marcan sigue siendo la correcta para el examen: si ofrecen OpenSearch y «Amazon S3» a secas, es OpenSearch.

**[Tutorials Dojo, sampler gratuito](https://portal.tutorialsdojo.com/courses/free-aws-certified-ai-practitioner-practice-exams-aif-c01-sampler/)** — 20 preguntas más largas y rebuscadas, me imagino que para vender sus cursos, obtuve 70 %. No hace falta.

**Mis dos simuladores** — el primero con 104 preguntas escritas sobre la guía, y el segundo con 87 más difíciles: escenarios largos, distractores que resuelven un problema parecido, cálculos de métricas. 85 % en el segundo la víspera.

**Documentación de AWS** — tampoco la leí. Para dudas puntuales ([S3 Vectors](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html), [Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html), [AgentCore](https://aws.amazon.com/bedrock/agentcore/)) la consultó la IA y leí la respuesta generada.

Lo que no usé: videos, laboratorios, dumps de preguntas reales.

### Lo que fallé y cómo lo corregí

**El cebo de la palabra repetida.** El distractor favorito del examen es la opción que repite una palabra del enunciado sin hacer lo que piden. «Interfaz para etiquetar» → Rekognition Custom *Labels* (entrena un modelo; etiquetar es Ground Truth). «Cómo influye cada característica» → *Feature* Store (solo las guarda; explicar es Clarify). «Datos sensibles en las respuestas» → Macie (escanea S3; las respuestas las filtra Guardrails). En un simulacro, cuatro de siete fallos fueron esto. Antes de marcar: ¿este servicio hace la acción que piden, o solo comparte la palabra?

**La última frase se lee primero.** Ahí está lo que piden y el criterio: MÁS rentable, MENOR esfuerzo operativo, MENOR latencia. El escenario solo aporta palabras clave. En una pregunta sobre «recomendaciones personalizadas con un servicio totalmente gestionado» marqué Bedrock; la última frase decía «construir, entrenar y desplegar modelos», que es la definición de SageMaker.

**Ground Truth antes de entrenar, A2I después de inferir.** Los dos usan personas. Ground Truth etiqueta datos; A2I revisa predicciones de baja confianza en producción. La palabra «humano» no decide.

**La misma palabra, dos servicios.** «Sesgo en los datos de entrenamiento» → Clarify. «PII en los datos de entrenamiento que están en S3» → Macie. Decide el sustantivo que acompaña, no «datos de entrenamiento».

**El mismo dominio, dos métricas.** Fraude que va a revisión manual → recall (que no se escape ninguno). Fraude que se bloquea automáticamente → precisión (no molestar a clientes legítimos). No memorices el dominio; busca qué error dice el enunciado que es caro.

**Transparencia no es equidad.** «Claridad sobre cómo se toman las decisiones» es transparencia aunque el escenario hable de ayudas sociales. Las dimensiones de IA responsable se distinguen por la palabra clave del requisito, y ese dominio fue mi más flojo en los tres simulacros.

**Muletillas propias**:

- Macie = maza (*mace*) = arma de defensa = seguridad = S3. Es un servicio de seguridad, no de ML. Sin «S3» o «bucket» en el enunciado, no es Macie.
- Clarify aclara el modelo. Y solo va con SageMaker, así que se trata de un modelo.
- Comprehend comprende el texto. Va con los servicios que tienen «e» y son varios: Translate, Transcribe, Lex. Clarify no tiene «e» y solo se lleva con un servicio.

### El plan, tal como ocurrió

- **Lunes noche**: formato del examen y el dominio de más peso, modelos fundacionales. Parámetros de inferencia, RAG, cómo adaptar un FM, métricas de evaluación.
- **Martes**: IA generativa, fundamentos, IA responsable, seguridad. El set oficial de 20. Contesté el primer simulador. Construí el segundo, más difícil.
- **Miércoles**: CloudCertPrep, Tutorials Dojo, el segundo simulador. Con los fallos de los tres, una pestaña de «último repaso»: horario, técnica de respuesta, una tabla «si dice → es → no es» hecha solo con lo fallado, y las dimensiones de IA responsable por palabra clave. A las nueve de la noche, me puse a jugar Battle for Wesnoth para cambiar de tema.
- **Jueves**: por la mañana toqué sax un rato para relajarme, 30 minutos antes check-in. Examen a las 11:45.

Unas diez horas útiles en total. El examen no es tan fácil, no hay que confiarse. Mi contexto es de 18 años en la industria, 1 año trabajando todos los días con la IA, leyendo sobre el tema de manera casual. Sus resultados podrían variar.

### Referencias

- AWS (2026). *[AWS Certified AI Practitioner (AIF-C01) Exam Guide v1.1](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)* y su [historial de revisiones](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html): la fuente de verdad sobre qué entra.
- AWS Skill Builder. *[Official Practice Question Set: AIF-C01](https://skillbuilder.aws/learn/4URFGY63KV/official-practice-question-set-aws-certified-ai-practitioner--aifc01--english/FVG43Y1PAX)*: 20 preguntas gratis con el estilo real.
- Santonastaso, A. *[CloudCertPrep, AIF-C01](https://www.cloudcertprep.io/aws/aif-c01)*: banco abierto alineado con la v1.1.
- Rose, D. (2026). *[I scored 1000/1000 on AWS Certified AI Practitioner](https://dev.to/dale-rose/i-scored-10001000-on-aws-certified-ai-practitioner-aif-c01-heres-every-resource-i-used-4alf)*: el artículo que sirvió de molde para este.

Buena suerte en su certificación. El futuro es hoy, viejo 🎓
