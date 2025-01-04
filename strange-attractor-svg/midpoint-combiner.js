const midpoint = (vectors) => {
  let combined = vectors.reduce(
    (acc, vector) => acc.add(vector),
    createVector(0, 0, 0)
  );
  combined.div(vectors.length);
  return combined;
};

const multiply = (vectors) => {
  let combined = vectors.reduce((acc, vector) => {
    return createVector(acc.x * vector.x, acc.y * vector.y, acc.z * vector.z);
  }, createVector(1, 1, 1));
  combined.div(vectors.length);
  return combined;
};

function combiner({
  steppers,
  amplitudes,
  rotations,
  offsets,
  macroIterationRotation = 0,
}) {
  const vectorWindow = [];

  function step() {
    steppers.forEach((stepper) => stepper.step());
    let vectors = steppers.map((stepper) => stepper.getNormalisedVector());

    const combined = combination(vectors);

    allPoints.push(combined);
    vectorWindow.push(combined);

    if (vectorWindow.length > 4) {
      vectorWindow.shift();
    }

    return vectorWindow;
  }

  function combination(vectors) {
    vectors = vectors.map((vector, index) =>
      rotateVector2d(vector, rotations[index])
    );

    vectors = applyOffsets(vectors, offsets);

    vectors = applyAmplitudes(vectors, amplitudes);

    let combinedVector = multiply(vectors);

    const macroIterationNumber =
      Math.floor(numberOfIterations / refreshRate) + 1;

    combinedVector = rotateVector3d(combinedVector, {
      x: 0,
      y: 0,
      z: 0,
    });

    combinedVector = rotateVector2d(
      combinedVector,
      macroIterationNumber * macroIterationRotation
    );

    combinedVector = rotateVector2d(
      combinedVector,
      numberOfIterations * iterationRotation
    );

    return combinedVector;
  }

  return {
    step,
  };
}

function applyAmplitudes(vectors, amplitudes) {
  return vectors.map((vector, index) => vector.mult(amplitudes[index] ?? 1));
}

function applyOffsets(vectors, offsets) {
  return vectors.map((vector, index) =>
    createVector(
      vector.x + offsets[index].x,
      vector.y + offsets[index].y,
      vector.z + offsets[index].z
    )
  );
}

function rotateVector2d(vector, angle) {
  const angleRadians = angle * (PI / 180);

  return createVector(
    vector.x * cos(angleRadians) - vector.y * sin(angleRadians),
    vector.x * sin(angleRadians) + vector.y * cos(angleRadians),
    vector.z
  );
}

function rotateVector3d(vector, angles = createVector(0, 0, 0)) {
  return createVector(
    vector.x * cos(angles.x * (PI / 180)) -
      vector.y * sin(angles.x * (PI / 180)),
    vector.x * sin(angles.y * (PI / 180)) +
      vector.y * cos(angles.y * (PI / 180)),
    vector.z * cos(angles.z * (PI / 180)) -
      vector.x * sin(angles.z * (PI / 180))
  );
}
