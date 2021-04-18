var ciudades = [];
var totalCiudades = 0;
var tamañoPoblacion = 10;
var poblacion = [];
var fitness = [];
var record = Infinity;
var mejor;
var mejorActual;
let bg;

function setup() {
  createCanvas(350, 700);
  bg = loadImage('mapa.png');
  var orden = [];
  //Se genera las posiciones de las diferentes "ciudades de manera aleatoria" 
  for (let i = 0; i < totalCiudades; i++) {
    var v = createVector(random(width), random(height / 2));
    ciudades.push(v);
    orden.push(i);
  }
  //Se crea la poblacion inicial con orden aleatorio
  for (let i = 0; i < tamañoPoblacion; i++) {
    poblacion.push(shuffle(orden));
  }
}

//Crear nuevo punto(ciudad) en donde se haya dado click
function mouseClicked() {
  if (mouseX < 350 && mouseY < 350) {
    ciudades.push(createVector(mouseX, mouseY));
    record = Infinity;
    let orden = ciudades.map((val, idx) => val = idx);
    poblacion = [];
    for (let i = 0; i < tamañoPoblacion; i++) {
      poblacion.push(shuffle(orden));
    }
  }
  // anula el click listener
  return false;
}

function draw() {
  background(bg);

  //Algoritmo Genetico
  calcFitness();
  normalizarFitness();
  siguienteGeneracion();
  //Dibujar numeros de cada ciudad
  stroke(255, 0, 0);
  strokeWeight(1);
  fill(255, 0, 0);
  beginShape();
  textSize(32);
  ciudades.forEach((val, idx) => {
    text(String.fromCharCode(idx + 65), val.x, val.y < 32 ? val.y + 42 : val.y-10);
  });
  endShape();
  //Dibujar la mejor opcion
  stroke(1);
  strokeWeight(4);
  noFill();
  beginShape();
  mejor.forEach(val=>{
    vertex(ciudades[val].x, ciudades[val].y);
    ellipse(ciudades[val].x, ciudades[val].y, 16, 16);
  });
  endShape();

  //Dibujar la opcion actual
  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  mejorActual.forEach(val=>{
    vertex(ciudades[val].x, ciudades[val].y);
    ellipse(ciudades[val].x, ciudades[val].y, 8, 8);
  });
  endShape();
}

//Intercambiar dos valores dentro de un arreglo
function intercambiar(arr, a, b) {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

//Calcular la distancia entre las ciudades segun un orden (el de la poblacion)
function calcDistancia(puntos, orden) {
  var sum = 0;
  for (let i = 0; i < orden.length - 1; i++) {
    var cityAIdx = orden[i];
    var cityA = puntos[cityAIdx];
    var cityBIdx = orden[i + 1];
    var cityB = puntos[cityBIdx];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}