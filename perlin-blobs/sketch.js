const distanceFromCenterIncrement = 0.04;
const noisePhaseIncrement = 0.002;
const noiseMax = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  noLoop();
}

function draw() {
  let noisePhase = 0;
  let colour = 0;
  let distanceFromCenter = 50;
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(3);

  for (let i = 0; i < 10000; i++) {
    stroke(Math.floor((colour / 10) % 2) * 255);

    drawCircle(noisePhase, colour, distanceFromCenter);

    noisePhase += noisePhaseIncrement;
    colour++;
    distanceFromCenter += distanceFromCenterIncrement;
  }
}

function drawCircle(noisePhase, colour, distanceFromCenter) {
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.02) {
    let travelX = sin(noisePhase) * distanceFromCenter;
    let travelY = cos(noisePhase) * distanceFromCenter;
    let x = map(cos(a), -1, 1, 0, noiseMax);
    let y = map(sin(a), -1, 1, 0, noiseMax);
    let r = map(noise(x + travelX / 30, y + travelY / 30), 0, 1, 100, 200);
    r = r * noise(colour / 500);
    let nx = r * cos(a) + travelX;
    let ny = r * sin(a) + travelY;
    vertex(nx, ny);
  }
  endShape();
}
