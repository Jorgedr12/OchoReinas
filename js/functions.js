// Variables globales
var contador = 0;
var reinaSeleccionada = "reina1.png";
var colorAtaque = "#ff0000";
var reinasColocadas = [];


function mostrarReina(celda) {
    const estiloActual = window.getComputedStyle(celda).backgroundImage;
    const fila = celda.parentNode.rowIndex;
    const columna = celda.cellIndex;

    if (estiloActual === "none" || estiloActual === 'url("none")') {
        if (contador >= 8) {
            alert("No puedes colocar más de 8 reinas");
            return;
        }
        if (esPosicionSegura(reinasColocadas, fila, columna)) {
            celda.style.backgroundImage = `url('./img/${reinaSeleccionada}')`;
            celda.style.backgroundSize = "contain";
            celda.style.backgroundRepeat = "no-repeat";
            celda.style.backgroundPosition = "center";
            contador++;
            reinasColocadas.push({ fila, columna });
            actualizarTablero();
        } else {
            alert("Posición no segura. Intenta otra celda.");
        }
    } else {
        celda.style.backgroundImage = "none";
        contador--;
        reinasColocadas = reinasColocadas.filter(q => q.fila !== fila || q.columna !== columna);
        actualizarTablero();
    }
}

function esPosicionSegura(reinas, r, c) {
    return reinas.every(
        q => q.fila !== r && q.columna !== c && Math.abs(q.fila - r) !== Math.abs(q.columna - c)
    );
}


function cambiarColor(celda, r, c) {
    var colorAtaque = document.getElementById("colorAtaque").value;
    const tablero = document.getElementById("tablero");

    var r1 = r, c1 = c;
    var r2 = r, c2 = c;
    var r3 = r, c3 = c;
    var r4 = r, c4 = c;

    for (let i = 0; i < 8; i++) {
        tablero.rows[r].cells[i].style.backgroundColor = colorAtaque;
        tablero.rows[i].cells[c].style.backgroundColor = colorAtaque;
    }

    for (let i = 0; i < 8; i++) {
        if (++r1 < 8 && ++c1 < 8) {
            tablero.rows[r1].cells[c1].style.backgroundColor = colorAtaque;
        }

        if (--r2 >= 0 && ++c2 < 8) {
            tablero.rows[r2].cells[c2].style.backgroundColor = colorAtaque;
        }

        if (--r3 >= 0 && --c3 >= 0) {
            tablero.rows[r3].cells[c3].style.backgroundColor = colorAtaque;
        }

        if (++r4 < 8 && --c4 >= 0) {
            tablero.rows[r4].cells[c4].style.backgroundColor = colorAtaque;
        }
    }
}


function actualizarTablero() {
    const colorPar = document.getElementById("colorPar").value;
    const colorImpar = document.getElementById("colorImpar").value;
    const tablero = document.getElementById("tablero");

    for (let fila = 0; fila < tablero.rows.length; fila++) {
        for (let columna = 0; columna < tablero.rows[fila].cells.length; columna++) {
            tablero.rows[fila].cells[columna].style.backgroundColor =
                (fila + columna) % 2 === 0 ? colorPar : colorImpar;
        }
    }

    reinasColocadas.forEach(reina => {
        cambiarColor(null, reina.fila, reina.columna);
    });
}

function reiniciarTablero() {
    const tablero = document.getElementById("tablero");
    for (let fila = 0; fila < 8; fila++) {
        for (let columna = 0; columna < 8; columna++) {
            tablero.rows[fila].cells[columna].style.backgroundImage = "none";
        }
    }
    contador = 0;
    reinasColocadas = [];
    actualizarTablero();
}

function cambiarImagenReina(nombreImagen) {
    reinaSeleccionada = nombreImagen;
    document.querySelectorAll("#tablero td").forEach(td => {
        const estiloActual = window.getComputedStyle(td).backgroundImage;
        if (estiloActual !== "none" && estiloActual !== 'url("none")') {
            td.style.backgroundImage = `url('./img/${reinaSeleccionada}')`;
        }
    });
}

function actualizarColorAtaque() {
    colorAtaque = document.getElementById("colorAtaque").value;
    actualizarTablero();
}

function resolverReinas() {
    reiniciarTablero();
    const tablero = document.getElementById("tablero");

    const mezclarArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    let solucion;
    do {
        solucion = Array.from({ length: 8 }, (_, i) => i);
        mezclarArray(solucion);

        let esValida = true;
        for (let i = 0; i < 8 && esValida; i++) {
            for (let j = i + 1; j < 8 && esValida; j++) {
                if (Math.abs(i - j) === Math.abs(solucion[i] - solucion[j])) {
                    esValida = false;
                }
            }
        }
        if (esValida) break;
    } while (true);

    reinasColocadas = [];
    for (let fila = 0; fila < 8; fila++) {
        const columna = solucion[fila];
        const celda = tablero.rows[fila].cells[columna];

        celda.style.backgroundImage = `url('./img/${reinaSeleccionada}')`;
        celda.style.backgroundSize = "contain";
        celda.style.backgroundRepeat = "no-repeat";
        celda.style.backgroundPosition = "center";

        reinasColocadas.push({ fila, columna });
    }

    contador = 8;
    actualizarTablero();
}