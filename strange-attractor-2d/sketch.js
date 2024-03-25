let combiner1;
let save = true;

let numberOfIterations = 0;
let maxIterations = 450;
let beginAtIteration = 0;

function setup() {
  createCanvas(6000, 6000);

  chen1 = new chen({
    xx: 0.1,
    yy: 0.32,
    zz: -16,
    a: -10,
    b: -4,
    c: 18.1,
    dt: 0.0082222,
    colour: "black",
  });
  chen2 = new chen({
    xx: 0.14,
    yy: 0.33,
    zz: -15.5,
    a: -10,
    b: -4,
    c: 18.1,
    dt: 0.0103,
    colour: "black",
  });
  circle1 = new circ({
    radiusx: 50.0,
    radiusy: 50.0,
    dr: 0.01,
  });

  rect = new rectangle({
    height: 100,
    width: 100,
    stepSize: 0.1,
  });

  combiner1 = new combiner({
    steppers: [chen1, circle1],
  });
}

function combiner({ steppers }) {
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
      normalised[0].z * normalised[1].y,
      normalised[0].y * normalised[1].z,
      normalised[0].x
    );
  };

  this.show = function () {
    if (this.vectorWindow.length < 4) {
      return;
    }

    stroke("black");
    noFill();

    let weight = (this.vectorWindow[0].z + 1) * 10;

    const mapToScreen = (value, dimension) => (value + 1) * (dimension / 2);
    strokeWeight(weight < 2 ? 2 : weight);

    curve(
      mapToScreen(this.vectorWindow[0].x, width),
      mapToScreen(this.vectorWindow[0].y, height),
      mapToScreen(this.vectorWindow[1].x, width),
      mapToScreen(this.vectorWindow[1].y, height),
      mapToScreen(this.vectorWindow[2].x, width),
      mapToScreen(this.vectorWindow[2].y, height),
      mapToScreen(this.vectorWindow[3].x, width),
      mapToScreen(this.vectorWindow[3].y, height)
    );
  };
}

let points = [];

function draw() {
  // chen1.step();
  // chen2.step();
  // circle1.step();
  // rect.step();
  combiner1.step();

  // vectorWindow1.push(createVector(thing1.x, thing1.y, thing1.z));

  // console.log(vectorWindow1[0].x);
  // vectorWindow1.shift();

  numberOfIterations++;

  if (numberOfIterations < 4 || numberOfIterations < beginAtIteration) {
    return;
  }

  if (numberOfIterations > maxIterations) {
    noLoop();
    if (save) {
      saveCanvas(`strange-attractor-2d-${new Date()}`, "png");
    }
    console.log("done");
  }

  combiner1.show();
  // stroke("black");
  // // line(this.lastX * 10, this.lastY * 10, this.x * 10, this.y * 10);
  // strokeWeight(v.z + 20);
  // set colour to greyscale based on z value
  // stroke(0, 0, 0, (thing1.z + 10) * 40);
  // noFill();

  // let weight = vectorWindow1[0].z + 20;
  // let weight = 1;

  // strokeWeight(weight < 4 ? 4 : weight);
  // curve(
  //   vectorWindow1[0].x * spreadx - 400,
  //   vectorWindow1[0].y * spready - 400,
  //   vectorWindow1[1].y * spready - 400,
  //   vectorWindow1[1].x * spreadx - 400,
  //   vectorWindow1[2].x * spreadx - 400,
  //   vectorWindow1[2].y * spready - 400,
  //   vectorWindow1[3].y * spready - 400,
  //   vectorWindow1[3].x * spreadx - 400
  // );
}
