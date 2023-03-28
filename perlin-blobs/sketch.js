const distanceFromCenterIncrement = 0.04;
const noisePhaseIncrement = 0.002;

let noisePhase = 0;
let colour = 0;
let distanceFromCenter = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  // noLoop();
}

function draw() {
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(3);

  let travelX = sin(noisePhase) * distanceFromCenter;
  let travelY = cos(noisePhase) * distanceFromCenter;

  drawCircle(colour, travelX, travelY, 30);

  noisePhase += noisePhaseIncrement;
  colour++;
  distanceFromCenter += distanceFromCenterIncrement;
}

function drawCircle(colour, travelX, travelY, size = 150) {
  const noiseMax = 1;

  beginShape();

  stroke(Math.floor((colour / 10) % 2) * 255);

  for (let a = 0; a < TWO_PI; a += 0.02) {
    let x = map(cos(a), -1, 1, 0, noiseMax);
    let y = map(sin(a), -1, 1, 0, noiseMax);
    let sizeVariance = size * 0.8;
    let r = map(
      noise(x + travelX / 30, y + travelY / 30),
      0,
      1,
      size - sizeVariance,
      size + sizeVariance
    );
    r = r * noise(colour / 500);
    let nx = r * cos(a) + travelX;
    let ny = r * sin(a) + travelY;
    vertex(nx, ny);
  }
  endShape();
}
