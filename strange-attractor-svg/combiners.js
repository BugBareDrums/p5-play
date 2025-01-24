import { getUiValues, rotateArray } from "./utils";
import { state, constants } from "./state.js";

export function createCombiners() {
  const { golden, numberOfCombiners, baseAmplitude } = constants;
  const uiValues = getUiValues();
  chen1 = new chen({
    xx: 0.11 + state.macroIterationNumber * -0.1,
    yy: 0.2 + state.macroIterationNumber * -0.1,
    zz: -16 + state.macroIterationNumber * -0.2,
    a: -10.1 + state.macroIterationNumber * -0.3,
    b: -4.1 + state.macroIterationNumber * -0.1,
    c: 18.1 + state.macroIterationNumber * -0.1,
    dt: 0.008 + state.macroIterationNumber * -0.0001,
  });

  chen2 = new chen({
    xx: 0.1,
    yy: 0.33 + state.macroIterationNumber * 0.01,
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
    0.003 * state.macroIterationNumber,
  ]);
  //const lorenz1 = createAttractorStepper("Lorenz");
  const perlin1 = new perlin({ dr: 0.001 + state.macroIterationNumber * 0.01 });

  const corners1 = new corners({
    x: 10,
    y: 10,
    z: 1,
    macroIterationNumber: state.macroIterationNumber,
  });

  const lines = new lineScan({
    length: 100,
    gap: 5,
    stepSize: 1,
    zStepSize: 1,
    skipCount: numberOfIterations,
  });

  const amplitude = baseAmplitude * golden ** state.macroIterationNumber;
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
