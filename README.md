# Gato Encerrado 🐱🍣

Versión web de prueba de **Gato Encerrado**, el juego de reflejos y memoria felina de **La Vaca del Tablero**.

> ¡Lanza el dado, agudiza la vista y sé el más rápido en atrapar al gato!

- 2 a 5 jugadores · 8+ · 15 minutos
- Diseño: Danny Blue Jet · Ilustración: Buho Pintura

En esta versión juegas en el navegador contra 1 a 4 gatos virtuales (rivales controlados por la computadora), con tres niveles de dificultad. Funciona en computadora y en el celular, sin instalar nada.

## Cómo jugarlo

Abre `index.html` en el navegador, o sírvelo con cualquier servidor estático:

```bash
python3 -m http.server 8000
# y entra a http://localhost:8000
```

Está pensado para publicarse con **GitHub Pages** (Settings → Pages → Deploy from branch → `main` / root).

## Reglas (provisorias)

El manual todavía no tiene los textos, así que estas reglas se infirieron de la caja y de las ilustraciones del manual. **Están pendientes de confirmación.**

**Contenido:** 6 cartas de gato, 4 cartas de puntuación (forman la pista del 1 al 10), 1 dado y 5 cubos.

**Preparación**

1. Se ponen las 6 cartas de gato boca arriba sobre la mesa. Cada carta tiene una cantidad distinta de gatos-sushi, de 1 a 6.
2. Se arma la pista de puntuación con las 4 cartas (del 1 al 10) y cada jugador pone su cubo al inicio.

**Cómo se juega**

1. Se lanza el dado.
2. Todos buscan a la vez la carta que tiene **tantos gatos como el número del dado**. El primero en tocarla **encierra al gato**.
3. Quien lo encierra gana 1 punto y la carta se da vuelta, mostrando el canil.
4. **Giros (opcional):** quien encerró al gato puede cambiar esa carta de lugar con cualquier otra.
5. Si sale un número cuyo gato ya está encerrado, hay que recordar en qué canil quedó. Quien lo encuentre suma 1 punto (la carta vuelve a quedar boca abajo).
6. Si tocas una carta equivocada no hay penalización de puntos (confirmado), pero quedas fuera de esa ronda.
7. Cada jugador avanza su cubo por la pista de puntos.
8. **Gana quien llega primero a 10 puntos.**

### Dudas abiertas para confirmar

- ¿El número del dado indica la cantidad de gatos de la carta, o hay otra correspondencia?
- Cuando las 6 cartas quedan encerradas, ¿se siguen jugando de memoria o se vuelven a dar vuelta?
- Al acertar un gato ya encerrado, ¿la carta vuelve a quedar boca arriba o sigue en el canil?
- En los giros, ¿se intercambia con otra carta, se mueve a un lugar libre o la cambia otro jugador?

## Estructura

```
index.html   pantalla de inicio, partida y diálogos
style.css    estilos
app.js       lógica del juego y de los rivales virtuales
assets/      cartas y arte recortados de los archivos originales
```
