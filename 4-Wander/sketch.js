let vehicles = [];
let imageFusee;
let debugCheckbox;

function preload() {
  // on charge une image de fusée pour le vaisseau
  imageFusee = loadImage('./assets/vehicule.png');
}

function setup() {
  createCanvas(1000, 800);

  const nbVehicles = 10;
  for(let i=0; i < nbVehicles; i++) {
    let vehicle = new Vehicle(100, 100, imageFusee);
    vehicles.push(vehicle);
  }
}



// appelée 60 fois par seconde
function draw() {
  background(0);
  //background(0, 0, 0, 20);

  vehicles.forEach(vehicle => {
    vehicle.applyBehaviors();

    vehicle.update();
    vehicle.show();
    vehicle.edges();
  });
}

function keyPressed() {
  if (key === 'd') {
    Vehicle.debug = !Vehicle.debug;
    // changer la checkbox, elle doit être checkée si debug est true
    debugCheckbox.checked(Vehicle.debug);
  }
}
