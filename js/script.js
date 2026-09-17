/* =====================================================
   ESPERAR A QUE CARGUE TODO EL HTML
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const portada = document.getElementById("portada");
    const detalle = document.getElementById("detalle");

    const btnIniciar = document.getElementById("btnIniciar");
    const btnVolver = document.getElementById("btnVolver");

    const musica = document.getElementById("musica");

    const textoPortada = document.getElementById("textoPortada");
    const textoIntro = document.getElementById("textoIntro");

    const escenaIntro = document.getElementById("escenaIntro");
    const escenaFoto1 = document.getElementById("escenaFoto1");
    const escenaFoto2 = document.getElementById("escenaFoto2");
    const escenaFoto3 = document.getElementById("escenaFoto3");
    const escenaDistancia = document.getElementById("escenaDistancia");
    const escenaTulipanes = document.getElementById("escenaTulipanes");
    const escenaFinal = document.getElementById("escenaFinal");

    const fraseDistancia = document.getElementById("fraseDistancia");
    const textoFinal = document.getElementById("textoFinal");

    const corazonFinal = document.getElementById("corazonFinal");
    const firma = document.getElementById("firma");
    const luzFinal = document.getElementById("luzFinal");


    /* =====================================================
       TEXTOS
    ====================================================== */

    const mensajePortada =
        "Estas flores son para ti.";

    const mensajeIntro =
        "Algunos momentos merecen quedarse para siempre.";

    const mensajeDistancia =
        "La distancia puede cambiar muchas cosas, pero no las ganas de sorprenderte con un pequeño detalle en un día como hoy. 💛";

    const mensajeFinal =
        "Espero que este pequeño detalle te saque una sonrisa. " +
        "Que nunca te falten motivos para sonreír, momentos bonitos " +
        "para recordar y personas que hagan tus días un poquito más especiales. " +
        "Estas flores amarillas son para ti. 💛";


    /* =====================================================
       TIEMPOS
    ====================================================== */

    const tiempoIntro = 5200;
    const tiempoFoto1 = 6500;
    const tiempoFoto2 = 6500;
    const tiempoFoto3 = 6500;
    const tiempoDistancia = 6500;
    const tiempoTulipanes = 8000;

    const velocidadPortada = 70;
    const velocidadIntro = 60;
    const velocidadFinal = 38;
    const velocidadPalabra = 180;


    /* =====================================================
       ESTADO
    ====================================================== */

    let presentacionIniciada = false;
    let pausado = false;

    let tareas = [];

    let posicionIntro = 0;
    let escribiendoIntro = false;

    let posicionFinal = 0;
    let escribiendoFinal = false;

    let indicePalabra = 0;
    let escribiendoDistancia = false;

    let intervaloPortada = null;


    /* =====================================================
       TEXTO PORTADA
    ====================================================== */

    function escribirPortada() {

        textoPortada.textContent = "";

        let posicion = 0;

        clearInterval(intervaloPortada);

        intervaloPortada = setInterval(function () {

            if (posicion < mensajePortada.length) {

                textoPortada.textContent +=
                    mensajePortada.charAt(posicion);

                posicion++;

            } else {

                clearInterval(intervaloPortada);
            }

        }, velocidadPortada);
    }


    /* =====================================================
       PROGRAMADOR DE TAREAS
    ====================================================== */

    function esperar(funcion, tiempo) {

        const tarea = {

            funcion: funcion,
            restante: tiempo,
            inicio: Date.now(),
            id: null,
            terminada: false

        };

        tarea.id = setTimeout(function () {

            tarea.terminada = true;
            funcion();

        }, tiempo);

        tareas.push(tarea);

        return tarea;
    }


    /* =====================================================
       PAUSAR TAREAS
    ====================================================== */

    function pausarTareas() {

        const ahora = Date.now();

        tareas.forEach(function (tarea) {

            if (!tarea.terminada && tarea.id !== null) {

                clearTimeout(tarea.id);

                const transcurrido =
                    ahora - tarea.inicio;

                tarea.restante =
                    Math.max(
                        0,
                        tarea.restante - transcurrido
                    );

                tarea.id = null;
            }
        });
    }


    /* =====================================================
       REANUDAR TAREAS
    ====================================================== */

    function reanudarTareas() {

        tareas.forEach(function (tarea) {

            if (!tarea.terminada && tarea.id === null) {

                tarea.inicio = Date.now();

                tarea.id = setTimeout(function () {

                    tarea.terminada = true;
                    tarea.funcion();

                }, tarea.restante);
            }
        });
    }


    /* =====================================================
       CANCELAR TAREAS
    ====================================================== */

    function cancelarTareas() {

        tareas.forEach(function (tarea) {

            if (tarea.id !== null) {

                clearTimeout(tarea.id);
            }
        });

        tareas = [];
    }


    /* =====================================================
       MOSTRAR ESCENA
    ====================================================== */

    function mostrarEscena(escena) {

        if (!escena) {
            return;
        }

        document
            .querySelectorAll(".escena")
            .forEach(function (elemento) {

                elemento.classList.remove("activa");

            });

        escena.classList.add("activa");
    }


    /* =====================================================
       TEXTO INTRO
    ====================================================== */

    function iniciarTextoIntro() {

        textoIntro.textContent = "";

        posicionIntro = 0;
        escribiendoIntro = true;

        escribirSiguienteIntro();
    }


    function escribirSiguienteIntro() {

        if (!escribiendoIntro || pausado) {
            return;
        }

        if (posicionIntro < mensajeIntro.length) {

            textoIntro.textContent +=
                mensajeIntro.charAt(posicionIntro);

            posicionIntro++;

            esperar(
                escribirSiguienteIntro,
                velocidadIntro
            );

        } else {

            escribiendoIntro = false;
        }
    }


    /* =====================================================
       FRASE DE DISTANCIA
    ====================================================== */

    function prepararFraseDistancia() {

        fraseDistancia.innerHTML = "";

        const palabras =
            mensajeDistancia.split(" ");

        palabras.forEach(function (palabra) {

            const span =
                document.createElement("span");

            span.className =
                "palabra-distancia";

            span.textContent = palabra;

            fraseDistancia.appendChild(span);

            fraseDistancia.appendChild(
                document.createTextNode(" ")
            );
        });

        indicePalabra = 0;
        escribiendoDistancia = true;

        mostrarSiguientePalabra();
    }


    function mostrarSiguientePalabra() {

        if (!escribiendoDistancia || pausado) {
            return;
        }

        const palabras =
            fraseDistancia.querySelectorAll(
                ".palabra-distancia"
            );

        if (indicePalabra < palabras.length) {

            palabras[indicePalabra]
                .classList.add("visible");

            indicePalabra++;

            esperar(
                mostrarSiguientePalabra,
                velocidadPalabra
            );

        } else {

            escribiendoDistancia = false;
        }
    }


    /* =====================================================
       TEXTO FINAL
    ====================================================== */

    function iniciarTextoFinal() {

        textoFinal.textContent = "";

        posicionFinal = 0;
        escribiendoFinal = true;

        escribirSiguienteFinal();
    }


    function escribirSiguienteFinal() {

        if (!escribiendoFinal || pausado) {
            return;
        }

        if (posicionFinal < mensajeFinal.length) {

            textoFinal.textContent +=
                mensajeFinal.charAt(posicionFinal);

            posicionFinal++;

            esperar(
                escribirSiguienteFinal,
                velocidadFinal
            );

        } else {

            escribiendoFinal = false;

            mostrarElementosFinales();
        }
    }


    /* =====================================================
       ELEMENTOS FINALES
    ====================================================== */

    function mostrarElementosFinales() {

        esperar(function () {

            corazonFinal.classList.add("visible");

        }, 450);


        esperar(function () {

            firma.classList.add("visible");

        }, 1100);


        esperar(function () {

            btnVolver.classList.add("visible");

        }, 1900);


        esperar(function () {

            luzFinal.classList.add("visible");

        }, 2200);


        esperar(function () {

            bajarMusica();

        }, 5900);
    }


    /* =====================================================
       BAJAR MÚSICA
    ====================================================== */

    function bajarMusica() {

        const volumenInicial = musica.volume;
        const pasos = 20;

        let paso = 0;

        function reducir() {

            if (pausado) {
                return;
            }

            paso++;

            musica.volume =
                Math.max(
                    0,
                    volumenInicial *
                    (1 - paso / pasos)
                );

            if (paso < pasos) {

                esperar(reducir, 100);

            } else {

                musica.pause();
                musica.volume = 0.38;
            }
        }

        reducir();
    }


    /* =====================================================
       INICIAR PRESENTACIÓN
    ====================================================== */

    function iniciarPresentacion() {

        cancelarTareas();

        presentacionIniciada = true;
        pausado = false;

        detalle.classList.remove("pausado");

        portada.classList.add("oculta");
        detalle.classList.add("visible");


        /* MÚSICA */

        musica.pause();
        musica.currentTime = 0;
        musica.volume = 0.38;

        musica.play().catch(function () {

            console.log(
                "La música no pudo reproducirse."
            );
        });


        /* INTRO */

        mostrarEscena(escenaIntro);

        iniciarTextoIntro();


        /* FOTO 1 */

        esperar(function () {

            mostrarEscena(escenaFoto1);

        }, tiempoIntro);


        /* FOTO 2 - NUEVA */

        esperar(function () {

            mostrarEscena(escenaFoto2);

        },
        tiempoIntro +
        tiempoFoto1);


        /* FOTO 3 */

        esperar(function () {

            mostrarEscena(escenaFoto3);

        },
        tiempoIntro +
        tiempoFoto1 +
        tiempoFoto2);


        /* FRASE DE DISTANCIA */

        esperar(function () {

            mostrarEscena(
                escenaDistancia
            );

            prepararFraseDistancia();

        },
        tiempoIntro +
        tiempoFoto1 +
        tiempoFoto2 +
        tiempoFoto3);


        /* TULIPANES */

        esperar(function () {

            mostrarEscena(
                escenaTulipanes
            );

        },
        tiempoIntro +
        tiempoFoto1 +
        tiempoFoto2 +
        tiempoFoto3 +
        tiempoDistancia);


        /* FINAL */

        esperar(function () {

            mostrarEscena(
                escenaFinal
            );

            iniciarTextoFinal();

        },
        tiempoIntro +
        tiempoFoto1 +
        tiempoFoto2 +
        tiempoFoto3 +
        tiempoDistancia +
        tiempoTulipanes);
    }


    /* =====================================================
       PAUSAR PRESENTACIÓN
    ====================================================== */

    function pausarPresentacion() {

        if (!presentacionIniciada || pausado) {
            return;
        }

        pausado = true;

        pausarTareas();

        musica.pause();

        detalle.classList.add("pausado");
    }


    /* =====================================================
       CONTINUAR PRESENTACIÓN
    ====================================================== */

    function continuarPresentacion() {

        if (!presentacionIniciada || !pausado) {
            return;
        }

        pausado = false;

        detalle.classList.remove("pausado");

        musica.play().catch(function () {

            console.log(
                "La música no pudo continuar."
            );
        });

        reanudarTareas();


        /*
           CONTINUAR TEXTOS SI SE PAUSÓ
           MIENTRAS SE ESTABAN ESCRIBIENDO
        */

        if (escribiendoIntro) {

            escribirSiguienteIntro();
        }

        if (escribiendoDistancia) {

            mostrarSiguientePalabra();
        }

        if (escribiendoFinal) {

            escribirSiguienteFinal();
        }
    }


    /* =====================================================
       REINICIAR PRESENTACIÓN
    ====================================================== */

    function reiniciarPresentacion() {

        cancelarTareas();

        presentacionIniciada = false;
        pausado = false;

        escribiendoIntro = false;
        escribiendoDistancia = false;
        escribiendoFinal = false;


        /* OCULTAR PRESENTACIÓN */

        detalle.classList.remove(
            "visible",
            "pausado"
        );


        /* MOSTRAR PORTADA */

        portada.classList.remove("oculta");


        /* REINICIAR ESCENAS */

        document
            .querySelectorAll(".escena")
            .forEach(function (escena) {

                escena.classList.remove("activa");

            });

        escenaIntro.classList.add("activa");


        /* LIMPIAR TEXTOS */

        textoIntro.textContent = "";
        textoFinal.textContent = "";
        fraseDistancia.innerHTML = "";


        /* LIMPIAR FINAL */

        corazonFinal.classList.remove("visible");
        firma.classList.remove("visible");
        btnVolver.classList.remove("visible");
        luzFinal.classList.remove("visible");


        /* REINICIAR MÚSICA */

        musica.pause();
        musica.currentTime = 0;
        musica.volume = 0.38;


        /* REINICIAR PORTADA */

        escribirPortada();
    }


    /* =====================================================
       BOTÓN VER DETALLE
    ====================================================== */

    if (btnIniciar) {

        btnIniciar.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();
                evento.stopPropagation();

                iniciarPresentacion();
            }
        );
    }


    /* =====================================================
       BOTÓN VOLVER A VER
    ====================================================== */

    if (btnVolver) {

        btnVolver.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();
                evento.stopPropagation();

                reiniciarPresentacion();
            }
        );
    }


    /* =====================================================
       PAUSA INVISIBLE AL TOCAR LA PRESENTACIÓN
    ====================================================== */

    if (detalle) {

        detalle.addEventListener(
            "click",
            function (evento) {

                if (evento.target.closest("button")) {
                    return;
                }

                if (!presentacionIniciada) {
                    return;
                }

                if (pausado) {

                    continuarPresentacion();

                } else {

                    pausarPresentacion();
                }
            }
        );
    }


    /* =====================================================
       INICIO
    ====================================================== */

    musica.volume = 0.38;

    escribirPortada();

});