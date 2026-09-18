/* =========================================================
   ELEMENTOS
========================================================= */

const musica = document.getElementById("musica");

const progreso = document.getElementById("progreso");
const puntos = document.querySelectorAll(".punto");

const escenaInicio = document.getElementById("escenaInicio");
const escenaFlores = document.getElementById("escenaFlores");
const escenaPuente = document.getElementById("escenaPuente");
const escenaRecuerdos = document.getElementById("escenaRecuerdos");
const escenaJuego = document.getElementById("escenaJuego");
const escenaMensaje = document.getElementById("escenaMensaje");
const escenaFotoFinal = document.getElementById("escenaFotoFinal");
const escenaFinal = document.getElementById("escenaFinal");

const escenas = document.querySelectorAll(".escena");


/* INICIO */

const momentoPresentacion =
    document.getElementById("momentoPresentacion");

const momentoCaja =
    document.getElementById("momentoCaja");

const destelloPresentacion =
    document.getElementById("destelloPresentacion");

const etiquetaInicio =
    document.getElementById("etiquetaInicio");

const tituloInicio =
    document.getElementById("tituloInicio");

const descripcionInicio =
    document.getElementById("descripcionInicio");

const separadorInicio =
    document.getElementById("separadorInicio");

const btnAbrir =
    document.getElementById("btnAbrir");

const pistaInicio =
    document.getElementById("pistaInicio");

const particulasInicio =
    document.getElementById("particulasInicio");


/* CAJA */

const textoDescubrimiento =
    document.getElementById("textoDescubrimiento");

const zonaCaja =
    document.getElementById("zonaCaja");

const contenedorCorazonesCaja =
    document.getElementById("contenedorCorazonesCaja");


/* FLORES */

const fraseFlor1 =
    document.getElementById("fraseFlor1");

const fraseFlor2 =
    document.getElementById("fraseFlor2");

const fraseFlor3 =
    document.getElementById("fraseFlor3");

const separadorFlores =
    document.getElementById("separadorFlores");

const btnARecuerdos =
    document.getElementById("btnARecuerdos");


/* RECUERDOS */

const recuerdos =
    document.querySelectorAll(".recuerdo");

const ayudaPausa =
    document.getElementById("ayudaPausa");

const indicadorPausa =
    document.getElementById("indicadorPausa");


/* JUEGO */

const tableroTulipanes =
    document.getElementById("tableroTulipanes");

const mensajeJuego =
    document.getElementById("mensajeJuego");

const btnDespuesJuego =
    document.getElementById("btnDespuesJuego");


/* FOTO FINAL */

const btnAFotoFinal =
    document.getElementById("btnAFotoFinal");

const antesTerminar =
    document.getElementById("antesTerminar");

const fotoDestacada =
    document.getElementById("fotoDestacada");

const fraseFotoFinal =
    document.getElementById("fraseFotoFinal");

const btnAlFinal =
    document.getElementById("btnAlFinal");


/* FINAL */

const preguntaFinal =
    document.getElementById("preguntaFinal");

const btnSi =
    document.getElementById("btnSi");

const btnPoquito =
    document.getElementById("btnPoquito");

const respuestaFinal =
    document.getElementById("respuestaFinal");

const btnRepetir =
    document.getElementById("btnRepetir");


/* EFECTOS */

const capaEfectos =
    document.getElementById("capaEfectos");


/* =========================================================
   VARIABLES
========================================================= */

let musicaIniciada = false;

let abriendoSorpresa = false;

let recuerdoActual = 0;

let temporizadorRecuerdo = null;

let inicioTemporizadorRecuerdo = 0;

let tiempoRestanteRecuerdo = 5000;

let recuerdosPausados = false;

let fraseRecuerdoTerminada = false;

let juegoResuelto = false;

let ayudaPausaMostrada = false;

const temporizadores = [];


/* =========================================================
   UTILIDADES
========================================================= */

function esperar(ms) {

    return new Promise(resolve => {

        const id = setTimeout(() => {

            resolve();

        }, ms);

        temporizadores.push(id);

    });

}


function programar(callback, tiempo) {

    const id = setTimeout(callback, tiempo);

    temporizadores.push(id);

    return id;

}


/* =========================================================
   ESCRIBIR TEXTO
========================================================= */

async function escribirTexto(
    elemento,
    texto,
    velocidad = 42
) {

    if (!elemento) return;

    elemento.textContent = "";

    elemento.classList.add("escribiendo");

    for (
        let i = 0;
        i < texto.length;
        i++
    ) {

        elemento.textContent += texto[i];

        let pausa = velocidad;

        if (
            texto[i] === "." ||
            texto[i] === "…" ||
            texto[i] === ","
        ) {
            pausa += 100;
        }

        await esperar(pausa);

    }

    elemento.classList.remove("escribiendo");

}


/* =========================================================
   PROGRESO
========================================================= */

function actualizarProgreso(indice) {

    puntos.forEach((punto, i) => {

        punto.classList.remove(
            "activo",
            "completo"
        );

        if (i < indice) {

            punto.classList.add("completo");

        }

        if (i === indice) {

            punto.classList.add("activo");

        }

    });

}


/* =========================================================
   CAMBIAR ESCENA
========================================================= */

function mostrarEscena(escena) {

    escenas.forEach(item => {

        item.classList.remove("activa");

    });

    escena.classList.add("activa");

}


/* =========================================================
   PARTÍCULAS DEL INICIO
========================================================= */

function crearParticulasInicio() {

    if (!particulasInicio) return;

    particulasInicio.innerHTML = "";

    const cantidad =
        window.innerWidth <= 700
            ? 7
            : 10;

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const particula =
            document.createElement("span");

        const esDestello =
            Math.random() > 0.55;

        particula.className =
            "particula-inicio";

        if (esDestello) {

            particula.classList.add("destello");

            particula.textContent = "✦";

            particula.style.setProperty(
                "--tamano",
                `${8 + Math.random() * 8}px`
            );

        }

        /*
           Evitamos el centro para no competir
           visualmente con el texto.
        */

        let x;

        if (Math.random() > 0.5) {

            x =
                5 +
                Math.random() * 24;

        } else {

            x =
                71 +
                Math.random() * 24;

        }

        const y =
            15 +
            Math.random() * 70;

        particula.style.left =
            `${x}%`;

        particula.style.top =
            `${y}%`;

        particula.style.setProperty(
            "--duracion",
            `${4 + Math.random() * 4}s`
        );

        particula.style.setProperty(
            "--retraso",
            `${Math.random() * 4}s`
        );

        particulasInicio.appendChild(
            particula
        );

    }

}


/* =========================================================
   PRESENTACIÓN INICIAL
========================================================= */

async function iniciarPresentacion() {

    tituloInicio.textContent = "";

    descripcionInicio.textContent = "";

    btnAbrir.classList.remove("visible");

    pistaInicio.classList.remove("visible");

    separadorInicio.classList.remove("visible");

    destelloPresentacion.classList.remove(
        "visible"
    );

    etiquetaInicio.classList.remove(
        "visible"
    );


    crearParticulasInicio();


    /* 1. Aparece ✦ */

    await esperar(500);

    destelloPresentacion.classList.add(
        "visible"
    );


    /* 2. Aparece TENGO ALGO PARA TI */

    await esperar(550);

    etiquetaInicio.classList.add(
        "visible"
    );


    /* 3. Se escribe Marí... */

    await esperar(550);

    await escribirTexto(
        tituloInicio,
        "Marí, tienes una pequeña sorpresa.",
        55
    );


    /* 4. Segunda frase */

    await esperar(350);

    await escribirTexto(
        descripcionInicio,
        "Pero primero tienes que descubrirla…",
        40
    );


    /* 5. Línea dorada */

    await esperar(300);

    separadorInicio.classList.add(
        "visible"
    );


    /* 6. Botón */

    await esperar(550);

    btnAbrir.classList.add("visible");


    /* 7. Pista */

    await esperar(600);

    pistaInicio.classList.add("visible");

}


/* =========================================================
   MÚSICA
========================================================= */

async function iniciarMusica() {

    if (musicaIniciada) return;

    musicaIniciada = true;

    musica.volume = 0;

    try {

        await musica.play();

        subirVolumen(
            0.22,
            1800
        );

    } catch (error) {

        console.log(
            "El navegador bloqueó temporalmente el audio.",
            error
        );

    }

}


function subirVolumen(
    volumenFinal,
    duracion
) {

    const pasos = 30;

    const intervalo =
        duracion / pasos;

    let paso = 0;

    const volumenInicial =
        musica.volume;

    const diferencia =
        volumenFinal -
        volumenInicial;

    const id = setInterval(() => {

        paso++;

        musica.volume =
            Math.min(
                1,
                Math.max(
                    0,
                    volumenInicial +
                    diferencia *
                    (paso / pasos)
                )
            );

        if (paso >= pasos) {

            clearInterval(id);

            musica.volume =
                volumenFinal;

        }

    }, intervalo);

}


function bajarVolumen(
    volumenFinal,
    duracion,
    callback
) {

    const pasos = 30;

    const intervalo =
        duracion / pasos;

    let paso = 0;

    const volumenInicial =
        musica.volume;

    const diferencia =
        volumenInicial -
        volumenFinal;

    const id = setInterval(() => {

        paso++;

        musica.volume =
            Math.max(
                volumenFinal,
                volumenInicial -
                diferencia *
                (paso / pasos)
            );

        if (paso >= pasos) {

            clearInterval(id);

            musica.volume =
                volumenFinal;

            if (callback) callback();

        }

    }, intervalo);

}


/* =========================================================
   ABRIR SORPRESA
========================================================= */

btnAbrir.addEventListener(
    "click",
    async () => {

        if (abriendoSorpresa) return;

        abriendoSorpresa = true;


        /*
           El audio empieza aquí porque es
           interacción directa del usuario.
           Esto ayuda especialmente en iPhone.
        */

        iniciarMusica();


        momentoPresentacion.classList.add(
            "saliendo"
        );


        await esperar(650);


        momentoPresentacion.classList.remove(
            "activo"
        );

        momentoCaja.classList.add(
            "activo"
        );


        await esperar(800);


        await escribirTexto(
            textoDescubrimiento,
            "A ver qué hay aquí…",
            65
        );


        await esperar(450);


        zonaCaja.classList.add(
            "abierta"
        );


        explosionCorazones();

        crearChispas(
            window.innerWidth / 2,
            window.innerHeight / 2,
            18
        );


        await esperar(1300);


        crearChispas(
            window.innerWidth / 2,
            window.innerHeight * 0.42,
            12
        );


        await esperar(2600);


        momentoCaja.classList.add(
            "saliendo"
        );


        await esperar(550);


        progreso.classList.remove(
            "ocultar-progreso"
        );

        actualizarProgreso(1);

        mostrarEscena(
            escenaFlores
        );


        crearPetalos(6);


        await esperar(1400);


        iniciarTextosFlores();

    }
);


/* =========================================================
   EXPLOSIÓN DE CORAZONES
========================================================= */

function explosionCorazones() {

    const total =
        window.innerWidth <= 700
            ? 320
            : 414;

    const grupos = 9;

    const porGrupo =
        Math.ceil(
            total / grupos
        );

    for (
        let grupo = 0;
        grupo < grupos;
        grupo++
    ) {

        programar(() => {

            for (
                let i = 0;
                i < porGrupo;
                i++
            ) {

                crearCorazonCaja();

            }

        }, grupo * 115);

    }

}


function crearCorazonCaja() {

    const corazon =
        document.createElement("span");

    corazon.className =
        "corazon-caja";

    corazon.textContent =
        Math.random() > 0.15
            ? "♥"
            : "✦";


    const variante =
        Math.floor(
            Math.random() * 4
        );

    if (variante === 1) {

        corazon.classList.add(
            "durazno"
        );

    }

    if (variante === 2) {

        corazon.classList.add(
            "crema"
        );

    }

    if (variante === 3) {

        corazon.classList.add(
            "claro"
        );

    }


    const x =
        (
            Math.random() - 0.5
        ) *
        (
            window.innerWidth <= 700
                ? 330
                : 520
        );

    const y =
        -(
            120 +
            Math.random() *
            (
                window.innerWidth <= 700
                    ? 430
                    : 520
            )
        );

    const escala =
        0.45 +
        Math.random() * 1.6;

    const rotacion =
        (
            Math.random() - 0.5
        ) *
        240;

    const tiempo =
        1.5 +
        Math.random() * 1.7;


    corazon.style.fontSize =
        `${8 + Math.random() * 18}px`;

    corazon.style.setProperty(
        "--x",
        `${x}px`
    );

    corazon.style.setProperty(
        "--y",
        `${y}px`
    );

    corazon.style.setProperty(
        "--escala",
        escala
    );

    corazon.style.setProperty(
        "--rotacion",
        `${rotacion}deg`
    );

    corazon.style.setProperty(
        "--tiempo",
        `${tiempo}s`
    );


    contenedorCorazonesCaja.appendChild(
        corazon
    );


    programar(() => {

        corazon.remove();

    }, tiempo * 1000 + 200);

}


/* =========================================================
   TEXTOS FLORES
========================================================= */

async function iniciarTextosFlores() {

    fraseFlor1.textContent = "";
    fraseFlor2.textContent = "";
    fraseFlor3.textContent = "";

    separadorFlores.classList.remove(
        "visible"
    );

    btnARecuerdos.classList.remove(
        "visible"
    );


    await escribirTexto(
        fraseFlor1,
        "No necesitaba ser una fecha especial para prepararte algo.",
        35
    );


    await esperar(400);


    separadorFlores.classList.add(
        "visible"
    );


    await esperar(450);


    await escribirTexto(
        fraseFlor2,
        "Dicen que las flores amarillas tienen un significado especial…",
        31
    );


    await esperar(300);


    await escribirTexto(
        fraseFlor3,
        "Pero yo solo quería encontrar una excusa para regalarte unas.",
        31
    );


    await esperar(500);


    btnARecuerdos.classList.add(
        "visible"
    );

}


/* =========================================================
   IR A RECUERDOS
========================================================= */

btnARecuerdos.addEventListener(
    "click",
    async () => {

        actualizarProgreso(2);

        mostrarEscena(
            escenaPuente
        );


        await esperar(2700);


        mostrarEscena(
            escenaRecuerdos
        );


        await esperar(550);


        recuerdoActual = 0;

        mostrarRecuerdo(
            recuerdoActual
        );

    }
);


/* =========================================================
   RECUERDOS
========================================================= */

async function mostrarRecuerdo(indice) {

    limpiarTemporizadorRecuerdo();

    fraseRecuerdoTerminada = false;

    tiempoRestanteRecuerdo = 5000;


    recuerdos.forEach(recuerdo => {

        recuerdo.classList.remove(
            "activo",
            "visible",
            "frase-visible"
        );

        const texto =
            recuerdo.querySelector(
                ".texto-recuerdo"
            );

        if (texto) {

            texto.textContent = "";

            texto.classList.remove(
                "escribiendo"
            );

        }

    });


    const actual =
        recuerdos[indice];

    if (!actual) return;


    actual.classList.add(
        "activo"
    );


    await esperar(100);


    if (
        !escenaRecuerdos.classList.contains(
            "activa"
        )
    ) {
        return;
    }


    actual.classList.add(
        "visible"
    );


    /*
       Mostramos la ayuda una sola vez.
    */

    if (!ayudaPausaMostrada) {

        ayudaPausaMostrada = true;

        programar(() => {

            ayudaPausa.classList.add(
                "visible"
            );

        }, 1700);

        programar(() => {

            ayudaPausa.classList.remove(
                "visible"
            );

        }, 6000);

    }


    await esperar(1150);


    if (
        !escenaRecuerdos.classList.contains(
            "activa"
        )
    ) {
        return;
    }


    actual.classList.add(
        "frase-visible"
    );


    const texto =
        actual.querySelector(
            ".texto-recuerdo"
        );

    const contenido =
        texto.dataset.text;


    await escribirTexto(
        texto,
        contenido,
        38
    );


    fraseRecuerdoTerminada = true;


    /*
       Los 5 segundos comienzan
       únicamente cuando terminó
       de escribirse la frase.
    */

    if (!recuerdosPausados) {

        iniciarTiempoRecuerdo(
            5000
        );

    }

}


function iniciarTiempoRecuerdo(tiempo) {

    limpiarTemporizadorRecuerdo();

    tiempoRestanteRecuerdo =
        tiempo;

    inicioTemporizadorRecuerdo =
        Date.now();


    temporizadorRecuerdo =
        setTimeout(() => {

            avanzarRecuerdo();

        }, tiempo);

}


function limpiarTemporizadorRecuerdo() {

    if (temporizadorRecuerdo) {

        clearTimeout(
            temporizadorRecuerdo
        );

        temporizadorRecuerdo = null;

    }

}


async function avanzarRecuerdo() {

    limpiarTemporizadorRecuerdo();


    const actual =
        recuerdos[recuerdoActual];


    if (actual) {

        actual.classList.remove(
            "visible",
            "frase-visible"
        );

    }


    await esperar(700);


    recuerdoActual++;


    if (
        recuerdoActual <
        recuerdos.length
    ) {

        mostrarRecuerdo(
            recuerdoActual
        );

        return;

    }


    await esperar(1100);


    actualizarProgreso(3);

    mostrarEscena(
        escenaJuego
    );

    prepararJuego();

}


/* =========================================================
   PAUSAR RECUERDOS
========================================================= */

escenaRecuerdos.addEventListener(
    "click",
    evento => {

        /*
           Evitamos pausar por accidente
           si algún día agregamos botones.
        */

        if (
            evento.target.closest(
                "button"
            )
        ) {
            return;
        }


        if (recuerdosPausados) {

            reanudarRecuerdos();

        } else {

            pausarRecuerdos();

        }

    }
);


function pausarRecuerdos() {

    recuerdosPausados = true;


    if (temporizadorRecuerdo) {

        const transcurrido =
            Date.now() -
            inicioTemporizadorRecuerdo;

        tiempoRestanteRecuerdo =
            Math.max(
                0,
                tiempoRestanteRecuerdo -
                transcurrido
            );

        limpiarTemporizadorRecuerdo();

    }


    if (!musica.paused) {

        musica.pause();

    }


    mostrarIndicadorPausa(
        "❚❚"
    );

}


async function reanudarRecuerdos() {

    recuerdosPausados = false;


    try {

        await musica.play();

    } catch (error) {

        console.log(error);

    }


    mostrarIndicadorPausa(
        "▶"
    );


    /*
       Si la frase ya terminó,
       continuamos el tiempo restante.

       Esto también corrige el caso
       de pausar mientras se escribía.
    */

    if (fraseRecuerdoTerminada) {

        iniciarTiempoRecuerdo(
            tiempoRestanteRecuerdo > 0
                ? tiempoRestanteRecuerdo
                : 5000
        );

    }

}


function mostrarIndicadorPausa(icono) {

    indicadorPausa.textContent =
        icono;

    indicadorPausa.classList.add(
        "visible"
    );


    programar(() => {

        indicadorPausa.classList.remove(
            "visible"
        );

    }, 650);

}


/* =========================================================
   JUEGO
========================================================= */

function prepararJuego() {

    tableroTulipanes.innerHTML = "";

    tableroTulipanes.classList.remove(
        "resuelto"
    );

    mensajeJuego.textContent = "";

    btnDespuesJuego.classList.add(
        "oculto"
    );

    juegoResuelto = false;


    const total = 6;

    const diferente =
        Math.floor(
            Math.random() * total
        );


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const boton =
            document.createElement(
                "button"
            );

        boton.type =
            "button";

        boton.className =
            "tulipan-juego";

        boton.setAttribute(
            "aria-label",
            "Tulipán"
        );


        if (i === diferente) {

            boton.classList.add(
                "diferente"
            );

        }


        boton.innerHTML = `
            <span class="flor-tulipan">
                <span class="petalo petalo-izq"></span>
                <span class="petalo petalo-centro"></span>
                <span class="petalo petalo-der"></span>
            </span>

            <span class="tallo"></span>

            <span class="hoja hoja-izq"></span>
            <span class="hoja hoja-der"></span>
        `;


        boton.addEventListener(
            "click",
            () => {

                comprobarTulipan(
                    boton,
                    i === diferente
                );

            }
        );


        tableroTulipanes.appendChild(
            boton
        );

    }

}


function comprobarTulipan(
    boton,
    correcto
) {

    if (juegoResuelto) return;


    if (!correcto) {

        boton.classList.remove(
            "error"
        );

        void boton.offsetWidth;

        boton.classList.add(
            "error"
        );

        mensajeJuego.textContent =
            "Mmm… ese parece igual 👀";

        return;

    }


    juegoResuelto = true;


    boton.classList.add(
        "correcto"
    );

    tableroTulipanes.classList.add(
        "resuelto"
    );


    mensajeJuego.textContent =
        "Sabía que lo encontrarías 😌";


    crearPetalos(14);


    programar(() => {

        btnDespuesJuego.classList.remove(
            "oculto"
        );

    }, 800);

}


/* =========================================================
   DESPUÉS DEL JUEGO
========================================================= */

btnDespuesJuego.addEventListener(
    "click",
    () => {

        actualizarProgreso(4);

        mostrarEscena(
            escenaMensaje
        );

    }
);


/* =========================================================
   FOTO FINAL
========================================================= */

btnAFotoFinal.addEventListener(
    "click",
    async () => {

        actualizarProgreso(5);

        antesTerminar.classList.remove(
            "ocultar"
        );

        fotoDestacada.classList.remove(
            "visible"
        );

        fraseFotoFinal.textContent = "";

        btnAlFinal.classList.remove(
            "visible"
        );


        mostrarEscena(
            escenaFotoFinal
        );


        await esperar(1700);


        antesTerminar.classList.add(
            "ocultar"
        );


        await esperar(500);


        fotoDestacada.classList.add(
            "visible"
        );


        await esperar(1000);


        await escribirTexto(
            fraseFotoFinal,
            "Creo que algunos recuerdos no necesitan demasiadas palabras para ser especiales.",
            36
        );


        await esperar(400);


        btnAlFinal.classList.add(
            "visible"
        );

    }
);


/* =========================================================
   FINAL
========================================================= */

btnAlFinal.addEventListener(
    "click",
    () => {

        actualizarProgreso(5);

        mostrarEscena(
            escenaFinal
        );


        crearPetalos(18);


        programar(() => {

            preguntaFinal.classList.add(
                "visible"
            );

        }, 3300);

    }
);


/* =========================================================
   RESPUESTAS FINALES
========================================================= */

btnSi.addEventListener(
    "click",
    () => {

        responderFinal(
            "Entonces valió la pena hacer todo esto 😌"
        );

    }
);


btnPoquito.addEventListener(
    "click",
    () => {

        responderFinal(
            "Bueno… tendré que mejorar para la próxima 😂"
        );

    }
);


function responderFinal(texto) {

    if (
        btnSi.disabled ||
        btnPoquito.disabled
    ) {
        return;
    }


    btnSi.disabled = true;
    btnPoquito.disabled = true;


    respuestaFinal.textContent =
        texto;

    respuestaFinal.classList.add(
        "visible"
    );


    /*
       Dejamos que la canción continúe
       unos segundos después de responder.
    */

    programar(() => {

        bajarVolumen(
            0,
            1200,
            () => {

                musica.pause();

            }
        );

    }, 5000);


    programar(() => {

        btnRepetir.classList.add(
            "visible"
        );

    }, 1600);

}


/* =========================================================
   REPETIR
========================================================= */

btnRepetir.addEventListener(
    "click",
    () => {

        window.location.reload();

    }
);


/* =========================================================
   PÉTALOS
========================================================= */

function crearPetalos(cantidad = 10) {

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const petalo =
            document.createElement(
                "span"
            );

        petalo.className =
            "petalo-efecto";


        petalo.style.left =
            `${Math.random() * 100}%`;


        const duracion =
            3.5 +
            Math.random() * 2.8;


        const desplazamiento =
            (
                Math.random() - 0.5
            ) *
            180;


        petalo.style.setProperty(
            "--duracion",
            `${duracion}s`
        );

        petalo.style.setProperty(
            "--desplazamiento",
            `${desplazamiento}px`
        );


        petalo.style.animationDelay =
            `${Math.random() * 0.8}s`;


        petalo.style.transform =
            `scale(${0.65 + Math.random() * 0.7})`;


        capaEfectos.appendChild(
            petalo
        );


        programar(() => {

            petalo.remove();

        }, (duracion + 1) * 1000);

    }

}


/* =========================================================
   CHISPAS
========================================================= */

function crearChispas(
    x,
    y,
    cantidad = 12
) {

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const chispa =
            document.createElement(
                "span"
            );

        chispa.className =
            "chispa";

        chispa.textContent =
            Math.random() > 0.35
                ? "✦"
                : "•";


        chispa.style.left =
            `${x}px`;

        chispa.style.top =
            `${y}px`;


        const angulo =
            Math.random() *
            Math.PI *
            2;


        const distancia =
            70 +
            Math.random() *
            180;


        chispa.style.setProperty(
            "--x",
            `${Math.cos(angulo) * distancia}px`
        );

        chispa.style.setProperty(
            "--y",
            `${Math.sin(angulo) * distancia}px`
        );


        chispa.style.fontSize =
            `${8 + Math.random() * 12}px`;


        capaEfectos.appendChild(
            chispa
        );


        programar(() => {

            chispa.remove();

        }, 1400);

    }

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

actualizarProgreso(0);

iniciarPresentacion();