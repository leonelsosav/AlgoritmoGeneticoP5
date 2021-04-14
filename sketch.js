var ciudades = [];
var totalCiudades = 10;
var poblacion = [];
var fitness = [];
var record = Infinity;
var mejor;

function setup() {
  createCanvas(600, 600);
  var orden = [];
  for (let i = 0; i < totalCiudades; i++) {
    var v = createVector(random(width), random(height / 2));
    ciudades.push(v);
    orden.push(i);
  }

  for (let i = 0; i < 10; i++) {
    poblacion.push(shuffle(orden));
  }
  

  
}

function draw() {
  background(0);

  //GA
  calcFitness();
  normalizarFitness();
  siguienteGeneracion();

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < mejor.length; i++) {
    var n = mejor[i];
    vertex(ciudades[n].x, ciudades[n].y);
    ellipse(ciudades[n].x, ciudades[n].y, 16, 16);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < mejor.length; i++) {
    var n = mejor[i];
    vertex(ciudades[n].x, ciudades[n].y);
    ellipse(ciudades[n].x, ciudades[n].y, 8, 8);
  }
  endShape();
}

function intercambiar(arr, a, b){
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function calcDistancia(puntos, orden){
  var sum = 0;
  for (let i = 0; i < orden.length-1; i++) {
    var cityAIdx = orden[i];
    var cityA = puntos[cityAIdx];
    var cityBIdx = orden[i+1];
    var cityB = puntos[cityBIdx];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}