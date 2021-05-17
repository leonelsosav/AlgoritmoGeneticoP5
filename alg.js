//Se utiliza el algoritmo genético tradicional, es decir, el primero que vimos en clase

function calcFitness() {
    var recordActual = Infinity;
    for (let i = 0; i < poblacion.length; i++) {
        var d = calcDistancia(ciudades, poblacion[i]);
        //Si la distancia actual es mejor que el record, actualizar record y el mejor
        if (d < record) {
            record = d; //El record es un numero entero y que mientras menor sea, mejor resultado es, ya que es la distancia euclidiana entre los puntos de la poblacion evaluada
            mejor = poblacion[i];//Mejor es la salida y se refiere al elemento de la poblacion que dio el mejor resultado que se ha registrado
            document.getElementById("mejorOrden").innerHTML
                = `Mejor orden: ${mejor.map(val => val = String.fromCharCode(val + 65)).join(", ")}`;
        }
        if (d < recordActual) {
            recordActual = d;//Record actual es como el record de arriba pero de la poblacion que se esta evaluando en este momento sin tener en cuenta poblaciones pasadas
            mejorActual = poblacion[i];//Mejor actual es como el de arriba pero de la poblacion que se esta evaluando en este momento sin tener en cuenta poblaciones pasadas
        }
        fitness[i] = 1 / (d + 1);//aqui se genera el fitness de cada elemento de la poblacion
    }
}
//Poner todos los valores entre 0 y 1 del fitness
function normalizarFitness() {
    var sum = fitness.reduce((acc, curr) => acc + curr);
    fitness = fitness.map(val => val / sum);
}
//Generar nueva poblacion con metodos de optimizacion como el crossover y la mutacion y evaluar funcion de parado con el fitness ya normalizado
function siguienteGeneracion() {
    if ((fitness.some(val => val > (1 / tamañoPoblacion * 1.4))) || (numPoblacionesIteradas > limiteIteraciones)) { //funcion de parado, cuando se hayan excedido el numero de iteraciones limite, o cuando se cumpla con la funcion de parado que es 
        //cuando el fitness de un elemento de la poblacion es 40% mayor que el promedio que deberia tener
        hayQueParar = true;
    } else {
        poblacion = poblacion.map(val => {//actualizar la poblacion
            var ordenA = escogerUno(poblacion, fitness);
            var ordenB = escogerUno(poblacion, fitness); //obtener 2 muestras de la poblacion
            var orden = crossOver(ordenA, ordenB); //crossover entre las 2 muestras 
            mutar(orden, 0.01); //mutacion aleatoria
            return orden;
        });
    }
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
function crossOver(ordenA, ordenB) {
    var inicio = floor(random(ordenA.length - 1));
    var fin = floor(random(inicio + 1, ordenA.length))
    var nuevoOrden = ordenA.slice(inicio, fin);
    ordenB.forEach(val => !nuevoOrden.includes(val) && nuevoOrden.push(val));
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