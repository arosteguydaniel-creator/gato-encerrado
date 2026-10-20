// Gato Encerrado: versión de prueba para navegador.
(() => {
  "use strict";

  // Cada carta tiene una cantidad distinta de gatos (1 a 6): es lo que se busca con el dado.
  const CARTAS = [
    { id: "a", gatos: 6 },
    { id: "b", gatos: 2 },
    { id: "c", gatos: 1 },
    { id: "d", gatos: 5 },
    { id: "e", gatos: 4 },
    { id: "f", gatos: 3 },
  ];

  // Posición (en % del ancho) de cada número sobre la pista; el índice 0 es la salida.
  const PISTA_X = [2.5, 8.0, 20.5, 28.3, 37.8, 46.3, 54, 63.4, 72.4, 80.6, 91.3];
  const META = 10;

  const COLORES = ["#e2197c", "#2f6fd6", "#f2c230", "#35b36a", "#9b5de5"];
  const NOMBRES_BOT = ["Michi Wasabi", "Nigiri", "Don Maki", "Tempura"];
  const EMOJI_BOT = ["🐈‍⬛", "🐱", "🐯", "🐈"];

  const DIFICULTAD = {
    facil:   { reaccion: [2300, 4000], extraMemoria: 1200, error: 0.12, memoria: 0.55 },
    normal:  { reaccion: [1500, 2700], extraMemoria: 900,  error: 0.07, memoria: 0.72 },
    dificil: { reaccion: [950, 1750],  extraMemoria: 600,  error: 0.04, memoria: 0.88 },
  };

  // Ranuras de la mesa (3 columnas x 2 filas), en % del tablero.
  const RANURAS = [];
  for (let fila = 0; fila < 2; fila++)
    for (let col = 0; col < 3; col++)
      RANURAS.push({ left: 2.5 + col * 32.5, top: 2.7 + fila * 48.6 });

  const $ = (s) => document.querySelector(s);
  const azar = (a, b) => a + Math.random() * (b - a);
  const elegir = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const ui = {
    inicio: $("#inicio"), juego: $("#juego"), tablero: $("#tablero"),
    dado: $("#dado"), btnDado: $("#btn-dado"), mensaje: $("#mensaje"),
    marcador: $("#marcador"), cubos: $("#cubos"),
    reglas: $("#reglas"), fin: $("#fin"),
  };
  ui.dado.innerHTML = "<span></span>".repeat(9);

  let estado = null;
  let timers = [];

  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }
  function luego(ms, fn) { const t = setTimeout(fn, ms); timers.push(t); return t; }

  // ---------- Preparación ----------

  function nuevaPartida() {
    limpiarTimers();
    const nRivales = +$("#rivales").value;
    const nombre = $("#nombre").value.trim() || "Tú";
    const jugadores = [{ nombre, bot: false, color: COLORES[0], pts: 0, fuera: false }];
    for (let i = 0; i < nRivales; i++)
      jugadores.push({ nombre: NOMBRES_BOT[i], emoji: EMOJI_BOT[i], bot: true, color: COLORES[i + 1], pts: 0, fuera: false });

    const ranuras = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    estado = {
      jugadores,
      dif: DIFICULTAD[$("#dificultad").value],
      giros: $("#giros").checked,
      cartas: CARTAS.map((c, i) => ({ ...c, ranura: ranuras[i], encerrado: false, el: null })),
      fase: "espera", // espera | rodando | ronda | cambio | fin
      objetivo: null,
      ganadorRonda: null,
    };

    construirTablero();
    construirMarcador();
    ui.dado.dataset.cara = "1";
    setBoton("Lanzar dado", true);
    decir("Lanza el dado para empezar. Busca la carta con tantos gatos como marque el dado.");
    mostrar("juego");
  }

  function construirTablero() {
    ui.tablero.innerHTML = "";
    for (const carta of estado.cartas) {
      const el = document.createElement("button");
      el.className = "carta";
      el.setAttribute("aria-label", "Carta de gato");
      el.innerHTML = `
        <div class="interior">
          <div class="cara frente"><img src="assets/gato-${carta.id}.png" alt=""></div>
          <div class="cara dorso"><img src="assets/reverso-canil.png" alt=""></div>
        </div>`;
      el.addEventListener("click", () => clicCarta(carta));
      carta.el = el;
      ui.tablero.appendChild(el);
      ubicar(carta);
    }
  }

  function ubicar(carta) {
    const r = RANURAS[carta.ranura];
    carta.el.style.left = r.left + "%";
    carta.el.style.top = r.top + "%";
    carta.el.classList.toggle("encerrado", carta.encerrado);
  }

  function construirMarcador() {
    ui.marcador.innerHTML = "";
    ui.cubos.innerHTML = "";
    estado.jugadores.forEach((j, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="cubo-ico" style="background:${j.color}"></span>
        <span>${j.bot ? j.emoji + " " : ""}${escapar(j.nombre)}</span><span class="pts">0</span>`;
      j.li = li;
      ui.marcador.appendChild(li);

      const cubo = document.createElement("div");
      cubo.className = "cubo";
      cubo.style.background = j.color;
      j.cubo = cubo;
      ui.cubos.appendChild(cubo);
    });
    actualizarMarcador();
  }

  function actualizarMarcador() {
    const porCasilla = {};
    estado.jugadores.forEach((j) => {
      j.li.querySelector(".pts").textContent = j.pts;
      j.li.classList.toggle("fuera", j.fuera);
      const n = (porCasilla[j.pts] = (porCasilla[j.pts] || 0) + 1) - 1;
      j.cubo.style.left = PISTA_X[Math.min(j.pts, META)] + "%";
      j.cubo.style.top = 38 + n * 16 + "%";
    });
  }

  // ---------- Ronda ----------

  function lanzarDado() {
    if (estado.fase === "cambio") { // "Seguir sin cambiar"
      terminarCambio();
      return;
    }
    if (estado.fase !== "espera") return;
    estado.fase = "rodando";
    estado.jugadores.forEach((j) => (j.fuera = false));
    estado.jugadores.forEach((j) => j.li.classList.remove("gano"));
    actualizarMarcador();
    setBoton("Lanzar dado", false);
    decir("Rodando…");
    ui.dado.classList.add("rodando");

    let vueltas = 0;
    const giro = setInterval(() => {
      ui.dado.dataset.cara = String(1 + Math.floor(Math.random() * 6));
      if (++vueltas > 8) {
        clearInterval(giro);
        ui.dado.classList.remove("rodando");
        const n = 1 + Math.floor(Math.random() * 6);
        ui.dado.dataset.cara = String(n);
        empezarRonda(n);
      }
    }, 80);
  }

  function empezarRonda(n) {
    estado.objetivo = n;
    estado.fase = "ronda";
    const carta = cartaConGatos(n);
    decir(carta.encerrado
      ? `¡Salió ${n}! Ese gato ya está encerrado… ¿recuerdas en qué canil está?`
      : `¡Salió ${n}! ¡Atrapa la carta con ${n} gato${n > 1 ? "s" : ""}!`);

    // Los rivales virtuales reaccionan con su propio tiempo y a veces se equivocan.
    const d = estado.dif;
    estado.jugadores.forEach((j, i) => {
      if (!j.bot) return;
      let t = azar(...d.reaccion);
      let elegida = carta;
      if (carta.encerrado) {
        t += d.extraMemoria;
        if (Math.random() > d.memoria) elegida = elegir(estado.cartas.filter((c) => c.encerrado && c !== carta)) || carta;
      } else if (Math.random() < d.error) {
        elegida = elegir(estado.cartas.filter((c) => c !== carta));
      }
      luego(t, () => tocar(i, elegida));
    });
    luego(9000, () => {
      if (estado.fase !== "ronda") return;
      revelar(carta, "acierto");
      cerrarRonda(`Nadie encontró al gato de ${n}. ¡Lanza de nuevo!`);
    });
  }

  function clicCarta(carta) {
    if (!estado) return;
    if (estado.fase === "ronda") tocar(0, carta);
    else if (estado.fase === "cambio" && estado.ganadorRonda === 0 && carta !== estado.cartaGanada) {
      intercambiar(estado.cartaGanada, carta);
      terminarCambio(`Cambiaste el canil de lugar. ¡Que no se te olvide!`);
    }
  }

  function tocar(i, carta) {
    if (estado.fase !== "ronda") return;
    const j = estado.jugadores[i];
    if (j.fuera) return;

    zarpa(carta, j);

    if (carta.gatos === estado.objetivo) {
      j.pts++;
      estado.fase = "resuelto";
      estado.ganadorRonda = i;
      estado.cartaGanada = carta;
      j.li.classList.add("gano");
      const yaEstaba = carta.encerrado;
      if (yaEstaba) revelar(carta, "acierto");
      else {
        carta.encerrado = true;
        setTimeout(() => ubicar(carta), 350);
      }
      actualizarMarcador();

      const quien = j.bot ? j.nombre : "¡Tú";
      const texto = j.bot
        ? `${j.nombre} ${yaEstaba ? "recordó dónde estaba" : "encerró"} al gato de ${estado.objetivo}.`
        : `${quien} ${yaEstaba ? "lo recordaste" : "lo encerraste"}! +1 punto.`;

      if (j.pts >= META) return finPartida(i);
      if (estado.giros) {
        limpiarTimers();
        decir(texto);
        return luego(700, () => empezarCambio(i, texto));
      }
      cerrarRonda(texto + " Lanza el dado otra vez.");
    } else {
      j.fuera = true;
      carta.el.classList.add("error");
      luego(450, () => carta.el.classList.remove("error"));
      if (carta.encerrado) revelar(carta, "error");
      actualizarMarcador();
      decir(j.bot
        ? `${j.nombre} se equivocó de gato y queda fuera de esta ronda.`
        : `¡Ese no era! Quedas fuera de esta ronda.`);
      if (estado.jugadores.every((x) => x.fuera)) {
        revelar(cartaConGatos(estado.objetivo), "acierto");
        cerrarRonda("Todos se equivocaron. ¡Lanza de nuevo!");
      }
    }
  }

  function cerrarRonda(texto) {
    limpiarTimers();
    estado.fase = "espera";
    setBoton("Lanzar dado", true);
    decir(texto);
  }

  // ---------- Giros (opcional) ----------

  function empezarCambio(i, texto) {
    limpiarTimers();
    estado.fase = "cambio";
    const j = estado.jugadores[i];
    if (!j.bot) {
      estado.cartas.forEach((c) => c.el.classList.toggle("elegible", c !== estado.cartaGanada));
      setBoton("Seguir sin cambiar", true);
      decir(texto + " Toca otra carta para cambiarlas de lugar, o sigue sin cambiar.");
      return;
    }
    setBoton("Lanzar dado", false);
    if (Math.random() < 0.75) {
      decir(texto + " ¡Atención, va a cambiar el canil de lugar!");
      luego(900, () => {
        intercambiar(estado.cartaGanada, elegir(estado.cartas.filter((c) => c !== estado.cartaGanada)));
        luego(700, () => terminarCambio(`${j.nombre} movió el canil. ¿Viste a dónde?`));
      });
    } else {
      terminarCambio(texto + " No movió ninguna carta.");
    }
  }

  function terminarCambio(texto) {
    estado.cartas.forEach((c) => c.el.classList.remove("elegible"));
    cerrarRonda((texto || "Seguimos.") + " Lanza el dado.");
  }

  function intercambiar(a, b) {
    [a.ranura, b.ranura] = [b.ranura, a.ranura];
    a.el.classList.add("moviendo");
    b.el.classList.add("moviendo");
    ubicar(a);
    ubicar(b);
    setTimeout(() => { a.el.classList.remove("moviendo"); b.el.classList.remove("moviendo"); }, 600);
  }

  // ---------- Efectos ----------

  function revelar(carta, clase) {
    if (!carta.encerrado) { carta.el.classList.add(clase); setTimeout(() => carta.el.classList.remove(clase), 900); return; }
    carta.el.classList.remove("encerrado");
    carta.el.classList.add(clase);
    setTimeout(() => { carta.el.classList.remove(clase); ubicar(carta); }, 1000);
  }

  function zarpa(carta, j) {
    const z = document.createElement("div");
    z.className = "zarpa";
    z.style.background = j.color;
    z.textContent = "🐾";
    carta.el.appendChild(z);
    setTimeout(() => z.remove(), 950);
  }

  function finPartida(i) {
    limpiarTimers();
    estado.fase = "fin";
    const j = estado.jugadores[i];
    decir(j.bot ? `${j.nombre} llegó a ${META} puntos.` : `¡Llegaste a ${META} puntos!`);
    $("#fin-titulo").textContent = j.bot ? `¡Ganó ${j.nombre}!` : "¡Ganaste!";
    $("#fin-texto").textContent = j.bot
      ? `Llegó primero a ${META} puntos. ¿Revancha?`
      : `Llegaste primero a ${META} puntos. ¡Reflejos felinos!`;
    setTimeout(() => ui.fin.showModal(), 900);
  }

  // ---------- Utilidades ----------

  function cartaConGatos(n) { return estado.cartas.find((c) => c.gatos === n); }
  function decir(t) { ui.mensaje.textContent = t; }
  function setBoton(texto, activo) { ui.btnDado.textContent = texto; ui.btnDado.disabled = !activo; }
  function escapar(s) { return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`); }
  function mostrar(id) {
    ui.inicio.classList.toggle("activa", id === "inicio");
    ui.juego.classList.toggle("activa", id === "juego");
    window.scrollTo(0, 0);
  }

  // ---------- Eventos ----------

  $("#btn-jugar").addEventListener("click", nuevaPartida);
  ui.btnDado.addEventListener("click", lanzarDado);
  $("#btn-reglas").addEventListener("click", () => ui.reglas.showModal());
  $("#btn-reglas-2").addEventListener("click", () => ui.reglas.showModal());
  $("#btn-cerrar-reglas").addEventListener("click", () => ui.reglas.close());
  $("#btn-salir").addEventListener("click", () => { limpiarTimers(); estado = null; mostrar("inicio"); });
  $("#btn-revancha").addEventListener("click", () => { ui.fin.close(); nuevaPartida(); });
  $("#btn-menu").addEventListener("click", () => { ui.fin.close(); estado = null; mostrar("inicio"); });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && estado && ui.juego.classList.contains("activa") && !ui.btnDado.disabled) {
      e.preventDefault();
      lanzarDado();
    }
  });
})();
