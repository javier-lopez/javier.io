---
layout: post
title: "pensando con flechas"
image: /assets/img/pensando-con-flechas.png
tags: [ai]
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Ultimamente se ha popularizado la IA, pero tenemos idea de cómo funciona por dentro?, A menudo parece magia, pero en realidad, el motor principal de la IA es una rama de las matemáticas llamada Álgebra Lineal.

Sé que suena intimidante, pero si se piensa visualmente, es muy sencillo.

**[![pensando con flechas, algebra lineal como motor de la IA](/assets/img/pensando-con-flechas.png)](/assets/img/pensando-con-flechas.png)**

### 1. Los VECTORES: Convertir el mundo en flechas

Para que una computadora entienda el mundo real (una manzana, una canción, tu cara), tiene que convertirlo en números.

Imagina una manzana. No podemos meter la manzana en la computadora.

Pero podemos describirla con una lista de características numéricas: ¿Qué tan roja es del 1 al 10? ¿Qué tan redonda? ¿Qué tan dulce?, los chips de tarjetas graficas son excepcionalmente buenos para sumar, y multiplicar vectores (conjunto de numeros) por eso Nvidia reina en la IA, sus tarjetas son las mas rapidas haciendo operaciones aritmeticas con esos datos.

Si la manzana es `[Roja: 9, Redonda: 8, Dulce: 7, y otras 12,000 caracteristicas]`, esa lista de números se convierte en una flecha (un vector) en un espacio que apunta a esa posición exacta.

La IA no ve imágenes ni lee textos; ve un universo gigantesco lleno de millones de estos vectores flotando.

### 2. Las 3 OPERACIONES: Encontrar el orden en el caos

Una vez que la IA tiene este universo de flechas, necesita encontrar sentido en él. ¿Cómo sabe que una foto nueva de una manzana es, de hecho, una manzana?

Utiliza tres operaciones aritmeticas fundamentales una y otra vez a velocidades increíbles:

#### OPERACIÓN 1: Medir Similitud (el "producto punto")

¿Qué es? Es como usar una regla para ver qué tan cerca están dos flechas y si apuntan en la misma dirección.

Ejemplo: `manzana [2, 3, 5]`, `platano [2, 4, 3]`, `gato [8, 2, 1]`

`manzana (producto punto) platano = [a1*a2 + b1*b2 + c1*c2]` (la sumatoria de la multiplicacion de las coordenadas)

> `manzana (producto punto) platano = [2*2 + 3*4 + 5*3] = [4+12+15] = 31`
>
> `manzana (producto punto) gato = [2*8 + 3*2 + 5*1] = [16+6+5] = 27`

`31 > 27`, una manzana se parece mas a un platano que a un gato.

¿Para qué sirve? Para encontrar **patrones**. Si la flecha de una imagen nueva cae muy cerca del grupo de "flechas de manzanas" que ya conoce, la IA dirá: "¡Ajá! Esto se parece mucho a una manzana". Así es como te reconoce en una foto o te recomienda una canción similar a la que te gusta.

#### OPERACIÓN 2: Cambiar la Perspectiva (la "transformación lineal")

¿Qué es? A veces, los datos están desordenados si los miras de frente. Esta operación es como si la IA agarrara todo el espacio 3D y lo girara, lo estirara o lo inclinara para verlo desde un ángulo nuevo.

¿Para qué sirve? Para descubrir **relaciones ocultas**. Imagina un montón de puntos que parecen una nube desordenada, pero si giras tu cabeza 45 grados, de repente ves que todos forman una línea perfecta. La IA hace esos "giros" matemáticamente para entender mejor los datos.

#### OPERACIÓN 3: Simplificar Dimensiones (la "proyección")

¿Qué es? El mundo real es demasiado complejo (tiene demasiadas "dimensiones" o características). Esta operación es como tomar una escultura 3D complicada y aplastarla para ver solo su sombra en la pared (2D).

¿Para qué sirve? Para **enfocarse en lo importante**. Si quieres diferenciar un elefante de un ratón, el "peso" es una dimensión crucial, pero el "color de ojos" quizás no tanto. La IA aprende a "aplastar" los datos ignorando el ruido innecesario y quedándose solo con las dimensiones que realmente definen el objeto. Las dimensiones son la cantidad de numeros en un vector, por ejemplo: `manzana [2, 3, 5]` tiene 3 dimensiones.

---

La IA como la conocemos en ChatGPT, Gemini, etc, son entonces en su nucleo operaciones matematicas (sumas y multiplicaciones) ejecutadas en vectores (conjunto de numeros), funcionan muy diferente a nuestra inteligencia biologica, no generan conciencia, y requieren unas computadoras monstruosas para calcularlas, son IA vacias, loros probabilisticos que solo son capaces de encontrar patrones y predecir el siguiente paso en una secuencia de numeros, asi que por el momento estamos a salvo, aprendamos a usar estas calculadoras multiplicadoras.

La IA actual es la herramienta estadística más poderosa jamás creada. Es un espejo matemático de todo lo que hemos escrito, capaz de reflejarnos de formas asombrosas, y de ayudarnos a encontrar patrones infinidad de veces mas rapido y eficientemente.

Aqui dejo un curso por si desean conocer mas al respecto: [algo.monster / LLM course](https://algo.monster/courses/llm/llm_course_introduction)

*(Aclaracion: no estoy en ningun sentido asociado con algo.monster, solo que su curso me parece una buena introduccion.)*

Apuntando flechas &#127993;
