let combiner1;
let save = true;
const attractorName = "balanced";

let numberOfIterations = 0;
const refreshRate = 10000;
let maxIterations = refreshRate * 100;
let beginAtIteration = 0;
const baseWidth = 30;
const macroIterationRotation = 30;
const iterationRotation = 0;

const allPoints = [];

function setup() {
  createCanvas(2000, 2000);
  document.getElementById("save-gcode").addEventListener("click", saveGcode);
  document.getElementById("save-png").addEventListener("click", savePng);
  document.getElementById("stop").addEventListener("click", () => {
    noLoop();
  });
  document.getElementById("start").addEventListener("click", () => {
    loop();
  });
}

function createCombiner(macroIterationNumber) {
  const uiValues = getUiValues();
  chen1 = new chen({
    xx: 0.11 + macroIterationNumber * -0.1,
    yy: 0.2 + macroIterationNumber * -0.1,
    zz: -16 + macroIterationNumber * -0.2,
    a: -10.1 + macroIterationNumber * -0.3,
    b: -4.1 + macroIterationNumber * -0.1,
    c: 18.1 + macroIterationNumber * -0.1,
    dt: 0.008 + macroIterationNumber * -0.0001,
  });

  chen2 = new chen({
    xx: 0.1,
    yy: 0.33 + macroIterationNumber * 0.01,
    zz: -15.5,
    a: -10,
    b: -4,
    c: 18.1,
    dt: 0.01,
  });

  const golden = (1 + Math.sqrt(5)) / 2;

  const baseDr = 0.01;
  circle1 = new circ({
    dr: baseDr,
  });

  circle2 = new circ({
    dr: -(baseDr / golden),
  });
  circle3 = new circ({
    dr: -baseDr * golden,
  });
  circle4 = new circ({
    dr: -baseDr * golden,
  });
  circle5 = new circ({
    dr: -baseDr / 4.4,
  });

  rect1 = new rectangle({
    height: 10,
    width: 10,
    stepSize: 0.1,
  });

  rect2 = new rectangle({
    height: 100,
    width: 100,
    stepSize: 0.5,
  });

  rect3 = new rectangle({
    height: 100,
    width: 100,
    stepSize: 0.25,
  });

  const lorenz = createAttractorStepper("Rossler", [0.1, 0, 0, 0.02]);
  const lorenz1 = createAttractorStepper("Lorenz");
  const perlin1 = new perlin({ dr: 0.001 + macroIterationNumber * 0.001 });

  const corners1 = new corners({ x: 10, y: 10, z: 1, macroIterationNumber });

  return new combiner({
    steppers: [lorenz, circle4],
    amplitudes: [
      1 / golden / golden,
      1,
      1 / (golden * golden),
      2,
      1,
      1,
      1,
      1,
      1,
      1,
    ],
    rotations: [0, 0, 0, 0, 0],
    offsets: [
      createVector(0, 0, 0),
      createVector(0, 0, 0),
      createVector(0, 0, 0),
      createVector(0, 0, 0),
      createVector(0, 0, 0),
    ],
    colour: "#000",
    //colour: color(256 - macroIterationNumber * 25),
    baseWidth,
    macroIterationRotation,
    iterationRotation,
    flipEvery: 1000,
  });
}

function draw() {
  const macroIterationNumber = Math.floor(numberOfIterations / refreshRate) + 1;
  if (numberOfIterations % refreshRate === 0) {
    combiner1 = createCombiner(macroIterationNumber);
  }
  combiner1.step();

  numberOfIterations++;

  if (
    numberOfIterations < 4 ||
    numberOfIterations % refreshRate < beginAtIteration
  ) {
    return;
  }

  if (numberOfIterations > maxIterations) {
    noLoop();
  }

  combiner1.show();
}
