let pursuer;
let pursuers = [];
let target;
let sliderVitesseMaxCible;

// Appelé une seule fois après que la page ait été affichée à l'écran

function setup() {
  createCanvas(windowWidth, windowHeight);
  pursuer = new Vehicle(random(width), random(height));

  // on le rajoute au tableau des poursuiveurs
  pursuers.push(pursuer);

  target = new Target(random(width), random(height));
}

let oldMousePos;

function draw() {
  background(0);

  pursuers.forEach(pursuer => {
    // pursuer = le véhicule poursuiveur, il vise un point devant la cible
    let force = pursuer.pursue(target);
    pursuer.applyForce(force);
    // déplacement et dessin du véhicule et de la target
    pursuer.update();
    pursuer.edges();
    pursuer.show();
  })


  let evadeForce = target.evade(pursuers[0]);
  target.applyForce(evadeForce);
  // lorsque la target atteint un bord du canvas elle ré-apparait de l'autre côté
  target.edges();
  target.update();
  target.show();


  /*
  oldMousePos.pos.x = target.pos.x;
  oldMousePos.pos.y = target.pos.y;
  */

}

function mousePressed() {
  let p = new Vehicle(mouseX, mouseY);
  pursuers.push(p);
}
function keyPressed() {
  if (key === 'd') {
    Vehicle.debug = !Vehicle.debug;
  }
}
