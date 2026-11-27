// Textos de la app en español, inglés y japonés.
// Idioma: ?lang=es|en|ja en la URL, o el último elegido, o el del navegador.
(() => {
  "use strict";

  const TEXTOS = {
    es: {
      titulo: "Gato Encerrado", sep: " ",
      lema: "¡Lanza el dado, agudiza la vista y sé el más rápido en atrapar al gato!",
      tuNombre: "Tu nombre", nombreDef: "Tú",
      rivales: "Rivales (gatos virtuales)",
      riv1: "1 rival (2 jugadores)", riv2: "2 rivales (3 jugadores)", riv3: "3 rivales (4 jugadores)", riv4: "4 rivales (5 jugadores)",
      dificultad: "Dificultad",
      facil: "Gatito (fácil)", normal: "Gato callejero (normal)", dificil: "Tigre (difícil)",
      girosOpc: "Giros: quien encierra un gato puede cambiarlo de lugar (opcional)",
      jugar: "¡A jugar!", comoSeJuega: "Cómo se juega",
      creditos: "Diseño: Danny Blue Jet · Ilustración: Buho Pintura · La Vaca del Tablero<br>2 a 5 jugadores · 8+ · 15 min",
      salir: "Salir", lanzar: "Lanzar dado", seguir: "Seguir sin cambiar",
      msgInicio0: "Lanza el dado para empezar.",
      msgInicio: "Lanza el dado para empezar. Busca la carta con tantos gatos como marque el dado.",
      rodando: "Rodando…",
      salioEncerrado: "¡Salió {n}! Ese gato ya está encerrado… ¿recuerdas en qué canil está?",
      salio: (v) => `¡Salió ${v.n}! ¡Atrapa la carta con ${v.n} gato${v.n > 1 ? "s" : ""}!`,
      nadie: "Nadie encontró al gato de {n}. ¡Lanza de nuevo!",
      cambiaste: "Cambiaste el canil de lugar. ¡Que no se te olvide!",
      botRecordo: "{nombre} recordó dónde estaba al gato de {n}.",
      botEncerro: "{nombre} encerró al gato de {n}.",
      tuRecordaste: "¡Tú lo recordaste! +1 punto.",
      tuEncerraste: "¡Tú lo encerraste! +1 punto.",
      otraVez: "Lanza el dado otra vez.",
      botError: "{nombre} se equivocó de gato y queda fuera de esta ronda.",
      tuError: "¡Ese no era! Quedas fuera de esta ronda.",
      todosError: "Todos se equivocaron. ¡Lanza de nuevo!",
      tocaOtra: "Toca otra carta para cambiarlas de lugar, o sigue sin cambiar.",
      vaACambiar: "¡Atención, va a cambiar el canil de lugar!",
      movio: "{nombre} movió el canil. ¿Viste a dónde?",
      noMovio: "No movió ninguna carta.",
      seguimos: "Seguimos.", lanzaDado: "Lanza el dado.",
      botLlego: "{nombre} llegó a {meta} puntos.", tuLlegaste: "¡Llegaste a {meta} puntos!",
      finBotTitulo: "¡Ganó {nombre}!", finTuTitulo: "¡Ganaste!",
      finBotTexto: "Llegó primero a {meta} puntos. ¿Revancha?",
      finTuTexto: "Llegaste primero a {meta} puntos. ¡Reflejos felinos!",
      cartaAria: "Carta de gato",
      nota: "Versión de prueba: las reglas pueden cambiar.",
      entendido: "¡Entendido!", revancha: "Revancha", menu: "Menú",
      bots: ["Michi Wasabi", "Nigiri", "Don Maki", "Tempura"],
      reglas: `
      <li><b>Preparación:</b> las 6 cartas de gato se ponen boca arriba. Cada carta tiene una cantidad distinta de gatos-sushi: de <b>1 a 6</b>.</li>
      <li><b>Lanza el dado.</b> Todos buscan a la vez la carta que tenga <b>tantos gatos como marca el dado</b>.</li>
      <li>El primero en tocarla <b>encierra al gato</b>: gana 1 punto y la carta se da vuelta y muestra el canil.</li>
      <li><b>Giros (opcional):</b> quien encerró al gato puede cambiar esa carta de lugar con otra. ¡Mira bien a dónde va!</li>
      <li>Si sale un número cuyo gato ya está encerrado, hay que <b>recordar</b> en qué canil está. Si aciertas, sumas el punto.</li>
      <li>¿Tocaste la carta equivocada? No pierdes puntos, pero quedas fuera de esa ronda.</li>
      <li>Cada jugador avanza su cubo en la pista de puntos.</li>
      <li>Gana quien llega primero a <b>10 puntos</b>.</li>`,
    },

    en: {
      titulo: "Sushi Neko (Gato Encerrado)", sep: " ",
      lema: "Roll the die, sharpen your eyes and be the fastest to catch the cat!",
      tuNombre: "Your name", nombreDef: "You",
      rivales: "Opponents (virtual cats)",
      riv1: "1 opponent (2 players)", riv2: "2 opponents (3 players)", riv3: "3 opponents (4 players)", riv4: "4 opponents (5 players)",
      dificultad: "Difficulty",
      facil: "Kitten (easy)", normal: "Alley cat (normal)", dificil: "Tiger (hard)",
      girosOpc: "Swaps: whoever catches a cat may move that card to another spot (optional)",
      jugar: "Let's play!", comoSeJuega: "How to play",
      creditos: "Design: Danny Blue Jet · Illustration: Buho Pintura · La Vaca del Tablero<br>2–5 players · ages 8+ · 15 min",
      salir: "Exit", lanzar: "Roll the die", seguir: "Keep going, no swap",
      msgInicio0: "Roll the die to start.",
      msgInicio: "Roll the die to start. Find the card with as many cats as the die shows.",
      rodando: "Rolling…",
      salioEncerrado: "It's a {n}! That cat is already locked up… do you remember which kennel?",
      salio: (v) => `It's a ${v.n}! Catch the card with ${v.n} cat${v.n > 1 ? "s" : ""}!`,
      nadie: "Nobody found the {n}-cat card. Roll again!",
      cambiaste: "You moved the kennel. Don't forget where it went!",
      botRecordo: "{nombre} remembered where the {n}-cat card was.",
      botEncerro: "{nombre} caught the {n}-cat card.",
      tuRecordaste: "You remembered it! +1 point.",
      tuEncerraste: "You caught it! +1 point.",
      otraVez: "Roll the die again.",
      botError: "{nombre} grabbed the wrong cat and is out this round.",
      tuError: "Wrong cat! You're out this round.",
      todosError: "Everyone missed. Roll again!",
      tocaOtra: "Tap another card to swap them, or keep going without swapping.",
      vaACambiar: "Watch out, they're moving the kennel!",
      movio: "{nombre} moved the kennel. Did you see where?",
      noMovio: "No cards were moved.",
      seguimos: "Moving on.", lanzaDado: "Roll the die.",
      botLlego: "{nombre} reached {meta} points.", tuLlegaste: "You reached {meta} points!",
      finBotTitulo: "{nombre} wins!", finTuTitulo: "You win!",
      finBotTexto: "First to {meta} points. Rematch?",
      finTuTexto: "First to {meta} points. Feline reflexes!",
      cartaAria: "Cat card",
      nota: "Test version: rules may change.",
      entendido: "Got it!", revancha: "Rematch", menu: "Menu",
      bots: ["Michi Wasabi", "Nigiri", "Don Maki", "Tempura"],
      reglas: `
      <li><b>Setup:</b> lay the 6 cat cards face up. Each card shows a different number of sushi cats: <b>1 to 6</b>.</li>
      <li><b>Roll the die.</b> Everyone looks at once for the card with <b>as many cats as the die shows</b>.</li>
      <li>The first to tap it <b>catches the cat</b>: 1 point, and the card flips over to its kennel side.</li>
      <li><b>Swaps (optional):</b> whoever caught the cat may swap that card with another one. Watch where it goes!</li>
      <li>If the die shows a cat that's already locked up, you have to <b>remember</b> which kennel it's in. Get it right and you score.</li>
      <li>Tapped the wrong card? You don't lose points, but you're out for that round.</li>
      <li>Each player moves their token along the score track.</li>
      <li>The first to reach <b>10 points</b> wins.</li>`,
    },

    ja: {
      titulo: "すしネコ", sep: "",
      lema: "サイコロを振って、目をこらして、だれよりも早くネコをつかまえよう！",
      tuNombre: "あなたの名前", nombreDef: "あなた",
      rivales: "対戦相手（バーチャルネコ）",
      riv1: "1人（2人プレイ）", riv2: "2人（3人プレイ）", riv3: "3人（4人プレイ）", riv4: "4人（5人プレイ）",
      dificultad: "むずかしさ",
      facil: "子ネコ（かんたん）", normal: "のらネコ（ふつう）", dificil: "トラ（むずかしい）",
      girosOpc: "入れかえ：ネコをつかまえた人は、そのカードの位置を入れかえてもいい（オプション）",
      jugar: "あそぶ！", comoSeJuega: "あそびかた",
      creditos: "ゲームデザイン：Danny Blue Jet ・ イラスト：Buho Pintura ・ La Vaca del Tablero<br>2〜5人 ・ 8歳〜 ・ 15分",
      salir: "やめる", lanzar: "サイコロを振る", seguir: "入れかえずに進む",
      msgInicio0: "サイコロを振ってスタート！",
      msgInicio: "サイコロを振ってスタート！出た目と同じ数のネコのカードをさがそう。",
      rodando: "コロコロ…",
      salioEncerrado: "{n}が出た！そのネコはもう、おりの中…どのおりか覚えてる？",
      salio: (v) => `${v.n}が出た！ネコ${v.n}匹のカードをつかまえろ！`,
      nadie: "だれも{n}匹のネコを見つけられなかった。もう一度振ろう！",
      cambiaste: "おりの位置を入れかえた。忘れないでね！",
      botRecordo: "{nombre}が{n}匹のネコの場所を覚えていた。",
      botEncerro: "{nombre}が{n}匹のネコをつかまえた。",
      tuRecordaste: "覚えてた！+1点。",
      tuEncerraste: "つかまえた！+1点。",
      otraVez: "もう一度サイコロを振ろう。",
      botError: "{nombre}はネコをまちがえて、このラウンドはお休み。",
      tuError: "ちがうネコ！このラウンドはお休み。",
      todosError: "全員まちがえた。もう一度振ろう！",
      tocaOtra: "入れかえるカードをタップするか、入れかえずに進もう。",
      vaACambiar: "注意！おりの位置が入れかわるよ！",
      movio: "{nombre}がおりを動かした。どこに行ったか見てた？",
      noMovio: "カードは動かさなかった。",
      seguimos: "続けよう。", lanzaDado: "サイコロを振ろう。",
      botLlego: "{nombre}が{meta}点に到着。", tuLlegaste: "{meta}点に到着！",
      finBotTitulo: "{nombre}の勝ち！", finTuTitulo: "あなたの勝ち！",
      finBotTexto: "いちばん先に{meta}点に到着。もう一回やる？",
      finTuTexto: "いちばん先に{meta}点に到着。ネコなみの反射神経！",
      cartaAria: "ネコカード",
      nota: "テスト版：ルールは変わることがあります。",
      entendido: "わかった！", revancha: "もう一回", menu: "メニュー",
      bots: ["ミチ・ワサビ", "ニギリ", "ドン・マキ", "テンプラ"],
      reglas: `
      <li><b>じゅんび：</b>ネコカード6枚を表向きに並べる。カードごとにすしネコの数がちがう（<b>1〜6匹</b>）。</li>
      <li><b>サイコロを振る。</b>全員いっせいに、<b>出た目と同じ数のネコ</b>のカードをさがす。</li>
      <li>最初にタッチした人が<b>ネコをつかまえる</b>：1点。カードは裏返って、おりの面になる。</li>
      <li><b>入れかえ（オプション）：</b>つかまえた人は、そのカードを別のカードと入れかえてもいい。どこに行くか、よく見て！</li>
      <li>もうつかまっているネコの目が出たら、どのおりにいるか<b>思い出そう</b>。当たれば1点。</li>
      <li>ちがうカードにタッチしたら？点は減らないけど、そのラウンドはお休み。</li>
      <li>各プレイヤーは得点トラックで自分のコマを進める。</li>
      <li>最初に<b>10点</b>に着いた人の勝ち！</li>`,
    },
  };

  const DISPONIBLES = Object.keys(TEXTOS);
  let idioma = "es";

  function detectar() {
    const url = new URLSearchParams(location.search).get("lang");
    if (url && DISPONIBLES.includes(url.toLowerCase())) return url.toLowerCase();
    try {
      const guardado = localStorage.getItem("gato-lang");
      if (DISPONIBLES.includes(guardado)) return guardado;
    } catch (e) { /* sin almacenamiento */ }
    const nav = (navigator.languages || [navigator.language || "es"]).map((l) => l.slice(0, 2).toLowerCase());
    for (const l of nav) if (DISPONIBLES.includes(l)) return l;
    return "en";
  }

  function t(clave, vars = {}) {
    const v = TEXTOS[idioma][clave] ?? TEXTOS.es[clave];
    if (typeof v === "function") return v(vars);
    if (typeof v !== "string") return v;
    return v.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
  }

  function aplicar(nuevo) {
    const anteriorDef = TEXTOS[idioma].nombreDef;
    idioma = nuevo;
    document.documentElement.lang = nuevo;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    const lista = document.getElementById("reglas-lista");
    if (lista) lista.innerHTML = t("reglas");
    const nombre = document.getElementById("nombre");
    if (nombre && (!nombre.value.trim() || Object.values(TEXTOS).some((x) => x.nombreDef === nombre.value) || nombre.value === anteriorDef))
      nombre.value = t("nombreDef");
    document.querySelectorAll(".idioma").forEach((b) => b.classList.toggle("activo", b.dataset.lang === nuevo));
    try { localStorage.setItem("gato-lang", nuevo); } catch (e) { /* sin almacenamiento */ }
    const url = new URL(location.href);
    url.searchParams.set("lang", nuevo);
    history.replaceState(null, "", url);
  }

  document.querySelectorAll(".idioma").forEach((b) => b.addEventListener("click", () => aplicar(b.dataset.lang)));

  window.I18N = { t, aplicar, idioma: () => idioma };
  aplicar(detectar());
})();
