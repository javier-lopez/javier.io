---
layout: post
title: "de nand a tetris"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Llevo mucho tiempo trabajando en el area de tecnologia (15 años al momento de escribir esto), como muchos colegas no
tuve entrenamiento formal, [The Elements of Computing Systems: Building a Modern Computer from First Principles](https://www.nand2tetris.org/book)
es una de las biblias del area para entenderla a profundidad, parte de los principios y contruye hasta programar
un juego de tetris, en el camino menciona compuertas logicas, cpu, memoria ram, sistemas operativos, compiladores, etc.

Esta entrada es una larga, son mis anotaciones personales del libro pulidas con la asistencia de la IA, que ha reanimado
mi interes por aprender mas sobre todos los temas.

### Every Boolean function, no matter how complex, can be expressed using three Boolean operators only: And, Or, and Not.

**Paper: "Introduction to a general theory of elementary propositions" Autor: Emil L. 1921**

Emil demostró matemáticamente que si tienes un conjunto de operadores capaces de generar (1)negación y (2)conjunción/disyunción
se puede generar cualquier tabla de verdad posible, y con eso resolver cualquier problema logico. Por otra parte Claude Shannon
vinculo esa matematica con la fisica, demostrando que los reles(interruptores) de esa epoca podian usarse como puertas booleanas.

**Paper: "A Symbolic Analysis of Relay and Switching Circuits" Autor: Claude Shannon Año: 1938** La [IA Claude](https://claude.com/) de Antrophic se llama asi en su honor.

- **Not**: Se utiliza para controlar la salida, 0 y 1, sin esta compuerta, el estado nunca variaria.
- **And**: Se usa en conjunto de Not para describir la logica de una regla simple
- **Or**: Se usa para concatenar las reglas generadas por las dos compuertas anteriores

| Entrada 1 | Entrada 2 | ¬Entrada 1 (NOT) | Entrada 1 ∧ Entrada 2(AND) | Entrada 1 ∨ Entrada 2 (OR) | ¬(Entrada 1∧Entrada 1) (NAND) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| V | V | F | V | V | F |
| V | F | F | F | V | V |
| F | V | V | F | V | V |
| F | F | V | F | F | V |

Que tiene que ver la operacion **NAND (AND negada)**?, en 1913, un matemático, Henry M. Sheffer en **A set of five independent postulates for Boolean algebras**
demostro que se pueden contruir todas las operaciones logicas (NOT, AND, OR, ETC) con una sola, **Universalidad Funcional**,
por cierto, NAND no es la unica operacion universal, en 1880 Charles Sanders Peirce ya habia descubierto que la operacion **NOR**
también era universal **A Boolean Algebra with One Constant**, solo que su trabajo no habia sido publicado.

Por que el libro usa las NAND en lugar de las NOR?, porque actualmente es mas facil construir compuertas NAND con transistores CMOS,
antes sin embargo hubo una epoca donde se uso la tecnologia RTL (Resistor-Transistor Logic), donde las NOR eran las que mandaban,
se ponian los transistores en paralelo, si cualquiera conducia corriente (es 1), la salida se va a tierra (0). Era una configuración
robusta y eléctricamente estable, la computadora del Apollo, que llevo el hombre a la luna uso compuertas NOR.

**[![](https://github.com/user-attachments/assets/ac647e9d-5f1f-41aa-a3e1-4c6f7657a1d7)](https://github.com/user-attachments/assets/ac647e9d-5f1f-41aa-a3e1-4c6f7657a1d7)**

Listo, feliz multipass &#128523;
