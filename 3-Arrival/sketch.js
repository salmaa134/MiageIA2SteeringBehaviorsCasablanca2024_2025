let target, vehicle;

// Appelée avant de démarrer l'animation
function preload() {
  // en général on charge des images, des fontes de caractères etc.
  font = loadFont('./assets/inconsolata.otf');
}

function setup() {
  createCanvas(800, 800);


  vehicle = new Vehicle(400, 400);

  target = createVector(random(width), random(height));

}


// appelée 60 fois par seconde
function draw() {
  // couleur pour effacer l'écran
  background(0);
  // pour effet psychedelique
  //background(0, 0, 0, 10);

  // Cible qui suit la souris, cercle rouge de rayon 32
  target.x = mouseX;
  target.y = mouseY;

  fill(255, 0, 0);
  noStroke();
  ellipse(target.x, target.y, 32);


  steeringForce = vehicle.arrive(target);

  vehicle.applyForce(steeringForce);
  // On met à jour la position et on dessine le véhicule
  vehicle.update();
  vehicle.show();

  // TODO : remplacer le code suivant pour afficher une suite
  // de véhicules qui se suivent en "mode snake"
  // c'est-à-dire en suivant le véhicule précédent et en
  // s'arrêtant à une distance donnée derrière lui.



}

function keyPressed() {
  if (key === 'd') {
    //Vehicle.debug = !Vehicle.debug;
  } else if(key === 's') {
    //mode = "snake";
  } else if (key === 'i') {
    //mode = "initiales";
  } 
}