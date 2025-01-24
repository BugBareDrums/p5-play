let combiners;
let save = true;
const attractorName = "gcode-magic";

const golden = (1 + Math.sqrt(5)) / 2;

const numberOfCombiners = 1;
let numberOfIterations = 0;
const refreshRate = 100;
let maxIterations = refreshRate * 20;
let beginAtIteration = 0;
const baseWidth = 5;
const baseAmplitude = 0.5;
const macroIterationRotation = 0;
const iterationRotation = 0;

const xyRotation = 0;

const onOffRate = 10;
const onOffOffset = 0;
const onRatio = 1;

const allPoints = [];

for (let i = 0; i < numberOfCombiners; i++) {
  allPoints.push([]);
}

const rotateArray = function (arr, k) {
  let copy = arr.slice();
  for (let i = 0; i < k; i++) {
    copy.unshift(copy.pop());
  }

  return copy;
};

function setup() {
  createCanvas(3000, 3000);
  document.getElementById("save-gcode").addEventListener("click", saveGcode);
  document.getElementById("save-png").addEventListener("click", savePng);
  document.getElementById("stop").addEventListener("click", () => {
    noLoop();
  });
  document.getElementById("start").addEventListener("click", () => {
    loop();
  });
  document.getElementById("reset").addEventListener("click", () => {
    numberOfIterations = 0;
    allPoints.length = 0;
    loop();
  });
}

function createCombiners(macroIterationNumber) {
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

  const baseDr = uiValues.dr * 3;
  circle1 = new circ({
    dr: baseDr,
  });

  circle2 = new circ({
    dr: -(baseDr / golden),
  });
  circle3 = new circ({
    dr: baseDr * golden,
  });
  circle4 = new circ({
    dr: baseDr / golden / golden,
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

  const thomas = createAttractorStepper("Thomas", [
    0.003 * macroIterationNumber,
  ]);
  //const lorenz1 = createAttractorStepper("Lorenz");
  const perlin1 = new perlin({ dr: 0.001 + macroIterationNumber * 0.01 });

  const corners1 = new corners({ x: 10, y: 10, z: 1, macroIterationNumber });

  const lines = new lineScan({
    length: 100,
    gap: 5,
    stepSize: 1,
    zStepSize: 1,
    skipCount: numberOfIterations,
  });

  const amplitude = baseAmplitude * golden ** macroIterationNumber;
  //const amplitude = baseAmplitude;

  const combiners = [];

  const steppers = [lines, thomas];

  for (let i = 0; i < numberOfCombiners; i++) {
    combiners.push(
      new combiner({
        steppers: rotateArray(steppers, i),
        amplitudes: [
          2,
          0.04,
          amplitude / golden / golden,
          amplitude / golden / golden / golden,
          amplitude / golden / golden / golden / golden,
        ],
        rotations: [0, 0, 0, 0, 0],
        offsets: [
          createVector(0, 0, 0),
          createVector(0, 0, 0),
          createVector(0, 0, 0),
          createVector(0, 0, 0),
          createVector(0, 0, 0),
        ],
        macroIterationRotation,
        xyRotation,
        iterationRotation,
        flipEvery: 1000,
        combinerIndex: i,
      })
    );
  }

  return combiners;
}

function draw() {
  const macroIterationNumber = Math.floor(numberOfIterations / refreshRate) + 1;

  if (numberOfIterations % refreshRate === 0) {
    combiners = createCombiners(macroIterationNumber);
  }
  var vectorWindows = combiners.map((c) => c.step());

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

  for (const vectorWindow of vectorWindows) {
    show(vectorWindow);
  }
}

function show(vectorWindow) {
  noFill();
  if ((numberOfIterations + onOffOffset) % onOffRate > onOffRate * onRatio) {
    return;
  }

  if (
    vectorWindow.some((vector) => vector === undefined) ||
    vectorWindow.length < 4
  ) {
    return;
  }

  let weight = vectorWindow[0].z * baseWidth;
  if (weight < 0) {
    return;
  }

  strokeWeight(weight);

  const mapToScreen = (value, dimension) => (value + 1) * (dimension / 2);

  const w = vectorWindow;

  stroke("#000");

  curve(
    mapToScreen(w[0].x, width),
    mapToScreen(w[0].y, height),
    mapToScreen(w[1].x, width),
    mapToScreen(w[1].y, height),
    mapToScreen(w[2].x, width),
    mapToScreen(w[2].y, height),
    mapToScreen(w[3].x, width),
    mapToScreen(w[3].y, height)
  );
}
