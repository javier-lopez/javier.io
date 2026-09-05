---
layout: post
title: "la brecha invisible: herramientas para dirigir la ia"
description: "Llevo un mes construyendo tucastigo.com — una plataforma de chat en tiempo real con pagos crypto, contenido multimedia por niveles, moderación automática y perfiles swipe. ~96,000 líneas de código (18K..."
image: /assets/img/brecha-invisible.png
tags: [ai, tools]
featured: true
related:
  - /blog/es/2026/02/17/la-falsa-democratizacion-de-la-tecnologia.html
  - /blog/es/2026/01/25/de-nand-a-tetris.html
  - /blog/es/2025/12/29/pensando-con-flechas.html
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Llevo un mes construyendo [tucastigo.com](https://tucastigo.com) — una plataforma de chat en tiempo real con pagos crypto, contenido multimedia por niveles, moderación automática y perfiles swipe. ~96,000 líneas de código (18K Python backend + 23K TypeScript frontend + 48K tests + 12K tipos generados), 25 tablas en PostgreSQL, WebSocket bidireccional con 18 tipos de mensaje y presencia/persistencia, 143 endpoints REST, todo dockerizado y desplegado, con respaldos automaticos.

**[![terminal con listado de archivos y categorías tipo hacker, metáfora de las herramientas para dirigir a la IA](/assets/img/brecha-invisible.png)](/assets/img/brecha-invisible.png)**

En mi [artículo anterior](/blog/es/2026/02/17/la-falsa-democratizacion-de-la-tecnologia.html) argumenté que la IA no democratiza la tecnología — la amplifica para quienes ya tienen el conocimiento. Las decisiones de arquitectura (Flask vs. Django, cuándo cachear, cómo segmentar redes) no las toma la IA.

Pero hay una segunda capa que no cubrí: las herramientas para dirigir a la IA misma. Porque el cuello de botella pasó del código a la gestión eficiente de los agentes de IA — que pierden el contexto, olvidan las reglas, repiten errores, y olvidan dónde están parados en un proyecto complejo.

Este artículo documenta las herramientas que adopté para resolver ese problema.

---

### El stack de la aplicación (para contexto)

No voy a repetir cada decisión del stack — para eso está el artículo anterior. Pero [tucastigo.com](https://tucastigo.com) es considerablemente más complejo que [saludpass.com](https://saludpass.com):

- **Backend:** Python 3.13 / Litestar 2.x (ASGI async), SQLAlchemy 2.0, asyncpg, Valkey (Redis fork)
- **Frontend:** React 19, TypeScript 6.0 strict, Vite 8, Tailwind + DaisyUI, Motion (animaciones spring)
- **Chat en tiempo real:** WebSocket con protocolo JSON tipado, presencia en Valkey SET, persistencia en Valkey Streams.
- **Contratos API:** `msgspec.Struct` → OpenAPI 3.1 → `openapi-fetch` + Zod. El backend es la fuente de verdad: un cambio en un Struct se propaga automáticamente a los tipos typescript, de tal manera que el front siempre consumira la estructura correcta del backend.
- **Pagos:** NOWPayments (crypto), Solana SDK (payouts batch), idempotencia con cache 24h
- **Moderación:** detección de contacto (WhatsApp/Telegram), OpenAI Vision para contenido explícito, sistema de strikes
- **Procesamiento:** Pillow + OpenCV (blur facial), FFmpeg (transcoding), tesseract.js + human.js (biometría client-side)
- **TDD:** `pytest-asyncio` con savepoints. `pytest-xdist` para ejecuciones en paralelo, +1500 tests en 90s~ (unit + integration + e2e + meta).
- **Infraestructura:** Docker Compose (7 servicios), Nginx + CrowdSec (WAF), Let's Encrypt, GitHub Actions CI/CD
- **Observabilidad:** Sentry (errores + performance + session replay), Grafana (monitoreo de logs de produccion)

Todo esto en un mes, trabajando a medio tiempo. No porque la IA sea mágica — sino porque se usa un sistema para dirigirla.

---

### El problema real: el contexto es finito

Los modelos de lenguaje tienen una ventana de contexto. Claude soporta 1M de tokens. Suena mucho hasta que consideras que un solo archivo de 500 líneas consume ~2,000 tokens, y un proyecto como [tucastigo.com](https://tucastigo.com) tiene cientos de ellos.

El agente de IA no puede "recordar" todo tu proyecto. Cada vez que le pides algo, está operando con una vista parcial. Y cuando esa vista se degrada, empiezan los problemas:

- Olvida convenciones que le dijiste hace 20 mensajes
- Crea un segundo archivo de migración cuando solo debe haber uno
- Usa `docker compose` directo cuando la regla es usar `./scripts/run.sh`
- ...

La solución no es un modelo más grande. Es infraestructura alrededor del modelo.

---

### Get Shit Done (GSD): un framework para no perder el hilo

GSD es un sistema de planificación y ejecución que vive dentro del editor (Claude Code). No es un plugin cosmético — es un framework completo con fases, planes, verificación y estado persistente.

#### Cómo funciona

El proyecto se divide en milestones → fases → planes → tareas. Cada nivel tiene documentación estructurada:

```
.planning/
├── PROJECT.md          ← Visión, valor central, constraints
├── ROADMAP.md          ← 4 fases con dependencias y criterios de éxito
├── REQUIREMENTS.md     ← 27 requerimientos mapeados a fases
├── STATE.md            ← Posición actual, métricas, punto de reanudación
└── phases/
    ├── 01-backend-contract-tests/
    │   ├── 01-CONTEXT.md       ← Decisiones tomadas
    │   ├── 01-01-PLAN.md       ← Plan ejecutable con criterios
    │   └── 01-01-SUMMARY.md    ← Qué se hizo, cuánto tardó, desvíos
    └── 02-websocket-behavior/
        └── ...
```

#### Por qué importa

Cuando el agente empieza una tarea, no opera a ciegas. Lee `PROJECT.md` para entender las restricciones. Lee el `CONTEXT.md` de la fase para saber qué decisiones ya se tomaron. Lee el `STATE.md` para saber exactamente dónde se quedó la última sesión.

Sin GSD, cada nueva sesión empieza desde cero. El agente tiene que redescubrir el proyecto, y tú tienes que repetir las mismas instrucciones.

Con GSD, el agente retoma donde se quedó. Sabe que está en la fase 2, plan 2, que las fases anteriores ya extrajeron la lógica a servicios, y que los tests de regresión ya existen.

#### Subagentes especializados

GSD no usa un solo agente. Despacha subagentes especializados según la tarea:

- `gsd-phase-researcher`: investiga cómo implementar una fase antes de planificar
- `gsd-executor`: ejecuta planes con commits atómicos y manejo de desviaciones, habitualmente en paralelo.
- `gsd-verifier`: valida que la fase cumplió su objetivo (goal-backward analysis)
- ...y varios más (planner, codebase-mapper, debugger, integration-checker)

Cada subagente recibe solo el contexto que necesita. El researcher no necesita ver el código — necesita ver la documentación. El executor no necesita investigar — necesita el plan y los archivos a modificar. Separar responsabilidades reduce el consumo de contexto.

#### Monitoreo de contexto en tiempo real

GSD incluye un monitor de contexto que inyecta advertencias cuando el contexto disponible cae:

- `< 35%` restante: advertencia — considera cerrar la sesión
- `< 25%` restante: crítico — guarda estado y cierra

Esto previene el escenario más costoso: que el agente degenere silenciosamente porque ya no "recuerda" las reglas del proyecto.

#### Workflow y notificaciones

He creado el skill `/n` como atajo a `/gsd:next` con la finalidad de dar seguimiento desde el telefono via `/remote-control` y estoy usando [ntfy.sh](https://ntfy.sh/) para generar notificaciones cuando GSD termina con una fase, asi evito tiempos muertos.

```json
{
  "matcher": "Agent|Task",
  "hooks": [
    {
      "type": "command",
      "command": "/home/m/.claude/hooks/ntfy-notify.sh",
      "timeout": 5
    }
  ]
}
```

```bash
$ cat hooks/ntfy-notify.sh
#!/bin/bash
# Notify via ntfy.sh when a Claude Code agent completes
# PostToolUse hook — only triggers on Agent/Task tool completion

TOPIC="canal-de-notificaciones"

# Extract summary from tool output (first 200 chars)
SUMMARY=$(echo "$CLAUDE_TOOL_OUTPUT" | head -5 | tr '\n' ' ' | cut -c1-200)

if [ -z "$SUMMARY" ]; then
  SUMMARY="Agente completado"
fi

curl -s -o /dev/null \
  -H "Priority: high" \
  -H "Title: Claude Code" \
  -d "$SUMMARY" \
  "ntfy.sh/$TOPIC" 2>/dev/null
```

#### Alternativas

GSD no es la única opción. El ecosistema de herramientas para gestión de contexto en agentes de IA está creciendo:

- **CLAUDE.md / AGENTS.md:** el enfoque nativo de Claude Code — instrucciones en la raíz del proyecto. Simple y efectivo para proyectos pequeños, pero no escala cuando tienes 27 requerimientos y 4 fases con dependencias.
- **Cursor Rules / Roo Code Memory Bank:** enfoques similares en otros editores (Cursor, Cline/Continue) para persistir contexto entre sesiones.
- **Aider Conventions, Custom GPTs, y otros** — cada editor/plataforma tiene su variante.

La diferencia clave de GSD es que no es solo contexto estático — es un flujo de ejecución con estado, fases, verificación y subagentes. No le dice al modelo "estas son las reglas" — le dice "estás en la fase 2, plan 1, tarea 3, y estos son los criterios de éxito que debes cumplir antes de avanzar".

---

### RTK (Rust Token Killer): 70% menos tokens por operación

Cada vez que el agente ejecuta un comando (`git status`, `ls`, `docker logs`), la salida completa se inyecta en el contexto. Un `git status` verboso puede consumir cientos de tokens. Un `docker logs` puede consumir miles.

RTK es un proxy CLI escrito en Rust que intercepta comandos y filtra la salida antes de que llegue al modelo:

```
Total commands:    6136
Tokens saved:     7.3M (70.1%)
Efficiency:       █████████████████░░░░░░░ 70.1%
```

7.3 millones de tokens ahorrados en un mes. Eso es contexto que el modelo puede usar para razonar en vez de procesar output irrelevante.

#### Cómo se integra

RTK no requiere cambiar ningún comando. Un hook de Claude Code reescribe automáticamente cada invocación:

```
git status  →  rtk git status    (transparente, 0 overhead)
ls -la      →  rtk ls -la        (filtra, comprime)
docker logs →  rtk docker logs   (trunca, resume)
```

Los ahorros más significativos: el test runner (vitest) ahorra 99.7% porque RTK filtra todo excepto el resumen de resultados. El agente no necesita ver 500 líneas de output de tests — necesita saber si pasaron o fallaron.

#### rtk discover

RTK también analiza el historial de Claude Code para detectar oportunidades perdidas — comandos que se ejecutaron sin proxy y consumieron tokens innecesariamente.

---

### Reglas de agente: 33 errores que ya no se repiten

El directorio `.agents/rules/` contiene 31 reglas que el agente debe leer antes de tocar código. Esto no es documentación — es un firewall cognitivo.

Cada regla existe porque el agente cometió ese error al menos una vez:

1. Implementar sin escribir tests primero (TDD es obligatorio)
2. Crear un segundo archivo de migración (solo uno hasta producción)
3. Usar `docker compose` directo (siempre `./scripts/run.sh dev`)
4. ...y 29 más

Sin estas reglas, cada nueva sesión puede reintroducir bugs que ya se corrigieron. Con ellas, el agente llega con el conocimiento acumulado de todas las sesiones anteriores, consultando el checklist que mapea cada tipo de cambio a las reglas relevantes.

---

### MCP: el modelo que usa herramientas externas

MCP (Model Context Protocol) permite que el agente de IA se conecte a servicios externos como si fueran extensiones nativas.

#### Playwright MCP — testing visual automatizado

El agente puede abrir un navegador real, abrir la aplicación, y verificar visualmente que los cambios funcionan. Esto es crítico para una app con animaciones spring, gestos swipe, y modales de pago con temas dinámicos.

Un overlay se inyecta durante las pruebas para prevenir que el usuario interactúe accidentalmente con el navegador mientras el agente lo controla vía CDP (Chrome DevTools Protocol).

#### Sentry MCP — debugging y performance con datos reales

El agente puede consultar Sentry directamente — buscar errores, analizar trazas de performance, pedir análisis de causa raíz con Seer (la IA de Sentry), y correlacionar problemas con deploys específicos. En vez de copiar-pegar stacktraces al chat, el agente consulta Sentry como lo haría un desarrollador.

Pero donde Sentry brilló en [tucastigo.com](https://tucastigo.com) fue en optimización de performance. En una sesión de optimización, el agente leyó las transacciones más lentas desde Sentry, identificó que `get_profiles` tardaba 804ms por un problema de N+1 queries, y lo bajó a 38ms (21x más rápido). Otros endpoints como `auth/me` y `unread_counts` pasaron de 216ms y 51ms a <10ms con cache hits, desapareciendo del top 10 de transacciones lentas de Sentry por completo.

El ciclo es: Sentry identifica el problema con datos reales → el agente lee esos datos vía MCP → implementa el fix → Sentry confirma la mejora.

#### Grafana MCP — debugging con logs de produccion

Una copia de las bitacoras se centraliza en [grafana.com](https://grafana.com) y la conexion via MCP permite a Claude buscar y analizar logs. He creado un skill `/tucastigo-produccion-ayer` que se ejecuta todos los dias por la manana y que me genera un reporte con la lista de errores, trafico sospechoso, etc, excelente para iniciar el dia con una lista de actividades.

#### Context7 MCP — documentación actualizada

Cuando el agente necesita consultar la API de Litestar, React 19, o cualquier librería, Context7 le entrega documentación actualizada y ejemplos de código. Esto evita que el modelo use conocimiento desactualizado de su entrenamiento.

#### Documentación local de referencia — cuando Context7 no alcanza

Context7 resuelve el caso general, pero tiene límites. Para frameworks muy nuevos o con APIs que cambian entre minor versions, la documentación indexada puede estar desactualizada o incompleta. Litestar 2.x es un caso perfecto: es un framework ASGI relativamente joven, con breaking changes frecuentes entre versiones, y los modelos de IA fueron entrenados con datos que incluyen versiones anteriores con APIs diferentes.

La solución fue crear un directorio `docs/superpowers/references/litestar/` con documentación curada localmente — extraída directamente del código fuente y la documentación oficial de la versión exacta que usa el proyecto. El agente consulta esta referencia local antes de recurrir a Context7 o a su conocimiento de entrenamiento.

Esto resuelve tres problemas simultáneamente:

1. **Corte de entrenamiento:** los modelos se entrenan con datos de hace meses. Si Litestar cambió una API entre la versión del entrenamiento y la versión en tu `requirements.txt`, el modelo generará código que compila pero no funciona — el tipo de bug más difícil de diagnosticar.
2. **Fragmentación de Context7:** Context7 indexa documentación de muchas versiones. Puede devolver un ejemplo de Litestar 1.x cuando tu proyecto usa 2.x, y el agente no tiene forma de saber que es la versión equivocada.
3. **Pitfalls específicos del proyecto:** la documentación local incluye no solo la API, sino los gotchas que descubrimos durante el desarrollo — por ejemplo, que `expire_on_commit=False` es necesario en sesiones async, o que ChannelsPlugin requiere un patrón específico de suscripción que la documentación oficial no enfatiza.

La regla en el proyecto es clara: primero docs locales, luego Context7, nunca confiar solo en el entrenamiento del modelo.

---

### Superpowers: disciplina que el modelo no tiene por defecto

Los modelos de IA tienden a "ir al grano" — ven un bug y lo arreglan. Eso suena productivo hasta que introduces una regresión porque no escribiste tests primero, o cuando la correcion no aborda la causa raíz, sino solo arregla un caso particular.

Superpowers es una colección de skills (flujos de trabajo) que imponen disciplina:

- **TDD obligatorio:** el agente NO puede escribir código de implementación antes de tener tests fallando
- **Debugging sistemático:** método científico — hipótesis, experimento, verificación. No "cambiar cosas hasta que funcione"
- **Brainstorming antes de implementar:** para features nuevos, primero se explora el espacio de diseño
- **Verificación antes de declarar victoria:** el agente debe ejecutar tests y confirmar output antes de decir "listo"
- **Code review estructurado:** validación contra el plan original y estándares del proyecto

Cada skill es rígida por diseño. No le das al agente la opción de "saltarse el paso de tests porque parece simple". La disciplina impuesta externamente compensa la tendencia del modelo a tomar atajos.

#### Cómo se mezcla Superpowers con GSD

GSD y Superpowers son sistemas independientes que se complementan. GSD gestiona el qué (fases, planes, estado del proyecto) y Superpowers aporta skills de disciplina (TDD, debugging sistemático, brainstorming).

No se interceptan automáticamente. GSD puede marcar tareas con `tdd="true"` en sus planes, y el executor sigue el ciclo red-green-refactor. Superpowers provee skills que el agente invoca explícitamente cuando aplican — brainstorming antes de un feature nuevo, debugging sistemático cuando algo falla, verificación antes de declarar victoria.

En la práctica se refuerzan mutuamente: GSD estructura el trabajo en fases con criterios de éxito medibles, y Superpowers asegura que dentro de cada tarea la ejecución siga prácticas rigurosas. Las instrucciones del proyecto en `CLAUDE.md` tienen prioridad sobre ambos — si el proyecto dice "TDD obligatorio", eso aplica independientemente de que GSD o Superpowers lo impongan.

---

### El entorno de trabajo: Claude Max + VSCode + remote-control

Todo esto corre sobre Claude Max ($200/mes) — el plan que da acceso ilimitado a Opus 4.6, el modelo más capaz de Anthropic. Con un mes de uso intensivo, el consumo de la sesión de 5 horas ronda el 28% y el semanal apenas el 9%. El costo es fijo y predecible, a diferencia del modelo por API donde cada token cuenta.

GSD está configurado en modo calidad máxima: todo excepto la verificación final se ejecuta con Opus 4.6. Los subagentes de research, planning y ejecución usan el modelo completo. Solo el verifier usa un modelo más liviano porque su trabajo es mecánico — correr tests y comparar resultados.

#### La integración con VSCode

Claude Code se integra nativamente con VSCode, lo prefiero asi para abrir archivos bajo demanda, compartir screenshots de errores, etc, eso no se puede hacer en modo cli.

#### /remote-control: dirigir desde el teléfono

`/remote-control` es una feature de Claude Code que permite continuar una sesión local desde cualquier dispositivo — incluido el teléfono. Tu máquina sigue ejecutando todo localmente (filesystem, Docker, MCP servers), pero puedes enviar mensajes y ver respuestas desde el navegador o la app móvil de Claude, escaneando un QR code.

Esto encaja perfectamente con GSD porque la naturaleza del framework son sesiones más lentas pero más robustas — fases con criterios de éxito, planes con verificación, commits atómicos. No necesitas estar frente al teclado para supervisar eso. Desde el teléfono puedes aprobar un plan, redirigir una decisión, o validar que el agente completó una fase correctamente. Con `/n` mencionado mas arriba, la interaccion es minima: revisar/desbloquear.

Claude corriendo solo es rápido pero ocasionalmente diverge. Claude dirigido desde el teléfono vía `/remote-control` + GSD es más lento, pero el resultado es consistentemente mejor — porque cada decisión importante pasa por el humano que sabe por qué el proyecto está estructurado así.

---

### El meta-stack completo

Resumiendo: para hacer productiva a la IA en un proyecto real, necesité construir/adoptar un stack encima del stack:

| Capa | Herramienta | Propósito |
| :--- | :--- | :--- |
| Planificación | GSD | Fases, planes, estado persistente |
| Contexto | RTK | 70% menos tokens en CLI output |
| Reglas | `.agents/rules/` | Firewall cognitivo de 31 reglas |
| Herramientas | MCP (Playwright, Sentry, Grafana, Context7) | Testing visual, debugging, logging, docs |
| Disciplina | Superpowers | TDD, debugging sistemático, code review |
| Ejecución | Claude Max + VSCode + remote-control | Modelo capaz + IDE + dirección remota |
| Referencia | `docs/superpowers/references/` | Documentación local versionada |

Cada fila de esta tabla es conocimiento que no viene con la IA. Viene de saber programar, de haber sufrido bugs en producción, de entender que un test suite es un contrato, no un trámite.

---

### La vigilancia continua: el ecosistema esta evolucionando

Tener todo este meta-stack configurado no es un pase libre para desentenderse. La realidad es que la inteligencia artificial sigue siendo una tecnología inmadura, volátil y propensa a errores (alucinaciones, regresiones lógicas, o simplemente mala comprensión del contexto). Por más rienda que le pongas con herramientas como GSD o RTK, si le quitas el ojo de encima, el agente eventualmente se va a estrellar. El rol del ingeniero no desaparece, muta hacia el de un auditor constante.

A esto hay que sumarle la velocidad absurda a la que evoluciona el ecosistema. Construir herramientas para dirigir a la IA hoy, es firmar un contrato de mantenimiento con tu propia infraestructura. Lo que hace apenas un año requería que armaras frameworks complejos, hoy ya viene empaquetado por defecto en la terminal con herramientas como Claude Code o integraciones nativas de los editores.

La "ingeniería de dirigir a la IA" no se trata de aferrarse a las herramientas que construiste, sino de tener la madurez para desecharlas cuando el modelo base evolucione y absorba esa necesidad de forma nativa. Mientras ese día llega para cada problema, construimos los puentes manuales necesarios para no caer al vacío, pero siempre con el radar encendido y la disposición de borrar código cuando la IA por fin aprenda a caminar sola en esa área específica.

---

### La brecha se agranda, no se achica

Mi artículo anterior concluía que la IA amplifica a quienes ya tienen experiencia. Este artículo lo refuerza con una dimensión adicional: no solo necesitas experiencia en programación — necesitas experiencia dirigiendo IA.

Nada de esto es obvio. La IA no está eliminando la necesidad de ingenieros. Está creando una nueva categoría de ingeniería: la ingeniería de dirigir a la IA. Y esa categoría requiere toda la experiencia de la ingeniería tradicional, más una capa adicional de meta-conocimiento que solo se adquiere construyendo sistemas reales.

Nunca ha sido un mejor momento para aprender a programar. Pero ahora también necesitas aprender a programar al programador.

### Referencias

- Spolsky, J. (2002). *The Law of Leaky Abstractions*. Joel on Software.
- Feldman, S., et al. (2023). *The Impact of AI Code Generation on Software Maintainability*: la facilidad de generar código aumenta el volumen sin aumentar la cohesión.
- Fowler, M. (2023). *Accidental Complexity in the Age of AI Codegen*.

Radar encendido &#128225;
