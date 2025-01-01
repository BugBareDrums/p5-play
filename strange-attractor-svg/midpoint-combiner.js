const onOffRate = 100;
const onOffOffset = 0;
const onRatio = 1;

function combiner({
  steppers,
  colour,
  baseWidth,
  amplitudes,
  rotations,
  offsets,
  macroIterationRotation = 0,
}) {
  this.steppers = steppers;

  this.vectorWindow = [];

  this.step = function () {
    this.steppers.forEach((stepper) => {
      stepper.step();
    });

    const last = this.combination();

    const macroIterationNumber =
      Math.floor(numberOfIterations / refreshRate) + 1;

    rotateAngleRadians = macroIterationRotation * (PI / 180);

    const rotate3dVectorDegrees = createVector(0, 0, 0);

    // rotate last by rotate3dVectorDegrees
    last.x =
      last.x * cos(rotate3dVectorDegrees.x * (PI / 180)) -
      last.y * sin(rotate3dVectorDegrees.x * (PI / 180));

    last.y =
      last.x * sin(rotate3dVectorDegrees.y * (PI / 180)) +
      last.y * cos(rotate3dVectorDegrees.y * (PI / 180));

    last.z =
      last.z * cos(rotate3dVectorDegrees.z * (PI / 180)) -
      last.x * sin(rotate3dVectorDegrees.z * (PI / 180));

    const rotated = createVector(
      last.x * cos(rotateAngleRadians * macroIterationNumber) -
        last.y * sin(rotateAngleRadians * macroIterationNumber),
      last.x * sin(rotateAngleRadians * macroIterationNumber) +
        last.y * cos(rotateAngleRadians * macroIterationNumber),
      last.z
    );

    const iterationRotationRadians =
      numberOfIterations * iterationRotation * (PI / 180);

    // rotate by iteration rotation
    rotated.x =
      rotated.x * cos(iterationRotationRadians) -
      rotated.y * sin(iterationRotationRadians);
    rotated.y =
      rotated.x * sin(iterationRotationRadians) +
      rotated.y * cos(iterationRotationRadians);

    // // flip x every 1 iterations
    // rotated.x = rotated.x * (-1 + 2 * (macroIterationNumber % 2));

    // // flip y half the time, half the speed of x
    // rotated.y = rotated.y * (-1 + 2 * ((macroIterationNumber + 1) % 4 > 1));

    allPoints.push(rotated);
    this.vectorWindow.push(rotated);

    if (this.vectorWindow.length > 4) {
      this.vectorWindow.shift();
    }
  };

  this.combination = function () {
    const normalised = this.steppers.map((stepper) =>
      stepper.getNormalisedVector()
    );

    // rotate all vectors
    const rotated = normalised.map((vector, index) => {
      const angle = rotations[index];
      return createVector(
        vector.x * cos(angle) - vector.y * sin(angle),
        vector.x * sin(angle) + vector.y * cos(angle),
        vector.z
      );
    });

    // offset all vectors
    rotated.forEach((vector, index) => {
      vector.x += offsets[index].x;
      vector.y += offsets[index].y;
      vector.z += offsets[index].z;
    });

    // find midpoint of all vectors
    const midpoint = rotated.reduce(
      (acc, vector, index) => acc.add(vector.mult(amplitudes[index] ?? 1)),
      createVector(0, 0, 0)
    );
    midpoint.div(rotated.length);

    return midpoint;
  };

  this.show = function () {
    if ((numberOfIterations + onOffOffset) % onOffRate > onOffRate * onRatio) {
      return;
    }

    if (this.vectorWindow.length < 4) {
      return;
    }

    noFill();

    let weight = ((this.vectorWindow[0].z + 0.3) / 2) * baseWidth;

    const mapToScreen = (value, dimension) => (value + 1) * (dimension / 2);

    const w = this.vectorWindow;

    stroke(colour);
    // strokeWeight(weight < 1 ? 1 : weight);
    strokeWeight(weight);

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
