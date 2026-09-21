document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPALES
    ===================================================== */

    const escenas = {
        inicio: document.getElementById("escenaInicio"),
        flores: document.getElementById("escenaFlores"),
        puente: document.getElementById("escenaPuente"),
        recuerdos: document.getElementById("escenaRecuerdos"),
        juego: document.getElementById("escenaJuego"),
        mensaje: document.getElementById("escenaMensaje"),
        fotoFinal: document.getElementById("escenaFotoFinal"),
        foto5: document.getElementById("escenaFoto5"),
        dedicatoria: document.getElementById("escenaDedicatoria"),
        final: document.getElementById("escenaFinal")
    };

    const progreso = document.getElementById("progreso");
    const puntos = progreso
        ? [...progreso.querySelectorAll(".punto")]
        : [];

    const musica = document.getElementById("musica");
    const capaEfectos = document.getElementById("capaEfectos");

    /* =====================================================
       INICIO
    ===================================================== */

    const momentoPresentacion =
        document.getElementById("momentoPresentacion");

    const momentoCaja =
        document.getElementById("momentoCaja");

    const btnAbrir =
        document.getElementById("btnAbrir");

    const pistaInicio =
        document.getElementById("pistaInicio");

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

    const textoDescubrimiento =
        document.getElementById("textoDescubrimiento");

    const zonaCaja =
        document.getElementById("zonaCaja");

    /* =====================================================
       FLORES
    ===================================================== */

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

    /* =====================================================
       RECUERDOS
    ===================================================== */

    const recuerdos =
        [...document.querySelectorAll(".recuerdo")];

    const ayudaPausa =
        document.getElementById("ayudaPausa");

    const indicadorPausa =
        document.getElementById("indicadorPausa");

    /* =====================================================
       JUEGO
    ===================================================== */

    const tableroTulipanes =
        document.getElementById("tableroTulipanes");

    const mensajeJuego =
        document.getElementById("mensajeJuego");

    const btnDespuesJuego =
        document.getElementById("btnDespuesJuego");

    /* =====================================================
       MENSAJE / FOTO FINAL
    ===================================================== */

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

    const fotoDestacada5 =
        document.getElementById("fotoDestacada5");

    const fraseFoto5 =
        document.getElementById("fraseFoto5");

    const btnFoto5AlFinal = document.getElementById("btnFoto5AlFinal");
    const textoDedicatoria = document.getElementById("textoDedicatoria");
    const btnDedicatoriaFinal = document.getElementById("btnDedicatoriaFinal");
    const finalLinea1 = document.getElementById("finalLinea1");
    const finalLinea2 = document.getElementById("finalLinea2");
    const finalFirma1 = document.getElementById("finalFirma1");
    const finalFirma2 = document.getElementById("finalFirma2");
    const corazonFirma = document.getElementById("corazonFirma");

    /* =====================================================
       FINAL
    ===================================================== */

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


    /* =====================================================
       VARIABLES
    ===================================================== */

    let musicaIniciada = false;

    let volumenMusica = 0.55;

    let indiceRecuerdo = 0;

    let recuerdosActivos = false;

    let recuerdosPausados = false;

    let temporizadorRecuerdo = null;

    let fraseRecuerdoTerminada = false;

    let juegoResuelto = false;

    let finalRespondido = false;

    let bloqueandoCambio = false;

    let abriendoSorpresa = false;


    /* =====================================================
       UTILIDADES
    ===================================================== */

    function esperar(ms) {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }


    function esMovil() {
        return window.matchMedia(
            "(max-width: 700px)"
        ).matches;
    }


    function numeroAleatorio(min, max) {

        return Math.random() *
            (max - min) +
            min;
    }


    /* =====================================================
       EFECTO DE ESCRITURA
    ===================================================== */

    async function escribirTexto(
        elemento,
        texto,
        velocidad = 45
    ) {

        if (!elemento) return;

        elemento.textContent = "";

        elemento.classList.add(
            "escribiendo"
        );

        for (
            let i = 0;
            i < texto.length;
            i++
        ) {

            elemento.textContent +=
                texto.charAt(i);

            await esperar(velocidad);
        }

        elemento.classList.remove(
            "escribiendo"
        );
    }


    /* =====================================================
       CAMBIO DE ESCENAS
    ===================================================== */

    async function cambiarEscena(
        actual,
        nueva,
        numeroPaso
    ) {

        if (bloqueandoCambio) return;

        bloqueandoCambio = true;

        if (actual) {
            actual.classList.remove(
                "activa"
            );
        }

        await esperar(500);

        if (nueva) {
            nueva.classList.add(
                "activa"
            );
        }

        if (
            typeof numeroPaso ===
            "number"
        ) {
            actualizarProgreso(
                numeroPaso
            );
        }

        await esperar(100);

        bloqueandoCambio = false;
    }


    /* =====================================================
       PROGRESO
    ===================================================== */

    function mostrarProgreso() {

        if (!progreso) return;

        progreso.classList.remove(
            "ocultar-progreso"
        );
    }


    function actualizarProgreso(indice) {

        if (!puntos.length) return;

        puntos.forEach(
            (punto, i) => {

                punto.classList.remove(
                    "activo",
                    "completo"
                );

                if (i < indice) {
                    punto.classList.add(
                        "completo"
                    );
                }

                if (i === indice) {
                    punto.classList.add(
                        "activo"
                    );
                }
            }
        );
    }


    /* =====================================================
       MÚSICA
    ===================================================== */

    async function iniciarMusica() {

        if (
            !musica ||
            musicaIniciada
        ) return;

        musicaIniciada = true;

        musica.volume = 0;

        try {

            await musica.play();

            const intervalo =
                setInterval(() => {

                    if (
                        musica.volume <
                        volumenMusica
                    ) {

                        musica.volume =
                            Math.min(
                                volumenMusica,
                                musica.volume +
                                0.035
                            );

                    } else {

                        clearInterval(
                            intervalo
                        );
                    }

                }, 90);

        } catch (error) {

            console.log(
                "La reproducción de música fue bloqueada:",
                error
            );
        }
    }


    function pausarMusica() {

        if (
            musica &&
            !musica.paused
        ) {
            musica.pause();
        }
    }


    function reanudarMusica() {

        if (
            musica &&
            musicaIniciada &&
            musica.paused
        ) {

            musica.play().catch(() => {});
        }
    }


    async function desvanecerMusica() {

        if (
            !musica ||
            musica.paused
        ) return;

        const volumenInicial =
            musica.volume;

        const pasos = 20;

        for (
            let i = pasos;
            i >= 0;
            i--
        ) {

            musica.volume =
                volumenInicial *
                (i / pasos);

            await esperar(60);
        }

        musica.pause();

        musica.volume =
            volumenMusica;
    }


    /* =====================================================
       PARTÍCULAS DEL INICIO
    ===================================================== */

    function crearParticulasInicio() {

        const contenedor =
            document.getElementById(
                "particulasInicio"
            );

        if (!contenedor) return;

        contenedor.innerHTML = "";

        const cantidad =
            esMovil() ? 8 : 10;

        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const particula =
                document.createElement(
                    "span"
                );

            particula.className =
                "particula-inicio";

            if (
                Math.random() >
                0.55
            ) {

                particula.classList.add(
                    "destello"
                );

                particula.textContent =
                    "✦";
            }

            particula.style.left =
                numeroAleatorio(
                    5,
                    95
                ) + "%";

            particula.style.top =
                numeroAleatorio(
                    8,
                    92
                ) + "%";

            particula.style.setProperty(
                "--duracion",
                numeroAleatorio(
                    4.5,
                    8
                ) + "s"
            );

            particula.style.setProperty(
                "--retraso",
                numeroAleatorio(
                    0,
                    4
                ) + "s"
            );

            particula.style.setProperty(
                "--tamano",
                numeroAleatorio(
                    8,
                    15
                ) + "px"
            );

            contenedor.appendChild(
                particula
            );
        }
    }


    /* =====================================================
       PRESENTACIÓN INICIAL
    ===================================================== */

    async function iniciarPresentacion() {

        crearParticulasInicio();

        await esperar(500);

        destelloPresentacion
            ?.classList.add(
                "visible"
            );

        await esperar(650);

        etiquetaInicio
            ?.classList.add(
                "visible"
            );

        await esperar(650);

        await escribirTexto(
            tituloInicio,
            "Mari, tienes una pequeña sorpresa.",
            esMovil() ? 45 : 52
        );

        await esperar(350);

        await escribirTexto(
            descripcionInicio,
            "Pero primero tienes que descubrirla…",
            esMovil() ? 32 : 38
        );

        await esperar(400);

        separadorInicio
            ?.classList.add(
                "visible"
            );

        await esperar(550);

        btnAbrir
            ?.classList.add(
                "visible"
            );

        await esperar(500);

        pistaInicio
            ?.classList.add(
                "visible"
            );
    }


    /* =====================================================
       ABRIR SORPRESA
    ===================================================== */

    if (btnAbrir) {

        btnAbrir.addEventListener(
            "click",
            async () => {

                if (
                    abriendoSorpresa
                ) return;

                abriendoSorpresa =
                    true;

                btnAbrir.disabled =
                    true;

                iniciarMusica();

                pistaInicio
                    ?.classList.remove(
                        "visible"
                    );

                btnAbrir
                    ?.classList.remove(
                        "visible"
                    );

                await esperar(250);

                momentoPresentacion
                    ?.classList.add(
                        "saliendo"
                    );

                await esperar(650);

                momentoPresentacion
                    ?.classList.remove(
                        "activo"
                    );

                momentoCaja
                    ?.classList.add(
                        "activo"
                    );

                await esperar(650);

                await escribirTexto(
                    textoDescubrimiento,
                    "A ver qué hay aquí…",
                    esMovil() ? 35 : 42
                );

                await esperar(700);

                abrirCaja();
            }
        );
    }


    /* =====================================================
       APERTURA DE CAJA
    ===================================================== */

    async function abrirCaja() {

        zonaCaja
            ?.classList.add(
                "abierta"
            );

        crearExplosionCorazones();

        crearChispasCaja();

        setTimeout(
            crearChispasCaja,
            520
        );

        await esperar(
            esMovil()
                ? 2300
                : 2100
        );

        escenas.inicio
            ?.classList.remove(
                "activa"
            );

        await esperar(400);

        escenas.flores
            ?.classList.add(
                "activa"
            );

        mostrarProgreso();

        actualizarProgreso(0);

        await esperar(250);

        iniciarFlores();
    }


    /* =====================================================
       EXPLOSIÓN DE CORAZONES
    ===================================================== */

    function crearExplosionCorazones() {

        if (
            !capaEfectos ||
            !zonaCaja
        ) return;

        const rect =
            zonaCaja.getBoundingClientRect();

        const origenX =
            rect.left +
            rect.width / 2;

        const origenY =
            rect.top +
            rect.height * 0.72;

        crearOleadaCorazones(
            origenX,
            origenY,
            esMovil()
                ? 55
                : 72
        );

        setTimeout(() => {

            crearOleadaCorazones(
                origenX,
                origenY,
                esMovil()
                    ? 55
                    : 73
            );

        }, 520);
    }


    function crearOleadaCorazones(
        origenX,
        origenY,
        cantidad
    ) {

        const simbolos = [
            "♥",
            "♡",
            "✦"
        ];

        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const corazon =
                document.createElement(
                    "span"
                );

            corazon.className =
                "corazon-caja";

            corazon.textContent =
                simbolos[
                    Math.floor(
                        Math.random() *
                        simbolos.length
                    )
                ];

            const destinoX =
                numeroAleatorio(
                    -window.innerWidth *
                    0.58,
                    window.innerWidth *
                    0.58
                );

            const destinoY =
                numeroAleatorio(
                    -window.innerHeight *
                    0.80,
                    window.innerHeight *
                    0.20
                );

            corazon.style.position =
                "fixed";

            corazon.style.left =
                origenX + "px";

            corazon.style.top =
                origenY + "px";

            corazon.style.bottom =
                "auto";

            corazon.style.fontSize =
                numeroAleatorio(
                    esMovil()
                        ? 13
                        : 14,
                    esMovil()
                        ? 27
                        : 31
                ) + "px";

            corazon.style.setProperty(
                "--x",
                destinoX + "px"
            );

            corazon.style.setProperty(
                "--y",
                destinoY + "px"
            );

            corazon.style.setProperty(
                "--escala",
                numeroAleatorio(
                    0.65,
                    1.45
                )
            );

            corazon.style.setProperty(
                "--rotacion",
                numeroAleatorio(
                    -180,
                    180
                ) + "deg"
            );

            corazon.style.setProperty(
                "--tiempo",
                numeroAleatorio(
                    1.7,
                    3
                ) + "s"
            );

            const variante =
                Math.random();

            if (
                variante < 0.25
            ) {

                corazon.classList.add(
                    "durazno"
                );

            } else if (
                variante < 0.5
            ) {

                corazon.classList.add(
                    "crema"
                );

            } else if (
                variante < 0.75
            ) {

                corazon.classList.add(
                    "claro"
                );
            }

            capaEfectos.appendChild(
                corazon
            );

            setTimeout(() => {

                corazon.remove();

            }, 3300);
        }
    }


    /* =====================================================
       CHISPAS DE LA CAJA
    ===================================================== */

    function crearChispasCaja() {

        if (!zonaCaja) return;

        const rect =
            zonaCaja.getBoundingClientRect();

        crearChispas(
            rect.left +
            rect.width / 2,

            rect.top +
            rect.height * 0.70,

            esMovil()
                ? 20
                : 26
        );
    }


    function crearChispas(
        x,
        y,
        cantidad = 18
    ) {

        if (!capaEfectos) return;

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
                Math.random() >
                0.4
                    ? "✦"
                    : "·";

            chispa.style.left =
                x + "px";

            chispa.style.top =
                y + "px";

            chispa.style.fontSize =
                numeroAleatorio(
                    7,
                    14
                ) + "px";

            chispa.style.setProperty(
                "--x",
                numeroAleatorio(
                    -130,
                    130
                ) + "px"
            );

            chispa.style.setProperty(
                "--y",
                numeroAleatorio(
                    -130,
                    100
                ) + "px"
            );

            capaEfectos.appendChild(
                chispa
            );

            setTimeout(
                () => chispa.remove(),
                1500
            );
        }
    }


    /* =====================================================
       ESCENA DE FLORES
    ===================================================== */

    async function iniciarFlores() {

        /*
           Al aparecer el ramo se generan
           pétalos en toda la pantalla.

           El movimiento permanente del ramo
           lo realiza el CSS.
        */

        btnARecuerdos
            ?.classList.remove(
                "visible"
            );

        crearPetalos(
            esMovil()
                ? 22
                : 28
        );

        await esperar(650);

        const ramo =
            document.querySelector(
                ".ramo-principal"
            );

        if (ramo) {

            const rect =
                ramo.getBoundingClientRect();

            crearChispas(
                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2,

                esMovil()
                    ? 15
                    : 18
            );
        }

        await esperar(350);

        try {

            await escribirTexto(
                fraseFlor1,

                "No tenía que ser una fecha especial para querer tener un detalle contigo.",

                esMovil()
                    ? 22
                    : 25
            );

            await esperar(200);

            separadorFlores
                ?.classList.add(
                    "visible"
                );

            await esperar(250);

            await escribirTexto(
                fraseFlor2,

                "Dicen que las flores amarillas tienen un significado especial…",

                esMovil()
                    ? 20
                    : 23
            );

            await esperar(180);

            await escribirTexto(
                fraseFlor3,

                "Pero yo solo necesitaba una pequeña excusa para regalarte unas y sacarte una sonrisa.",

                esMovil()
                    ? 20
                    : 23
            );

            await esperar(300);

        } catch (error) {

            console.error(
                "Error en la escena de flores:",
                error
            );

        } finally {

            /*
               El botón siempre aparece,
               incluso si hubiese algún problema
               con una animación.
            */

            btnARecuerdos
                ?.classList.add(
                    "visible"
                );
        }
    }


    /* =====================================================
       PÉTALOS
    ===================================================== */

    function crearPetalos(
        cantidad = 25
    ) {

        if (!capaEfectos) return;

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
                numeroAleatorio(
                    -5,
                    100
                ) + "vw";

            petalo.style.width =
                numeroAleatorio(
                    8,
                    15
                ) + "px";

            petalo.style.height =
                numeroAleatorio(
                    12,
                    21
                ) + "px";

            petalo.style.setProperty(
                "--duracion",
                numeroAleatorio(
                    4,
                    7
                ) + "s"
            );

            petalo.style.setProperty(
                "--desplazamiento",
                numeroAleatorio(
                    -120,
                    120
                ) + "px"
            );

            petalo.style.animationDelay =
                numeroAleatorio(
                    0,
                    1.2
                ) + "s";

            capaEfectos.appendChild(
                petalo
            );

            setTimeout(() => {

                petalo.remove();

            }, 8500);
        }
    }


    /* =====================================================
       FLORES → PUENTE
    ===================================================== */

    if (btnARecuerdos) {

        btnARecuerdos.addEventListener(
            "click",
            async () => {

                btnARecuerdos.disabled =
                    true;

                await cambiarEscena(
                    escenas.flores,
                    escenas.puente,
                    1
                );

                await esperar(3300);

                await cambiarEscena(
                    escenas.puente,
                    escenas.recuerdos,
                    2
                );

                iniciarRecuerdos();
            }
        );
    }


    /* =====================================================
       RECUERDOS
    ===================================================== */

    async function iniciarRecuerdos() {

        recuerdosActivos = true;

        recuerdosPausados = false;

        indiceRecuerdo = 0;

        fraseRecuerdoTerminada =
            false;

        recuerdos.forEach(
            recuerdo => {

                recuerdo.classList.remove(
                    "activo",
                    "visible",
                    "frase-visible"
                );
            }
        );

        mostrarRecuerdo(
            indiceRecuerdo
        );
    }


    async function mostrarRecuerdo(
        indice
    ) {

        if (
            !recuerdosActivos ||
            !recuerdos[indice]
        ) return;

        clearTimeout(
            temporizadorRecuerdo
        );

        fraseRecuerdoTerminada =
            false;

        ayudaPausa
            ?.classList.remove(
                "visible"
            );

        recuerdos.forEach(
            recuerdo => {

                recuerdo.classList.remove(
                    "activo",
                    "visible",
                    "frase-visible"
                );
            }
        );

        const recuerdo =
            recuerdos[indice];

        recuerdo.classList.add(
            "activo"
        );

        await esperar(80);

        recuerdo.classList.add(
            "visible"
        );

        await esperar(700);

        recuerdo.classList.add(
            "frase-visible"
        );

        await esperar(250);

        const texto =
            recuerdo.querySelector(
                ".texto-recuerdo"
            );

        if (texto) {

            await escribirTexto(
                texto,
                texto.dataset.text || "",
                esMovil()
                    ? 27
                    : 31
            );
        }

        fraseRecuerdoTerminada =
            true;

        ayudaPausa
            ?.classList.add(
                "visible"
            );

        /*
           El conteo de 5 segundos comienza
           solamente después de terminar
           de escribir la frase.
        */

        if (!recuerdosPausados) {

            iniciarTemporizadorRecuerdo(texto?.dataset.text?.length || 80);
        }
    }


    function iniciarTemporizadorRecuerdo(longitud = 80) {

        clearTimeout(
            temporizadorRecuerdo
        );

        temporizadorRecuerdo =
            setTimeout(
                siguienteRecuerdo,
                Math.min(10000, Math.max(7000, 7000 + (longitud - 70) * 35))
            );
    }


    async function siguienteRecuerdo() {

        if (
            recuerdosPausados ||
            !recuerdosActivos
        ) return;

        const actual =
            recuerdos[
                indiceRecuerdo
            ];

        actual?.classList.remove(
            "visible"
        );

        ayudaPausa
            ?.classList.remove(
                "visible"
            );

        await esperar(650);

        actual?.classList.remove(
            "activo",
            "frase-visible"
        );

        indiceRecuerdo++;

        if (
            indiceRecuerdo <
            recuerdos.length
        ) {

            mostrarRecuerdo(
                indiceRecuerdo
            );

        } else {

            recuerdosActivos =
                false;

            await esperar(350);

            await cambiarEscena(
                escenas.recuerdos,
                escenas.juego,
                3
            );

            prepararJuego();
        }
    }


    /* =====================================================
       PAUSAR RECUERDOS
    ===================================================== */

    if (escenas.recuerdos) {

        escenas.recuerdos
            .addEventListener(
                "click",
                () => {

                    if (
                        !recuerdosActivos
                    ) return;

                    recuerdosPausados =
                        !recuerdosPausados;

                    if (
                        recuerdosPausados
                    ) {

                        clearTimeout(
                            temporizadorRecuerdo
                        );

                        pausarMusica();

                        mostrarIndicador(
                            "❚❚"
                        );

                    } else {

                        reanudarMusica();

                        mostrarIndicador(
                            "▶"
                        );

                        if (
                            fraseRecuerdoTerminada
                        ) {

                            iniciarTemporizadorRecuerdo();
                        }
                    }
                }
            );
    }


    function mostrarIndicador(
        simbolo
    ) {

        if (!indicadorPausa) return;

        indicadorPausa.textContent =
            simbolo;

        indicadorPausa.classList.add(
            "visible"
        );

        setTimeout(() => {

            indicadorPausa
                .classList.remove(
                    "visible"
                );

        }, 700);
    }


    /* =====================================================
       MINI JUEGO
    ===================================================== */

    function prepararJuego() {

        if (!tableroTulipanes) return;

        tableroTulipanes.innerHTML =
            "";

        tableroTulipanes.classList.remove(
            "resuelto"
        );

        mensajeJuego.textContent =
            "";

        btnDespuesJuego
            ?.classList.add(
                "oculto"
            );

        juegoResuelto = false;

        const cantidad = 9;

        const diferente =
            Math.floor(
                Math.random() *
                cantidad
            );

        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const boton =
                document.createElement(
                    "button"
                );

            boton.type = "button";

            boton.className = "tulipan-juego";

            boton.setAttribute(
                "aria-label",
                "Tulipán"
            );

            if (
                i === diferente
            ) {

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
                ${i === diferente ? '<span class="hoja hoja-extra"></span>' : ''}
            `;

            boton.addEventListener(
                "click",
                () => {

                    comprobarTulipan(
                        boton
                    );
                }
            );

            tableroTulipanes
                .appendChild(
                    boton
                );
        }
    }


    function comprobarTulipan(
        boton
    ) {

        if (juegoResuelto) return;

        if (
            boton.classList.contains(
                "diferente"
            )
        ) {

            juegoResuelto = true;

            boton.classList.add(
                "correcto"
            );

            tableroTulipanes
                ?.classList.add(
                    "resuelto"
                );

            mensajeJuego.innerHTML = "<strong>¡Ese era! 🌷💛</strong><br>Sabía que lo encontrarías… aunque te hice sufrir un poquito 😂";

            crearPetalos(
                esMovil() ? 28 : 36
            );

            const rect =
                boton.getBoundingClientRect();

            crearChispas(
                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2,

                14
            );

            setTimeout(() => {

                btnDespuesJuego
                    ?.classList.remove(
                        "oculto"
                    );

            }, 1500);

        } else {

            const mensajesError = [
                "Ese no era 😏 inténtalo otra vez", "Casi… pero no 👀",
                "¿Segura? Mira un poquito mejor 😂", "Nop 😌 sigue buscando",
                "Te dije que no sería tan fácil 🤭", "Por ahí no era 👀🌷",
                "Ya te vi tocando al azar 😂", "No hagas trampa pues 🤭"
            ];
            mensajeJuego.textContent = mensajesError[Math.floor(Math.random() * mensajesError.length)];

            boton.classList.remove(
                "error"
            );

            void boton.offsetWidth;

            boton.classList.add(
                "error"
            );
        }
    }


    /* =====================================================
       JUEGO → MENSAJE
    ===================================================== */

    if (btnDespuesJuego) {

        btnDespuesJuego
            .addEventListener(
                "click",
                async () => {

                    btnDespuesJuego.disabled =
                        true;

                    await cambiarEscena(
                        escenas.juego,
                        escenas.mensaje,
                        4
                    );
                }
            );
    }


    /* =====================================================
       MENSAJE → FOTO DESTACADA
    ===================================================== */

    if (btnAFotoFinal) {

        btnAFotoFinal.addEventListener(
            "click",
            async () => {

                btnAFotoFinal.disabled =
                    true;

                await cambiarEscena(
                    escenas.mensaje,
                    escenas.fotoFinal,
                    5
                );

                iniciarFotoFinal();
            }
        );
    }


    /* =====================================================
       FOTO FINAL
    ===================================================== */

    async function iniciarFotoFinal() {

        antesTerminar
            ?.classList.remove(
                "ocultar"
            );

        fotoDestacada
            ?.classList.remove(
                "visible"
            );

        if (fraseFotoFinal) {
            fraseFotoFinal.textContent = "";
        }

        await esperar(2200);

        antesTerminar
            ?.classList.add(
                "ocultar"
            );

        await esperar(650);

        fotoDestacada
            ?.classList.add(
                "visible"
            );

        await esperar(750);

        await escribirTexto(
            fraseFotoFinal,

            "Creo que algunos recuerdos no necesitan demasiadas palabras… basta con saber con quién los compartiste.",

            esMovil()
                ? 28
                : 35
        );

        await esperar(500);
        btnAlFinal?.classList.add("visible");
    }

    if (btnAlFinal) {
        btnAlFinal.addEventListener("click", async () => {
            btnAlFinal.disabled = true;
            await cambiarEscena(escenas.fotoFinal, escenas.foto5, 5);
            iniciarFoto5();
        });
    }


    async function iniciarFoto5() {

        fotoDestacada5
            ?.classList.remove(
                "visible"
            );

        btnFoto5AlFinal
            ?.classList.remove(
                "visible"
            );

        if (btnFoto5AlFinal) {
            btnFoto5AlFinal.disabled = false;
        }

        if (fraseFoto5) {
            fraseFoto5.textContent = "";
        }

        await esperar(450);

        fotoDestacada5
            ?.classList.add(
                "visible"
            );

        crearPetalos(
            esMovil()
                ? 12
                : 16
        );

        await esperar(750);

        await escribirTexto(
            fraseFoto5,

            "Primero estuvieron en mis manos… y después llegaron a las tuyas. Y aunque solo eran unas flores, me gustaba pensar que llevaban con ellas un poquito de lo especial que eres para mí. 💛",

            esMovil()
                ? 26
                : 33
        );

        await esperar(450);

        btnFoto5AlFinal
            ?.classList.add(
                "visible"
            );
    }


    /* =====================================================
       FOTO 5 → DEDICATORIA
    ===================================================== */
    if (btnFoto5AlFinal) {
        btnFoto5AlFinal.addEventListener("click", async event => {
            event.preventDefault(); event.stopPropagation();
            if (btnFoto5AlFinal.disabled) return;
            btnFoto5AlFinal.disabled = true;
            await cambiarEscena(escenas.foto5, escenas.dedicatoria, 6);
            await esperar(1200);
            iniciarDedicatoria();
        });
    }

    function iluminarDedicatoria(tipo = "dorado") {
        const escena = escenas.dedicatoria;
        if (!escena) return;
        escena.classList.remove("flash-dorado", "flash-rojo");
        void escena.offsetWidth;
        escena.classList.add(tipo === "rojo" ? "flash-rojo" : "flash-dorado");
        setTimeout(() => escena.classList.remove("flash-dorado", "flash-rojo"), 620);
    }

    function lanzarCorazonesDedicatoria(tipo = "dorado", cantidad = 18, explosion = false) {
        if (!capaEfectos) return;
        const rojo = tipo === "rojo";
        const simbolos = rojo ? ["♥"] : ["♥", "♥", "★", "✦"];
        const colores = rojo
            ? ["#e12636", "#f04450", "#c9182b", "#ff5964"]
            : ["#f2c94c", "#e0ad2f", "#ffd966", "#c99522", "#fff0a6"];

        const centros = explosion
            ? Array.from({length: Math.max(3, Math.round(cantidad / 12))}, () => numeroAleatorio(6, 94))
            : [];

        for (let i = 0; i < cantidad; i++) {
            const h = document.createElement("span");
            h.className = "corazon-dedicatoria" + (explosion ? " explosion" : "");
            h.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
            const baseX = explosion ? centros[i % centros.length] + numeroAleatorio(-8, 8) : numeroAleatorio(2, 98);
            h.style.left = Math.max(1, Math.min(99, baseX)) + "vw";
            h.style.bottom = numeroAleatorio(-34, 4) + "px";
            h.style.color = colores[Math.floor(Math.random() * colores.length)];
            h.style.fontSize = numeroAleatorio(esMovil() ? 18 : 21, esMovil() ? 42 : 50) + "px";
            h.style.setProperty("--dx", numeroAleatorio(-150, 150) + "px");
            h.style.setProperty("--dur", numeroAleatorio(2.2, 4.2) + "s");
            h.style.setProperty("--rot", numeroAleatorio(-55, 55) + "deg");
            h.style.setProperty("--pop", numeroAleatorio(0.85, 1.35));
            capaEfectos.appendChild(h);
            setTimeout(() => h.remove(), 4700);
        }

        const chispazos = explosion ? Math.max(20, Math.round(cantidad * .42)) : Math.max(8, Math.round(cantidad * .2));
        for (let j = 0; j < (explosion ? 3 : 1); j++) {
            setTimeout(() => crearChispas(
                numeroAleatorio(window.innerWidth * .10, window.innerWidth * .90),
                numeroAleatorio(window.innerHeight * .72, window.innerHeight * .94),
                chispazos
            ), j * 100);
        }
        iluminarDedicatoria(rojo ? "rojo" : "dorado");
    }

    function iniciarLluviaPetalosDedicatoria() {
        let activos = true;
        crearPetalos(esMovil() ? 32 : 42);
        const intervalo = setInterval(() => {
            if (!activos || !escenas.dedicatoria?.classList.contains("activa")) return;
            crearPetalos(esMovil() ? 18 : 24);
        }, 1500);
        return () => { activos = false; clearInterval(intervalo); };
    }

    async function escribirParrafoDedicatoria(texto, clase="") {
        const p=document.createElement("p"); if(clase) p.className=clase; textoDedicatoria.appendChild(p);
        await escribirTexto(p,texto,esMovil()?20:27);
    }

    async function iniciarDedicatoria() {
        if (!textoDedicatoria) return;
        textoDedicatoria.innerHTML = "";
        btnDedicatoriaFinal?.classList.remove("visible");

        const detenerPetalos = iniciarLluviaPetalosDedicatoria();
        let corazonesLanzados = 0;
        const maxCorazonesDorados = 200;

        const lanzarOleadaDorada = (cantidad = 14, explosion = false) => {
            const restantes = maxCorazonesDorados - corazonesLanzados;
            if (restantes <= 0) return;
            const reales = Math.min(cantidad, restantes);
            lanzarCorazonesDedicatoria("dorado", reales, explosion);
            corazonesLanzados += reales;
        };

        lanzarOleadaDorada(20, true);
        const oleadas = setInterval(() => lanzarOleadaDorada(esMovil() ? 11 : 14, Math.random() > .62), 760);

        await escribirParrafoDedicatoria(`No sé qué lugar voy a ocupar en tu vida,
pero ojalá algún día entiendas
que yo no llegué para jugar contigo.`);
        await esperar(160);

        await escribirParrafoDedicatoria(`Llegué sin buscarte,
y poco a poco, sin darme cuenta,
terminaste convirtiéndote en alguien
que realmente me importa.`);
        lanzarOleadaDorada(28, true);
        await esperar(160);

        await escribirParrafoDedicatoria(`Y ahora hay una parte de mí
que sonríe simplemente porque existes.`);
        lanzarOleadaDorada(34, true);
        await esperar(160);

        await escribirParrafoDedicatoria(`No sé qué nos depare el tiempo…
pero si algún día te preguntas qué siento,
ojalá pudiera prestarte por un momento mi corazón,
para que entendieras cuánto te quiero. ❤️`, "parrafo-te-quiero");

        clearInterval(oleadas);
        if (corazonesLanzados < maxCorazonesDorados) {
            lanzarOleadaDorada(maxCorazonesDorados - corazonesLanzados, true);
        }

        // Al llegar a “te quiero”, el dorado da paso a varias explosiones rojas.
        for (let o = 0; o < 6; o++) {
            setTimeout(() => lanzarCorazonesDedicatoria("rojo", esMovil() ? 28 : 34, true), o * 310);
        }

        await esperar(3000);
        detenerPetalos();
        btnDedicatoriaFinal?.classList.add("visible");
    }

    if (btnDedicatoriaFinal) {
        btnDedicatoriaFinal.addEventListener("click", async()=>{
            btnDedicatoriaFinal.disabled=true;
            await cambiarEscena(escenas.dedicatoria, escenas.final, 7);
            iniciarFinal();
        });
    }

    /* =====================================================
       ESCENA FINAL
    ===================================================== */

    async function iniciarFinal() {
        [finalLinea1,finalLinea2,finalFirma1,finalFirma2].forEach(el=>{if(el)el.textContent=""});
        corazonFirma?.classList.remove("subir"); btnRepetir?.classList.remove("visible"); preguntaFinal?.classList.remove("visible"); respuestaFinal?.classList.remove("visible"); if(respuestaFinal) respuestaFinal.textContent=""; finalRespondido=false; if(btnSi) btnSi.disabled=false; if(btnPoquito) btnPoquito.disabled=false;
        crearPetalos(esMovil()?18:24);
        await esperar(1000);
        await escribirTexto(finalLinea1,"Solo quería que lo supieras.",esMovil()?31:38);
        await esperar(280);
        await escribirTexto(finalLinea2,"Y si todo esto logró sacarte aunque sea una sonrisa, entonces valió completamente la pena. 💛",esMovil()?25:32);
        await esperar(300);
        await escribirTexto(finalFirma1,"Con cariño,",38);
        await esperar(180);
        await escribirTexto(finalFirma2,"César ❤️",45);
        await esperar(2000); corazonFirma?.classList.add("subir");
        await esperar(1200); preguntaFinal?.classList.add("visible");
    }

    /* =====================================================
       RESPUESTAS FINALES
    ===================================================== */

    if (btnSi) {

        btnSi.addEventListener(
            "click",
            () => {

                responderFinal(
                    "Entonces valió completamente la pena prepararla ❤️"
                );
            }
        );
    }


    if (btnPoquito) {

        btnPoquito.addEventListener(
            "click",
            () => {

                responderFinal(
                    "Con ese poquito me conformo 😌❤️"
                );
            }
        );
    }


    async function responderFinal(
        mensaje
    ) {

        if (finalRespondido) return;

        finalRespondido = true;

        if (btnSi) {
            btnSi.disabled = true;
        }

        if (btnPoquito) {
            btnPoquito.disabled =
                true;
        }

        if (respuestaFinal) {

            respuestaFinal.textContent =
                mensaje;

            respuestaFinal
                .classList.add(
                    "visible"
                );
        }

        /*
           Celebración final.
        */

        crearPetalos(
            esMovil()
                ? 22
                : 30
        );

        const tulipanes =
            document.querySelector(
                ".final-tulipanes"
            );

        if (tulipanes) {

            const rect =
                tulipanes
                    .getBoundingClientRect();

            crearChispas(
                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2,

                esMovil()
                    ? 18
                    : 24
            );
        }

        await esperar(850);

        btnRepetir
            ?.classList.add(
                "visible"
            );

        /*
           La música continúa 5 segundos
           después de responder.

           Luego baja durante aproximadamente
           1.2 segundos y se pausa.
        */

        setTimeout(() => {

            desvanecerMusica();

        }, 5000);
    }


    /* =====================================================
       VOLVER A VER LA SORPRESA
    ===================================================== */

    if (btnRepetir) {

        btnRepetir.addEventListener(
            "click",
            () => {

                window.location.reload();
            }
        );
    }


    /* =====================================================
       AJUSTE ALTURA CELULAR
    ===================================================== */

    function actualizarAlturaPantalla() {

        document.documentElement
            .style
            .setProperty(
                "--alto-pantalla",
                `${window.innerHeight}px`
            );
    }

    actualizarAlturaPantalla();

    window.addEventListener(
        "resize",
        actualizarAlturaPantalla
    );

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                actualizarAlturaPantalla,
                250
            );
        }
    );


    /* =====================================================
       MEJORA TOUCH
    ===================================================== */

    document
        .querySelectorAll("button")
        .forEach(boton => {

            boton.addEventListener(
                "touchstart",
                () => {},
                {
                    passive: true
                }
            );
        });


    /* =====================================================
       INICIO DE LA EXPERIENCIA
    ===================================================== */

    actualizarProgreso(0);

    iniciarPresentacion();

});