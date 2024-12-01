function combiner({
  steppers,
  colour,
  baseWidth,
  amplitudes,
  rotations,
  offsets,
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

    const rotateAngle = 10;
    rotateAngleRadians = rotateAngle * (PI / 180);

    // rotate last by angle * macroIterationNumber
    const rotated = createVector(
      last.x * cos(rotateAngleRadians * macroIterationNumber) -
        last.y * sin(rotateAngleRadians * macroIterationNumber),
      last.x * sin(rotateAngleRadians * macroIterationNumber) +
        last.y * cos(rotateAngleRadians * macroIterationNumber),
      last.z
    );

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
      const angleRadians = angle * (PI / 180);
      return createVector(
        vector.x * cos(angleRadians) - vector.y * sin(angleRadians),
        vector.x * sin(angleRadians) + vector.y * cos(angleRadians),
        vector.z
      );
    });

    // offset all vectors
    rotated.forEach((vector, index) => {
      vector.x += offsets[index].x;
      vector.y += offsets[index].y;
      vector.z += offsets[index].z;
    });

    // multiply all vectors together
    return rotated.reduce((acc, vector, index) => {
      return createVector(
        acc.x * vector.x * amplitudes[index],
        acc.y * vector.y * amplitudes[index],
        acc.z * vector.z * amplitudes[index]
      );
    }, createVector(1, 1, 1));
  };

  this.show = function () {
    // if ((numberOfIterations + onOffOffset) % onOffRate > onOffRate * onRatio) {
    //   return;
    // }

    if (this.vectorWindow.length < 4) {
      return;
    }

    noFill();

    let weight = (this.vectorWindow[0].z + 0.9 / 2) * baseWidth;

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
