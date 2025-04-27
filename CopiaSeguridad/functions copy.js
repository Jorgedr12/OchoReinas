var contador = 0;
var reinaSeleccionada = "reina.png";
var colorAtaque = "#ff0000";
var reinasColocadas = [];


function mostrarReina(celda) {
    const estiloActual = window.getComputedStyle(celda).backgroundImage;
    const fila = celda.parentNode.rowIndex;
    const columna = celda.cellIndex;

    if (estiloActual === "none" || estiloActual === 'url("none")') {
        if (contador >= 8) {
            alert("Ya hay 8 reinas en el tablero.");
            return;
        }

        if (esPosicionSegura(reinasColocadas, fila, columna)) {
            celda.style.backgroundImage = `url('/img/${reinaSeleccionada}')`;
            celda.style.backgroundSize = "contain";
            celda.style.backgroundRepeat = "no-repeat";
            celda.style.backgroundPosition = "center";
            contador++;
            reinasColocadas.push({ fila, columna });
            actualizarTablero();
            desactivarMouseOverEnAtaque(fila, columna);

            if (verificarVictoria()) {
                setTimeout(() => {
                    alert("¡Felicidades! Has colocado las 8 reinas correctamente.");
                }, 100);
            }

        } else {
            alert("Posición no segura. Intenta otra celda.");
        }
    } else {
        celda.style.backgroundImage = "none";
        contador--;
        reinasColocadas = reinasColocadas.filter(q => q.fila !== fila || q.columna !== columna);
        actualizarTablero();
        reactivarMouseOverEnAtaque(fila, columna);
    }
}

function desactivarMouseOverEnAtaque(fila, columna) {
    const tablero = document.getElementById("tablero");
    const colorAtaque = document.getElementById("colorAtaque").value;

    for (let i = 0; i < 8; i++) {
        if (i !== columna) {
            tablero.rows[fila].cells[i].onmouseover = null;
        }
    }

    for (let i = 0; i < 8; i++) {
        if (i !== fila) {
            tablero.rows[i].cells[columna].onmouseover = null;
        }
    }

    for (let i = 1; i < 8; i++) {
        if (fila - i >= 0 && columna - i >= 0) {
            tablero.rows[fila - i].cells[columna - i].onmouseover = null;
        }
        if (fila - i >= 0 && columna + i < 8) {
            tablero.rows[fila - i].cells[columna + i].onmouseover = null;
        }
        if (fila + i < 8 && columna - i >= 0) {
            tablero.rows[fila + i].cells[columna - i].onmouseover = null;
        }
        if (fila + i < 8 && columna + i < 8) {
            tablero.rows[fila + i].cells[columna + i].onmouseover = null;
        }
    }
}

function reactivarMouseOverEnAtaque(fila, columna) {
    const tablero = document.getElementById("tablero");

    for (let i = 0; i < 8; i++) {
        if (i !== columna) {
            tablero.rows[fila].cells[i].onmouseover = function () {
                cambiarColor(this, fila, i);
            };
        }
    }

    for (let i = 0; i < 8; i++) {
        if (i !== fila) {
            tablero.rows[i].cells[columna].onmouseover = function () {
                cambiarColor(this, i, columna);
            };
        }
    }

    for (let i = 1; i < 8; i++) {
        if (fila - i >= 0 && columna - i >= 0) {
            tablero.rows[fila - i].cells[columna - i].onmouseover = function () {
                cambiarColor(this, fila - i, columna - i);
            };
        }
        if (fila - i >= 0 && columna + i < 8) {
            tablero.rows[fila - i].cells[columna + i].onmouseover = function () {
                cambiarColor(this, fila - i, columna + i);
            };
        }
        if (fila + i < 8 && columna - i >= 0) {
            tablero.rows[fila + i].cells[columna - i].onmouseover = function () {
                cambiarColor(this, fila + i, columna - i);
            };
        }
        if (fila + i < 8 && columna + i < 8) {
            tablero.rows[fila + i].cells[columna + i].onmouseover = function () {
                cambiarColor(this, fila + i, columna + i);
            };
        }
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

            // Restablecer el evento onmouseover para todas las celdas
            tablero.rows[fila].cells[columna].onmouseover = function () {
                cambiarColor(this, fila, columna);
            };
        }
    }

    reinasColocadas.forEach(reina => {
        cambiarColor(null, reina.fila, reina.columna);
        desactivarMouseOverEnAtaque(reina.fila, reina.columna);
    });
}

function reiniciarTablero() {
    const tablero = document.getElementById("tablero");
    for (let fila = 0; fila < 8; fila++) {
        for (let columna = 0; columna < 8; columna++) {
            tablero.rows[fila].cells[columna].style.backgroundImage = "none";
            tablero.rows[fila].cells[columna].onmouseover = function () {
                cambiarColor(this, fila, columna);
            };
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
            td.style.backgroundImage = `url('/img/${reinaSeleccionada}')`;
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

        celda.style.backgroundImage = `url('/img/${reinaSeleccionada}')`;
        celda.style.backgroundSize = "contain";
        celda.style.backgroundRepeat = "no-repeat";
        celda.style.backgroundPosition = "center";

        reinasColocadas.push({ fila, columna });
    }

    contador = 8;
    actualizarTablero();
}

function verificarVictoria() {
    if (contador === 8 && reinasColocadas.length === 8) {
        for (let i = 0; i < reinasColocadas.length; i++) {
            const reina = reinasColocadas[i];
            const otrasReinas = reinasColocadas.filter((q, index) => index !== i);

            if (!esPosicionSegura(otrasReinas, reina.fila, reina.columna)) {
                return false;
            }
        }
        return true;
    }
    return false;
}