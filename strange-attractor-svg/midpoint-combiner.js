import { state, constants } from "./state.js";

const midpoint = (p, vectors) => {
  let combined = vectors.reduce(
    (acc, vector) => acc.add(vector),
    p.createVector(0, 0, 0)
  );
  combined.div(vectors.length);
  return combined;
};

const multiply = (p, vectors) => {
  let combined = vectors.reduce((acc, vector) => {
    return p.createVector(acc.x * vector.x, acc.y * vector.y, acc.z * vector.z);
  }, p.createVector(1, 1, 1));
  combined.div(vectors.length);
  return combined;
};

export function combiner(
  p,
  {
    steppers,
    amplitudes,
    rotations,
    offsets,

    combinerIndex,
  }
) {
  const {
    macroIterationRotation = 0,
    xyRotation = 0,
    iterationRotation = 0,
  } = constants;

  const vectorWindow = [];

  function step() {
    steppers.forEach((stepper) => stepper.step());
    let vectors = steppers.map((stepper) => stepper.getNormalisedVector());

    const combined = combination(p, vectors);

    state.allPoints[combinerIndex].push(combined);
    vectorWindow.push(combined);

    if (vectorWindow.length > 4) {
      vectorWindow.shift();
    }

    return vectorWindow;
  }

  function combination(p, vectors) {
    if (vectors.some((vector) => vector === undefined)) {
      return undefined;
    }

    vectors = vectors.map((vector, index) =>
      rotateVector2d(p, vector, rotations[index])
    );

    vectors = applyOffsets(p, vectors, offsets);

    vectors = applyAmplitudes(vectors, amplitudes);

    let combinedVector = midpoint(p, vectors);

    combinedVector = rotateAround(
      combinedVector,
      p.createVector(1, 0, 1),
      state.macroIterationNumber * xyRotation
    );

    combinedVector = rotateVector2d(
      p,
      combinedVector,
      state.macroIterationNumber * macroIterationRotation
    );

    combinedVector = rotateVector2d(
      p,
      combinedVector,
      state.numberOfIterations * iterationRotation
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

function applyOffsets(p, vectors, offsets) {
  return vectors.map((vector, index) =>
    p.createVector(
      vector.x + offsets[index].x,
      vector.y + offsets[index].y,
      vector.z + offsets[index].z
    )
  );
}

function rotateVector2d(p, vector, angle) {
  const angleRadians = angle * (Math.PI / 180);

  return p.createVector(
    vector.x * Math.cos(angleRadians) - vector.y * Math.sin(angleRadians),
    vector.x * Math.sin(angleRadians) + vector.y * Math.cos(angleRadians),
    vector.z
  );
}

function rotateVector3d(vector, angles = p.createVector(0, 0, 0)) {
  return p.createVector(
    vector.x * Math.cos(angles.x * (Math.PI / 180)) -
      vector.y * Math.sin(angles.x * (Math.PI / 180)),
    vector.x * Math.sin(angles.y * (Math.PI / 180)) +
      vector.y * Math.cos(angles.y * (Math.PI / 180)),
    vector.z * Math.cos(angles.z * (Math.PI / 180)) -
      vector.x * Math.sin(angles.z * (Math.PI / 180))
  );
}

function rotateAround(vect, axis, angle) {
  // Create copies to avoid modifying original vectors
  let v = vect.copy();
  let a = axis.copy().normalize();

  // Rodrigues rotation formula components
  let cosTheta = Math.cos(angle);
  let sinTheta = Math.sin(angle);

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
