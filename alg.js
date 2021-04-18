function calcFitness() {
    var recordActual = Infinity;
    for (let i = 0; i < poblacion.length; i++) {
        var d = calcDistancia(ciudades, poblacion[i]);
        //Si la distancia actual es mejor que el record, actualizar record y el mejor
        if (d < record) {
            record = d;
            mejor = poblacion[i];
            document.getElementById("mejorOrden").innerHTML 
            = `Mejor orden: ${mejor.map(val=>val=String.fromCharCode(val+65)).join(", ")}`;
        }
        if (d < recordActual) {
            recordActual = d;
            mejorActual = poblacion[i];
        }
        fitness[i] = 1 / (d + 1);
    }
}
//Poner todos los valores entre 0 y 1
function normalizarFitness() {
    var sum = 0;
    for (let i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}
//Generar nueva poblacion
function siguienteGeneracion() {
    var poblacionNueva = [];
    for (let i = 0; i < poblacion.length; i++) {
        var ordenA = escogerUno(poblacion, fitness); 
        var ordenB = escogerUno(poblacion, fitness); //obtener una muestra de la poblacion
        var orden = crossOver(ordenA, ordenB); 
        mutar(orden, 0.01);//mutacion aleatoria
        poblacionNueva[i] = orden;
    }
    poblacion = poblacionNueva;//actualizar la poblacion
}
//escoger un valor dentro de la poblacion que es donde la suma del fitness es menor a 0
function escogerUno(list, probs) {
    var idx = 0;
    var r = random(1);

    while (r > 0) {
        r -= probs[idx];
        idx++;
    }
    idx--;
    return list[idx].slice();
}
//Crear la parte de crossing entre 2 elementos de la poblacion
function crossOver(ordenA, ordenB){
    var inicio = floor(random(ordenA.length-1));
    var fin = floor(random(inicio+1, ordenA.length))
    var nuevoOrden = ordenA.slice(inicio, fin);

    for (let i = 0; i < ordenB.length; i++) {
        if(!nuevoOrden.includes(ordenB[i])){
            nuevoOrden.push(ordenB[i]);
        }
    }
    return nuevoOrden;
}

//Mutacion: cambiar 2 valores dentro de un orden(elemento dentro de la poblacion)
function mutar(orden, velMutacion) {
    for (let i = 0; i < totalCiudades; i++) {
        if (random(1) < velMutacion) {
            var idxA = floor(random(orden.length));
            var idxB = floor(random(orden.length));
            intercambiar(orden, idxA, idxB);
        }
    }
}