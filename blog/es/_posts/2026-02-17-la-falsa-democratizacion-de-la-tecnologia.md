---
layout: post
title: "la falsa democratizacion de la tecnologia"
image: /assets/img/falsa-democratizacion.png
tags: [ai, docker, python]
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Llevo una semana trabajando a medio tiempo en una aplicacion web ([saludpass.com](https://saludpass.com)) que anteriormente me hubiera llevado meses poner en linea, considerando que aunque es basica mezcla decisiones, tecnologia, arquitectura que necesitan tiempo y experiencia para adquirir, por ejemplo:

**[![la herramienta (IA) + conocimiento y guía esencial vs la multitud con acceso limitado](/assets/img/falsa-democratizacion.png)](/assets/img/falsa-democratizacion.png)**

### Backend y lenguaje

**Python/Flask:** conozco python, necesito entender y poder modificar el código; evitar frameworks más opacos o ecosistemas que no domino.

**Blueprints:** los blueprints dividen la app en módulos por dominio o responsabilidad. Cada uno agrupa rutas, vistas y lógica relacionada; se registran en `create_app()`. Resultado, código mantenible, URLs claras, tests por módulo y separación entre rutas públicas y privadas. Sin experiencia no se piensa en "separar por responsabilidad" ni en qué prefijo conviene a cada área.

**Application Factory:** patrón de creación de la app (`create_app()`): permite múltiples instancias, testing con clientes aislados y configuración por entorno (dev/prod). Requiere saber qué es inyección de dependencias y por qué importa.

**Defense in depth:** patron de defensa en capas, por ejemplo para limitar el tamano max de archivos, rate limits, CSRF, etc, se valida en JS, proxy (nginx) y app (flask), la IA lo hace trivial, pero sin la directriz podria preferir el caso directo/simple.

**Gunicorn:** servidor WSGI en producción. Flask en dev es single-thread; en prod hace falta un servidor que maneje concurrencia y graceful shutdown. Quien no programa no suele distinguir "servidor de desarrollo" de "servidor de producción", ademas no es el unico, existen otras opciones como Cherry, uWSGI, etc.

### Base de datos y persistencia

**PostgreSQL:** base de datos relacional: historial médico, usuarios, tokens de compartición, vistas, archivos. Decisión frente a SQLite (no adecuada para multi-contenedor y concurrencia) o NoSQL (el modelo de datos es relacional).

**Flask-Migrate (Alembic):** migraciones versionadas del esquema. Sin esto, cada cambio de tablas sería manual o destructivo. Saber cuándo hacer "una migración inicial única" vs. migraciones incrementales (según política del proyecto) y definir `upgrade()` y `downgrade()` es una decisión de experiencia.

**SQLAlchemy / Flask-SQLAlchemy:** ORM: modelos en Python, relaciones, índices. Quien no programa no elige entre ORM vs. SQL raw, ni diseña índices para tablas.

### Caché y sesiones

**Redis:** caché en memoria para vistas frecuentes, se calcula una vez y se sirve desde Redis con TTL; reduce carga en PostgreSQL y latencia. Invalidación al revocar tokens o al guardar historial. Sin experiencia no se plantea "cachear por token" ni cuándo invalidar.

### Frontend

**HTMX:** interactividad sin un SPA completo: peticiones parciales, swap de DOM, indicadores de carga. Decisión explícita: no React/Vue para mantener el stack simple y el HTML renderizado en servidor; quien no programa no compara "SPA vs. server-rendered + HTMX". `data-ajax` / `data-confirm`: patrón propio en `base_app`: formularios que no recargan la página, eliminación de filas, toasts, confirmaciones. Requiere convenciones en backend (respuesta JSON con `Accept: application/json`) y atributos `data-*` en el HTML.

**Bulma (Soft-UI):** CSS framework para layout y componentes; paleta y tipografía (Inter) coherentes. Implica elegir un sistema de diseño y ceñirse a él (variables CSS, branding Salud/Pass).

### Autenticación e integraciones externas

**Google OAuth (Authlib + Flask-Login):** login con Google; refresh token para no pedir permiso a cada rato. Scopes: `openid`, `email`, `profile`.

**Google Drive API:** carpeta por usuario para archivos pesados (ecos, PDFs); la data vital vive en PostgreSQL y se cachea en Redis; Drive solo para archivos. Decisión de arquitectura: qué vive en DB y qué en Drive.

**GeoLite2 (MaxMind):** geoubicación de las vistas del enlace compartido (país/ciudad) para "Quién ha visto". Descarga del `.mmdb` en build y en scheduler mensual; librería `geoip2`.

### Infraestructura y despliegue

**Docker / Docker Compose:** todo el stack corre en contenedores: misma imagen en dev (build) y prod (image desde registry). No instalar Python/Postgres/Redis en el host; entornos reproducibles. Decisión "Docker-first" del proyecto. Con opcion para migrar a Kubernetes si el proyecto escala.

**Redes en Compose (front / backend / internal):** solo Nginx expone 80/443; app, DB y Redis en red interna. Dozzle (un sistema para ver logs) en red aparte, sin URL pública (solo túnel SSH). Quien no programa no segmenta redes ni entiende por qué la app no debe estar en la misma red que el público.

**Nginx:** reverse proxy, compresión Gzip. La app no habla directamente con internet. Certbot (Let's Encrypt): HTTPS automático (webroot, renovación en cron/scheduler). Implica saber staging vs. producción y deploy-hook para recargar Nginx.

**CrowdSec:** detección de abusos (bots, fuerza bruta) desde logs de Nginx. Para resistir ataques iniciales.

**GitHub Actions:** CI: build de la imagen Docker, push a GHCR. Sin experiencia no diseñas el flujo "push → build → push image → instalar en servidor" de manera automatica.

**Scripts (`run.sh`, `entrypoint.sh`):** wrappers internos para hacer mas facil la prueba / correccion / loop de programacion, queries de bd/cache, ejecucion de demos con urls publicas temporales. `run.sh` unifica dev/prod (compose files, migraciones, tests, reset_db, tunnel). Decisiones operativas que evitan pasos manuales y errores.

### Tareas programadas (schedulers)

**scheduler-purge:** contenedor que en bucle ejecuta `purge_expired_tokens.py` (ej. cada 24h): borra tokens expirados en PostgreSQL e invalida claves en Redis. No usar cron en el host; todo en Compose.

**scheduler-geolite2:** actualización mensual de la base GeoLite2-City en volumen compartido.

**scheduler-backup:** backup periódico de la base de datos (script `backup_db.py`) y respaldo en S3.

**certbot:** certificados automatizados via Let's Encrypt (SSL).

### Testing y calidad

**Pytest:** tests requeridos para cada ruta; no avanzar si los tests no están en verde. Quien no programa no escribe tests ni entiende por qué es importante ahora mas que nunca defender la funcionalidad adquirida.

**Tests dentro del contenedor:** mismo entorno que producción (Python, DB, Redis); no depender de un Python local, como venv.

### Supervision

Durante la implementacion la IA puede obviar/olvidar reglas, crear migraciones inecesarias, no propagar una nueva decision de arquitectura en todo el proyecto, olvidar crear pruebas en ciertas areas, etc, ademas si se desean optimizar los tokens de los modelos de IA querras usar ciertos modelos explicitamente, cambiar de contexto bajo demanda, separar los agentes por especialidad, etc.

---

### En resumen

Todas estas elecciones (lenguaje, framework, base de datos, caché, frontend, contenedores, redes, CI/CD, tests, schedulers, seguridad) son decisiones de arquitectura y operación. La IA puede ayudar a escribir código o a sugerir comandos, pero elegir qué tecnologías usar, por qué y cómo encajarlas requiere experiencia en programación y en sistemas. Quien no programa no puede evaluar Flask vs. Django, Redis vs. Memcached, cuándo cachear y cuándo invalidar, ni cómo desplegar de forma segura y reproducible. Eso es lo que amplía la brecha: no solo escribir líneas, sino tomar las decisiones que definen el proyecto.

La IA permite a los que tienen el background incrementar su productividad, probar nuevas ideas que antes hubiera descartado por falta de tiempo, hace la brecha digital aun mas grande, y permite crear competencia a enterprises lentos. En resumen, en el futuro proximo tendremos aun mayor necesidad de profesionales capaces, nunca ha sido un mejor momento para aprender a programar.

### Relacionados / referencias

- Spolsky, J. (2002). *The Law of Leaky Abstractions*: define que todas las abstracciones no triviales, en algún momento, fallan ("gotean"), y si el ingeniero no conoce lo que hay debajo, no podrá arreglarlo.
- Perry, N., et al. (2022). *Do Users Write More Insecure Code with AI Assistants?*: este estudio de Stanford demostró que los programadores que usan asistentes de IA tienden a escribir código menos seguro y, lo que es peor, confían más en que su código es seguro en comparación con los que no usan IA.
- Feldman, S., et al. (2023). *The Impact of AI Code Generation on Software Maintainability*: analiza cómo la facilidad de generar código aumenta el volumen de la base de código sin aumentar la cohesión, lo que incrementa la carga cognitiva a largo plazo.

Construyamos con fundamento &#128295;
