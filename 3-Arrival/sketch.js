let target, vehicle;
let vehicles = [];
let targets = [];
let mode = "snake";

// Appelée avant de démarrer l'animation
function preload() {
  // en général on charge des images, des fontes de caractères etc.
  font = loadFont('./assets/inconsolata.otf');
}

function setup() {
  createCanvas(800, 800);


  target = createVector(random(width), random(height));

  // label, posX, posY, taille, densité de points
  targets = font.textToPoints('EMSI!', 26, 260, 300, { sampleFactor:  0.05 });

  let rayon = 10;
  creerDesVehicules(targets.length, rayon);

}

function creerDesVehicules(nb) {
  for (let i = 0; i < nb; i++) {
    let vehicle = new Vehicle(random(width), random(height));
    // on change le rayon
    vehicle.r = 10;
    vehicles.push(vehicle);
  }
}

// appelée 60 fois par seconde
function draw() {
  // couleur pour effacer l'écran
  background(0);
  // pour effet psychedelique
  //background(0, 0, 0, 10);

  // On dessine les points sur les targets qui forment un texte
  // Draw a dot at each point.
  fill("orange");
  for (let p of targets) {
    circle(p.x, p.y, 10);
  }

  // Cible qui suit la souris, cercle rouge de rayon 32
  target.x = mouseX;
  target.y = mouseY;

  fill(255, 0, 0);
  noStroke();
  ellipse(target.x, target.y, 32);

vehicles.forEach((vehicle, index) => {
  switch(mode) {
    case "snake":
      if(index === 0) {
        // on a le premier véhicule
        // il suite la cible controlée par la souris
        steeringForce = vehicle.arrive(target,0);
      } else {
        let vehiculePrecedent = vehicles[index - 1];
        steeringForce = vehicle.arrive(vehiculePrecedent.pos,10);
      }
      break;
    case "texte":
      // chaque véhicule doit suivre un point de la cible, qui a le 
      // même index que lui
      let targetTexte = createVector(targets[index].x, targets[index].y);
      steeringForce = vehicle.arrive(targetTexte,0);
      break;
  }
  
  vehicle.applyForce(steeringForce);
  // On met à jour la position et on dessine le véhicule
  vehicle.update();
  vehicle.show();

  // TODO : remplacer le code suivant pour afficher une suite
  // de véhicules qui se suivent en "mode snake"
  // c'est-à-dire en suivant le véhicule précédent et en
  // s'arrêtant à une distance donnée derrière lui.
});


}

function keyPressed() {
  if (key === 'd') {
    Vehicle.debug = !Vehicle.debug;
  } else if(key === 's') {
    mode = "snake";
  } else if (key === 't') {
    mode = "texte"
  } 
}