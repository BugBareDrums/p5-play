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
  xyRotation = 0,
  iterationRotation = 0,
  combinerIndex,
}) {
  const vectorWindow = [];

  function step() {
    steppers.forEach((stepper) => stepper.step());
    let vectors = steppers.map((stepper) => stepper.getNormalisedVector());

    const combined = combination(vectors);

    allPoints[combinerIndex].push(combined);
    vectorWindow.push(combined);

    if (vectorWindow.length > 4) {
      vectorWindow.shift();
    }

    return vectorWindow;
  }

  function combination(vectors) {
    if (vectors.some((vector) => vector === undefined)) {
      console.log("undefined vector");
      return undefined;
    }

    vectors = vectors.map((vector, index) =>
      rotateVector2d(vector, rotations[index])
    );

    vectors = applyOffsets(vectors, offsets);

    vectors = applyAmplitudes(vectors, amplitudes);

    let combinedVector = midpoint(vectors);

    combinedVector = rotateAround(
      combinedVector,
      createVector(1, 0, 1),
      macroIterationNumber * xyRotation
    );

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

function rotateAround(vect, axis, angle) {
  // Create copies to avoid modifying original vectors
  let v = vect.copy();
  let a = axis.copy().normalize();

  // Rodrigues rotation formula components
  let cosTheta = cos(angle);
  let sinTheta = sin(angle);

  // First term: v * cos(θ)
  let term1 = v.copy().mult(cosTheta);

  // Second term: (axis × v) * sin(θ)
  let term2 = a.copy().cross(v).mult(sinTheta);

  // Third term: axis * (axis · v) * (1 - cos(θ))
  let term3 = a
    .copy()
    .mult(a.dot(v))
    .mult(1 - cosTheta);

  // Combine all terms
  return term1.add(term2).add(term3);
}
