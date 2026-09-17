/* =========================================================
   FLORES PARA MARÍA
   PRESENTACIÓN AUTOMÁTICA + PAUSA INVISIBLE
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const inicio =
    document.getElementById("inicio");

const detalle =
    document.getElementById("detalle");

const btnDetalle =
    document.getElementById("btnDetalle");

const btnVolver =
    document.getElementById("btnVolver");

const musica =
    document.getElementById("musica");

const cortina =
    document.getElementById("cortina");

const luzPresentacion =
    document.getElementById("luzPresentacion");

const particulas =
    document.getElementById("particulas");

const particulasDetalle =
    document.getElementById("particulasDetalle");

const petalos =
    document.getElementById("petalos");

const subtituloAnimado =
    document.getElementById("subtituloAnimado");

const ramoInicio =
    document.getElementById("ramoInicio");

const textoIntro =
    document.getElementById("textoIntro");

const textoFinal =
    document.getElementById("textoFinal");

const corazonFinal =
    document.getElementById("corazonFinal");

const firmaFinal =
    document.getElementById("firmaFinal");

const nombreCesar =
    document.getElementById("nombreCesar");

const lineaFirma =
    document.getElementById("lineaFirma");

const fraseDistancia =
    document.getElementById("fraseDistancia");

const grupoTulipanes =
    document.getElementById("grupoTulipanes");


/* =========================================================
   ESCENAS
========================================================= */

const escenaIntro =
    document.getElementById("escenaIntro");

const escenaFoto1 =
    document.getElementById("escenaFoto1");

const escenaFoto2 =
    document.getElementById("escenaFoto2");

const escenaTulipanes =
    document.getElementById("escenaTulipanes");

const escenaFinal =
    document.getElementById("escenaFinal");


const escenas = [
    escenaIntro,
    escenaFoto1,
    escenaFoto2,
    escenaTulipanes,
    escenaFinal
];


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const volumenMusica = 0.38;

const tiempoIntro = 5200;
const tiempoFoto1 = 6500;
const tiempoFoto2 = 6500;
const tiempoTulipanes = 10500;

const velocidadIntro = 60;
const velocidadEscritura = 38;
const velocidadPalabra = 180;


/* =========================================================
   TEXTOS
========================================================= */

const textoPortada =
    "Estas flores son para tí.";


const mensajeIntro =
    "Algunos momentos merecen quedarse para siempre.";


const frase =

    "La distancia puede cambiar muchas cosas, " +

    "pero no las ganas de sorprenderte con " +

    "un pequeño detalle en un día como hoy. 💛";


const mensaje =

    "Espero que este pequeño detalle te saque una sonrisa. " +

    "Que nunca te falten motivos para sonreír, momentos bonitos " +

    "para recordar y personas que hagan tus días un poquito más especiales. " +

    "Estas flores amarillas son para ti. 💛";


/* =========================================================
   ESTADO GENERAL
========================================================= */

let presentacionIniciada = false;

let pausado = false;

let escribiendoIntro = false;
let escribiendoFrase = false;
let escribiendoFinal = false;

let posicionIntro = 0;
let posicionFrase = 0;
let posicionFinal = 0;

let palabrasFrase = [];


/* =========================================================
   TEMPORIZADORES PAUSABLES
========================================================= */

let tareas = [];


function esperar(
    funcion,
    tiempo
) {

    const tarea = {

        funcion: funcion,

        restante: tiempo,

        inicio: Date.now(),

        id: null,

        terminada: false

    };


    tarea.id =
        setTimeout(
            function () {

                if (tarea.terminada) {
                    return;
                }


                tarea.terminada = true;

                funcion();

            },

            tiempo
        );


    tareas.push(
        tarea
    );


    return tarea;

}


/* =========================================================
   PAUSAR TEMPORIZADORES
========================================================= */

function pausarTareas() {

    const ahora =
        Date.now();


    tareas.forEach(
        function (tarea) {

            if (
                tarea.terminada ||
                tarea.id === null
            ) {

                return;

            }


            clearTimeout(
                tarea.id
            );


            const transcurrido =
                ahora -
                tarea.inicio;


            tarea.restante =
                Math.max(
                    0,
                    tarea.restante -
                    transcurrido
                );


            tarea.id = null;

        }
    );

}


/* =========================================================
   REANUDAR TEMPORIZADORES
========================================================= */

function reanudarTareas() {

    tareas.forEach(
        function (tarea) {

            if (
                tarea.terminada ||
                tarea.id !== null
            ) {

                return;

            }


            tarea.inicio =
                Date.now();


            tarea.id =
                setTimeout(
                    function () {

                        if (
                            tarea.terminada
                        ) {

                            return;

                        }


                        tarea.terminada =
                            true;


                        tarea.funcion();

                    },

                    tarea.restante
                );

        }
    );

}


/* =========================================================
   LIMPIAR TEMPORIZADORES
========================================================= */

function limpiarTareas() {

    tareas.forEach(
        function (tarea) {

            if (
                tarea.id !== null
            ) {

                clearTimeout(
                    tarea.id
                );

            }

        }
    );


    tareas = [];

}


/* =========================================================
   PORTADA
========================================================= */

let intervaloPortada = null;


function animarPortada() {

    subtituloAnimado.textContent =
        "";


    subtituloAnimado.classList.remove(
        "escrito"
    );


    ramoInicio.classList.remove(
        "ramo-inicio-visible"
    );


    ramoInicio.classList.add(
        "ramo-inicio-oculto"
    );


    let posicion = 0;


    if (intervaloPortada) {

        clearInterval(
            intervaloPortada
        );

    }


    intervaloPortada =
        setInterval(
            function () {

                subtituloAnimado.textContent +=
                    textoPortada.charAt(
                        posicion
                    );


                posicion++;


                if (
                    posicion >=
                    textoPortada.length
                ) {

                    clearInterval(
                        intervaloPortada
                    );


                    intervaloPortada =
                        null;


                    subtituloAnimado.classList.add(
                        "escrito"
                    );


                    setTimeout(
                        function () {

                            ramoInicio.classList.remove(
                                "ramo-inicio-oculto"
                            );


                            ramoInicio.classList.add(
                                "ramo-inicio-visible"
                            );

                        },

                        350
                    );

                }

            },

            65
        );

}


setTimeout(
    animarPortada,
    650
);


/* =========================================================
   PARTÍCULAS
========================================================= */

function crearParticulas(
    contenedor,
    cantidad
) {

    if (!contenedor) {
        return;
    }


    if (
        contenedor.dataset.creado === "si"
    ) {

        return;

    }


    contenedor.dataset.creado =
        "si";


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const particula =
            document.createElement(
                "span"
            );


        particula.classList.add(
            "particula"
        );


        particula.style.left =
            Math.random() *
            100 +
            "%";


        particula.style.top =
            40 +
            Math.random() *
            80 +
            "%";


        const tamaño =
            2 +
            Math.random() *
            4;


        particula.style.width =
            tamaño +
            "px";


        particula.style.height =
            tamaño +
            "px";


        particula.style.animationDuration =
            6 +
            Math.random() *
            8 +
            "s";


        particula.style.animationDelay =
            Math.random() *
            6 +
            "s";


        contenedor.appendChild(
            particula
        );

    }

}


crearParticulas(
    particulas,
    22
);


/* =========================================================
   PÉTALOS
========================================================= */

function crearPetalos() {

    if (
        petalos.dataset.creado === "si"
    ) {

        return;

    }


    petalos.dataset.creado =
        "si";


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const petalo =
            document.createElement(
                "span"
            );


        petalo.classList.add(
            "petalo"
        );


        if (
            i % 3 === 0
        ) {

            petalo.classList.add(
                "petalo-frente"
            );

        }

        else if (
            i % 3 === 1
        ) {

            petalo.classList.add(
                "petalo-medio"
            );

        }

        else {

            petalo.classList.add(
                "petalo-fondo"
            );

        }


        petalo.style.left =
            Math.random() *
            100 +
            "%";


        let duracion;


        if (
            petalo.classList.contains(
                "petalo-fondo"
            )
        ) {

            duracion =
                11 +
                Math.random() *
                5;

        }

        else if (
            petalo.classList.contains(
                "petalo-frente"
            )
        ) {

            duracion =
                6 +
                Math.random() *
                3;

        }

        else {

            duracion =
                8 +
                Math.random() *
                4;

        }


        petalo.style.animationDuration =
            duracion +
            "s";


        petalo.style.animationDelay =
            Math.random() *
            6 +
            "s";


        petalos.appendChild(
            petalo
        );

    }

}


/* =========================================================
   ESCENAS
========================================================= */

function mostrarEscena(
    escenaNueva
) {

    escenas.forEach(
        function (escena) {

            escena.classList.remove(
                "activa"
            );

        }
    );


    esperar(
        function () {

            escenaNueva.classList.add(
                "activa"
            );

        },

        180
    );

}


/* =========================================================
   MÚSICA
========================================================= */

let intervaloVolumen = null;


function iniciarMusica() {

    if (
        intervaloVolumen
    ) {

        clearInterval(
            intervaloVolumen
        );


        intervaloVolumen =
            null;

    }


    musica.pause();

    musica.currentTime = 0;

    musica.volume = 0;


    musica.play()
        .then(
            function () {

                subirVolumen();

            }
        )
        .catch(
            function (error) {

                console.log(
                    "No se pudo iniciar la música:",
                    error
                );

            }
        );

}


function subirVolumen() {

    let volumenActual =
        musica.volume;


    intervaloVolumen =
        setInterval(
            function () {

                if (pausado) {
                    return;
                }


                volumenActual +=
                    0.02;


                if (
                    volumenActual >=
                    volumenMusica
                ) {

                    volumenActual =
                        volumenMusica;


                    clearInterval(
                        intervaloVolumen
                    );


                    intervaloVolumen =
                        null;

                }


                musica.volume =
                    Math.min(
                        volumenActual,
                        1
                    );

            },

            100
        );

}


/* =========================================================
   PAUSAR PRESENTACIÓN

   NO MUESTRA NINGÚN AVISO.
========================================================= */

function pausarPresentacion() {

    if (
        !presentacionIniciada ||
        pausado
    ) {

        return;

    }


    pausado = true;


    /*
       PAUSAR TIEMPOS
    */

    pausarTareas();


    /*
       PAUSAR MÚSICA
    */

    musica.pause();


    /*
       PAUSAR ANIMACIONES CSS
    */

    detalle.classList.add(
        "pausado"
    );

}


/* =========================================================
   CONTINUAR PRESENTACIÓN
========================================================= */

function continuarPresentacion() {

    if (
        !presentacionIniciada ||
        !pausado
    ) {

        return;

    }


    pausado = false;


    /*
       CONTINUAR ANIMACIONES
    */

    detalle.classList.remove(
        "pausado"
    );


    /*
       CONTINUAR MÚSICA
    */

    musica.play()
        .catch(
            function () {

                console.log(
                    "La música no pudo continuar."
                );

            }
        );


    /*
       CONTINUAR TIEMPOS
    */

    reanudarTareas();

}


/* =========================================================
   TOCAR / CLIC EN PANTALLA

   1 toque = pausa
   otro toque = continúa

   TODO DE FORMA INVISIBLE.
========================================================= */

detalle.addEventListener(
    "click",

    function (evento) {

        /*
           NO interferir con botones.
        */

        if (
            evento.target.closest(
                "button"
            )
        ) {

            return;

        }


        if (
            !presentacionIniciada
        ) {

            return;

        }


        if (pausado) {

            continuarPresentacion();

        }

        else {

            pausarPresentacion();

        }

    }
);


/* =========================================================
   VER DETALLE
========================================================= */

btnDetalle.addEventListener(
    "click",

    function () {

        btnDetalle.disabled =
            true;


        iniciarMusica();


        cortina.classList.add(
            "activa"
        );


        setTimeout(
            function () {

                inicio.style.display =
                    "none";


                detalle.classList.remove(
                    "oculto"
                );


                document.body.classList.add(
                    "presentacion-activa"
                );


                crearParticulas(
                    particulasDetalle,
                    30
                );


                crearPetalos();


                presentacionIniciada =
                    true;


                pausado =
                    false;


                iniciarPresentacion();


                setTimeout(
                    function () {

                        cortina.classList.remove(
                            "activa"
                        );

                    },

                    350
                );

            },

            700
        );

    }
);


/* =========================================================
   PRESENTACIÓN
========================================================= */

function iniciarPresentacion() {

    /*
       INTRO
    */

    mostrarEscena(
        escenaIntro
    );


    /*
       ESCRIBIR:
       "Algunos momentos..."
    */

    esperar(
        function () {

            iniciarTextoIntro();

        },

        850
    );


    /*
       FOTO 1
    */

    esperar(
        function () {

            mostrarEscena(
                escenaFoto1
            );

        },

        tiempoIntro
    );


    /*
       FOTO 2
    */

    esperar(
        function () {

            mostrarEscena(
                escenaFoto2
            );

        },

        tiempoIntro +
        tiempoFoto1
    );


    /*
       TULIPANES
    */

    esperar(
        function () {

            mostrarEscena(
                escenaTulipanes
            );


            petalos.classList.add(
                "activos"
            );


            esperar(
                function () {

                    iniciarFraseDistancia();

                },

                700
            );

        },

        tiempoIntro +
        tiempoFoto1 +
        tiempoFoto2
    );


    /*
       FINAL
    */

    esperar(
        function () {

            petalos.classList.remove(
                "activos"
            );


            mostrarEscena(
                escenaFinal
            );


            esperar(
                function () {

                    iniciarMensajeFinal();

                },

                900
            );

        },

        tiempoIntro +
        tiempoFoto1 +
        tiempoFoto2 +
        tiempoTulipanes
    );

}


/* =========================================================
   TEXTO INTRO ESCRITO
========================================================= */

function iniciarTextoIntro() {

    textoIntro.textContent =
        "";


    textoIntro.classList.remove(
        "escrito"
    );


    posicionIntro = 0;

    escribiendoIntro = true;


    escribirSiguienteIntro();

}


function escribirSiguienteIntro() {

    if (
        !escribiendoIntro ||
        pausado
    ) {

        return;

    }


    if (
        posicionIntro <
        mensajeIntro.length
    ) {

        textoIntro.textContent +=
            mensajeIntro.charAt(
                posicionIntro
            );


        posicionIntro++;


        esperar(
            escribirSiguienteIntro,
            velocidadIntro
        );

    }

    else {

        escribiendoIntro =
            false;


        textoIntro.classList.add(
            "escrito"
        );

    }

}


/* =========================================================
   FRASE DISTANCIA
========================================================= */

function iniciarFraseDistancia() {

    fraseDistancia.innerHTML =
        "";


    fraseDistancia.classList.remove(
        "frase-suave"
    );


    palabrasFrase =
        frase.split(" ");


    posicionFrase = 0;

    escribiendoFrase = true;


    escribirSiguientePalabra();

}


function escribirSiguientePalabra() {

    if (
        !escribiendoFrase ||
        pausado
    ) {

        return;

    }


    if (
        posicionFrase <
        palabrasFrase.length
    ) {

        const palabra =
            document.createElement(
                "span"
            );


        palabra.classList.add(
            "palabra-distancia"
        );


        palabra.textContent =
            palabrasFrase[
                posicionFrase
            ];


        fraseDistancia.appendChild(
            palabra
        );


        requestAnimationFrame(
            function () {

                palabra.classList.add(
                    "visible"
                );

            }
        );


        posicionFrase++;


        esperar(
            escribirSiguientePalabra,
            velocidadPalabra
        );

    }

    else {

        escribiendoFrase =
            false;


        /*
           FRASE SOLA 1.5 SEGUNDOS
        */

        esperar(
            function () {

                fraseDistancia.classList.add(
                    "frase-suave"
                );


                /*
                   LUEGO TULIPANES
                */

                esperar(
                    function () {

                        mostrarTulipanes();

                    },

                    450
                );

            },

            1500
        );

    }

}


/* =========================================================
   MOSTRAR TULIPANES
========================================================= */

function mostrarTulipanes() {

    grupoTulipanes.classList.remove(
        "tulipanes-ocultos"
    );


    grupoTulipanes.classList.add(
        "tulipanes-visibles"
    );

}


/* =========================================================
   MENSAJE FINAL
========================================================= */

function iniciarMensajeFinal() {

    textoFinal.textContent =
        "";


    posicionFinal = 0;

    escribiendoFinal = true;


    escribirSiguienteFinal();

}


function escribirSiguienteFinal() {

    if (
        !escribiendoFinal ||
        pausado
    ) {

        return;

    }


    if (
        posicionFinal <
        mensaje.length
    ) {

        textoFinal.textContent +=
            mensaje.charAt(
                posicionFinal
            );


        posicionFinal++;


        esperar(
            escribirSiguienteFinal,
            velocidadEscritura
        );

    }

    else {

        escribiendoFinal =
            false;


        secuenciaFinal();

    }

}


/* =========================================================
   SECUENCIA FINAL
========================================================= */

function secuenciaFinal() {

    /*
       CORAZÓN
    */

    esperar(
        function () {

            mostrarElementoFinal(
                corazonFinal
            );

        },

        450
    );


    /*
       FIRMA
    */

    esperar(
        function () {

            mostrarElementoFinal(
                firmaFinal
            );

        },

        1100
    );


    /*
       DESTELLO CÉSAR
    */

    esperar(
        function () {

            nombreCesar.classList.add(
                "destello"
            );

        },

        1800
    );


    /*
       LÍNEA DORADA
    */

    esperar(
        function () {

            lineaFirma.classList.add(
                "dibujar"
            );

        },

        2200
    );


    /*
       VOLVER A VER
    */

    esperar(
        function () {

            mostrarElementoFinal(
                btnVolver
            );


            /*
               MÚSICA SIGUE
               4 SEGUNDOS.
            */

            esperar(
                function () {

                    finalizarMusica();

                },

                4000
            );

        },

        3000
    );

}


/* =========================================================
   MOSTRAR ELEMENTO
========================================================= */

function mostrarElementoFinal(
    elemento
) {

    elemento.classList.remove(
        "oculto-final"
    );


    requestAnimationFrame(
        function () {

            elemento.classList.add(
                "mostrar-final"
            );

        }
    );

}


/* =========================================================
   FINALIZAR MÚSICA
========================================================= */

function finalizarMusica() {

    particulasDetalle.classList.add(
        "particulas-desaparecer"
    );


    petalos.classList.add(
        "petalos-desaparecer"
    );


    luzPresentacion.classList.add(
        "final-suave"
    );


    const volumenInicial =
        musica.volume;


    const pasos = 20;

    let paso = 0;


    function bajarPaso() {

        if (pausado) {
            return;
        }


        paso++;


        musica.volume =
            Math.max(
                0,

                volumenInicial *
                (
                    1 -
                    paso / pasos
                )
            );


        if (
            paso < pasos
        ) {

            esperar(
                bajarPaso,
                100
            );

        }

        else {

            musica.volume =
                0;


            musica.pause();

        }

    }


    bajarPaso();

}


/* =========================================================
   VOLVER A VER
========================================================= */

btnVolver.addEventListener(
    "click",

    function (evento) {

        /*
           EVITAR QUE EL BOTÓN
           ACTIVE LA PAUSA.
        */

        evento.stopPropagation();


        limpiarTareas();


        presentacionIniciada =
            false;


        pausado =
            false;


        escribiendoIntro =
            false;


        escribiendoFrase =
            false;


        escribiendoFinal =
            false;


        /*
           MÚSICA
        */

        musica.pause();

        musica.currentTime =
            0;

        musica.volume =
            0;


        /*
           QUITAR ESTADO PAUSA
        */

        detalle.classList.remove(
            "pausado"
        );


        /*
           ESCENAS
        */

        escenas.forEach(
            function (escena) {

                escena.classList.remove(
                    "activa"
                );

            }
        );


        /*
           TEXTO INTRO
        */

        textoIntro.textContent =
            "";


        textoIntro.classList.remove(
            "escrito"
        );


        /*
           FRASE DISTANCIA
        */

        fraseDistancia.innerHTML =
            "";


        fraseDistancia.classList.remove(
            "frase-suave"
        );


        /*
           FINAL
        */

        textoFinal.textContent =
            "";


        /*
           TULIPANES
        */

        grupoTulipanes.classList.remove(
            "tulipanes-visibles"
        );


        grupoTulipanes.classList.add(
            "tulipanes-ocultos"
        );


        /*
           PÉTALOS
        */

        petalos.classList.remove(
            "activos"
        );


        petalos.classList.remove(
            "petalos-desaparecer"
        );


        /*
           PARTÍCULAS
        */

        particulasDetalle.classList.remove(
            "particulas-desaparecer"
        );


        /*
           ILUMINACIÓN
        */

        luzPresentacion.classList.remove(
            "final-suave"
        );


        /*
           CORAZÓN
        */

        corazonFinal.classList.remove(
            "mostrar-final"
        );


        corazonFinal.classList.add(
            "oculto-final"
        );


        /*
           FIRMA
        */

        firmaFinal.classList.remove(
            "mostrar-final"
        );


        firmaFinal.classList.add(
            "oculto-final"
        );


        /*
           DESTELLO
        */

        nombreCesar.classList.remove(
            "destello"
        );


        /*
           LÍNEA
        */

        lineaFirma.classList.remove(
            "dibujar"
        );


        /*
           BOTÓN
        */

        btnVolver.classList.remove(
            "mostrar-final"
        );


        btnVolver.classList.add(
            "oculto-final"
        );


        /*
           OCULTAR PRESENTACIÓN
        */

        detalle.classList.add(
            "oculto"
        );


        /*
           REGRESAR PORTADA
        */

        inicio.style.display =
            "flex";


        inicio.classList.remove(
            "desvanecer-inicio"
        );


        document.body.classList.remove(
            "presentacion-activa"
        );


        btnDetalle.disabled =
            false;


        /*
           REPETIR PORTADA
        */

        animarPortada();

    }
);


/* =========================================================
   EVITAR ARRASTRAR IMÁGENES
========================================================= */

const imagenes =
    document.querySelectorAll(
        "img"
    );


imagenes.forEach(
    function (imagen) {

        imagen.addEventListener(
            "dragstart",

            function (evento) {

                evento.preventDefault();

            }
        );

    }
);