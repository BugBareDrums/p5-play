let combiner1;
let save = true;
const attractorName = "balanced";

let numberOfIterations = 0;
const refreshRate = 12000000;
let maxIterations = refreshRate * 35;
let beginAtIteration = 0;
const baseWidth = 20;
const macroIterationRotation = 60;
const iterationRotation = -0.1;

const onOffRate = 230;
const onOffOffset = 0;
const onRatio = 0.3;

const allPoints = [];

function setup() {
  createCanvas(1000, 1000);
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
    xx: 0.11 + macroIterationNumber * 0.1,
    yy: 0.2 + macroIterationNumber * 0.1,
    zz: -16 + macroIterationNumber * 0.1,
    a: -10.1 + macroIterationNumber * 0.3,
    b: -4.1 + macroIterationNumber * 0.1,
    c: 18.1 + macroIterationNumber * 0.1,
    dt: 0.008 + macroIterationNumber * 0.0001,
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

  const baseDr = 0.1;
  circle1 = new circ({
    dr: baseDr,
  });
  circle2 = new circ({
    dr: baseDr / 1.1,
  });
  circle3 = new circ({
    dr: baseDr / 2.2,
  });
  circle4 = new circ({
    dr: baseDr / 3.3,
  });
  circle5 = new circ({
    dr: baseDr / 4.4,
  });

  rect = new rectangle({
    height: 100,
    width: 100,
    stepSize: 1,
  });

  const perlin1 = new perlin({ dr: 0.001 + macroIterationNumber * 0.001 });

  return new combiner({
    steppers: [chen1],
    amplitudes: [0.8, 1, 0.1, 1, 1, 1, 1, 1],
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
    flipEvery: 1,
  });
}

function draw() {
  const macroIterationNumber = Math.floor(numberOfIterations / refreshRate) + 1;
  if (numberOfIterations % refreshRate === 0) {
    combiner1 = createCombiner(macroIterationNumber);
  }
  combiner1.step();

  numberOfIterations++;

  if (numberOfIterations < 4 || numberOfIterations < beginAtIteration) {
    return;
  }

  if (numberOfIterations > maxIterations) {
    noLoop();
  }

  combiner1.show();
}
