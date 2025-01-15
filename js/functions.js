//declaración de variables globales
var contador = 0;

function mostrarReina(celda) {
    if (window.getComputedStyle(celda).backgroundImage == "none") {
        if (contador < 8) {
            celda.style = `
                        background-image:URL(./img/reina.png);
                        background-repeat:no-repeat;
                        background-position:center;
                        `;
            contador++;
        }
    } else {
        celda.style = `background-image:none;`;
        contador--;
    }
}

function cambiarColor(r,c){
    var celda = document.getElementById("tablero");
    var r1 = r, c1 = c, r2 = r, c2 = c;
    var r3 = r, c3 = c, r4 = r, c4 = c;

    for (let i = 0; i < array.length; i++) {
        
    }
}