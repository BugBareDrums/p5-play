let combiner1;
let save = false;

let numberOfIterations = 0;
const refreshRate = 600;
let maxIterations = refreshRate * 10;
let beginAtIteration = 0;

const onOffRate = 230;
const onOffOffset = 0;
const onRatio = 0.3;

const colours = ["#B9D7D9", "#668284", "#2A2829", "#493736", "#7B3B3B"];
const currentColour = colours[0];

function setup() {
  createCanvas(2000, 2000);
}

function combiner({ steppers, colour, baseWidth }) {
  this.steppers = steppers;

  this.vectorWindow = [];

  this.step = function () {
    this.steppers.forEach((stepper) => {
      stepper.step();
    });

    this.vectorWindow.push(this.combination());

    if (this.vectorWindow.length > 4) {
      this.vectorWindow.shift();
    }
  };

  this.combination = function () {
    const normalised = this.steppers.map((stepper) =>
      stepper.getNormalisedVector()
    );
    return createVector(
      (normalised[1].x * -normalised[2].x + normalised[0].x + normalised[3].x) /
        2,
      (normalised[1].y * -normalised[2].y + normalised[0].y + normalised[3].y) /
        2,
      normalised[0].y * normalised[1].z + normalised[2].x
    );
  };

  this.show = function () {
    if ((numberOfIterations + onOffOffset) % onOffRate > onOffRate * onRatio) {
      return;
    }

    if (this.vectorWindow.length < 4) {
      return;
    }

    noFill();

    let weight = (this.vectorWindow[0].z + 1) * baseWidth * 2;

    const mapToScreen = (value, dimension) => (value + 1) * (dimension / 2);

    const w = this.vectorWindow;

    stroke(colour);
    strokeWeight(weight < 1 ? 1 : weight);

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

    // fill(colour);
    // circle(mapToScreen(w[0].x, width), mapToScreen(w[0].y, height), weight * 3);
  };
}

let points = [];

function createCombiner(macroIterationNumber) {
  chen1 = new chen({
    xx: 0.1,
    yy: 0.32,
    zz: -16,
    a: -10.1 + macroIterationNumber * 0.1,
    b: -4.1,
    c: 18.1,
    dt: 0.004,
  });

  chen2 = new chen({
    xx: 0.1,
    yy: 0.33,
    zz: -15.5,
    a: -10,
    b: -4,
    c: 18.1,
    dt: 0.002,
  });

  circle1 = new circ({
    dr: 0.01 + macroIterationNumber * 0.01,
  });

  rect = new rectangle({
    height: 100,
    width: 100,
    stepSize: 0.1 - macroIterationNumber * 0.001,
  });

  const perlin1 = new perlin({ dr: 0.001 + macroIterationNumber * 0.001 });

  return new combiner({
    steppers: [chen2, chen1, circle1, chen1],
    colour: colours[macroIterationNumber % colours.length],
    // map macroIterationNumber to a greyscale colour
    //colour: color(256 - macroIterationNumber * 25),
    baseWidth: macroIterationNumber,
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
    if (save) {
      saveCanvas(`strange-attractor-2d-${new Date()}`, "png");
    }
  }

  combiner1.show();
}
