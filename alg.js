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
    var sum = fitness.reduce((acc, curr) => acc + curr);
    fitness = fitness.map(val => val = val / sum);
}
//Generar nueva poblacion
function siguienteGeneracion() {
    poblacion = poblacion.map(val => {//actualizar la poblacion
        var ordenA = escogerUno(poblacion, fitness); 
        var ordenB = escogerUno(poblacion, fitness); //obtener 2 muestras de la poblacion
        var orden = crossOver(ordenA, ordenB); //crossover entre las 2 muestras 
        mutar(orden, 0.01); //mutacion aleatoria
        return orden;
    });
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
    ordenB.forEach(val=>!nuevoOrden.includes(val) && nuevoOrden.push(val));
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