function calcFitness(){
    for (let i = 0; i < poblacion.length; i++) {
        var d = calcDistancia(ciudades, poblacion[i]);
        if(d < record) {
          record = d;
          mejor = poblacion[i];
        }
        fitness[i] = 1/(d+1);
      }
}

function normalizarFitness(){
    var sum = 0;
    for (let i = 0; i < poblacion.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i < poblacion.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

function siguienteGeneracion(){
    var poblacionNueva = [];
    
}