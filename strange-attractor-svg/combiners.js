import { getUiValues, rotateArray } from "./utils.js";
import { combiner } from "./midpoint-combiner.js";
import { state, constants } from "./state.js";
import { chen } from "./chen.js";
import { circ } from "./circle.js";
import { rectangle } from "./rectangle.js";
import { createAttractorStepper } from "./attractors.js";
import { perlin } from "./perlin.js";
import { corners } from "./corners.js";
import { lineScan } from "./line-scan.js";

export function createCombiners(p) {
  const {
    golden,
    numberOfCombiners,
    baseAmplitude,
    macroIterationRotation,
    xyRotation,
    iterationRotation,
  } = constants;
  const uiValues = getUiValues();
  const chen1 = new chen({
    xx: 0.11 + state.macroIterationNumber * -0.1,
    yy: 0.2 + state.macroIterationNumber * -0.1,
    zz: -16 + state.macroIterationNumber * -0.2,
    a: -10.1 + state.macroIterationNumber * -0.3,
    b: -4.1 + state.macroIterationNumber * -0.1,
    c: 18.1 + state.macroIterationNumber * -0.1,
    dt: 0.008 + state.macroIterationNumber * -0.0001,
  });

  const chen2 = new chen({
    xx: 0.1,
    yy: 0.33 + state.macroIterationNumber * 0.01,
    zz: -15.5,
    a: -10,
    b: -4,
    c: 18.1,
    dt: 0.01,
  });

  const baseDr = uiValues.dr * 3;
  const circle1 = new circ({
    dr: baseDr,
  });

  const circle2 = new circ({
    dr: -(baseDr / golden),
  });
  const circle3 = new circ({
    dr: baseDr * golden,
  });
  const circle4 = new circ({
    dr: baseDr / golden / golden,
  });
  const circle5 = new circ({
    dr: -baseDr / 4.4,
  });

  const rect1 = new rectangle({
    height: 10,
    width: 10,
    stepSize: 0.1,
  });

  const rect2 = new rectangle({
    height: 100,
    width: 100,
    stepSize: 0.5,
  });

  const rect3 = new rectangle({
    height: 100,
    width: 100,
    stepSize: 0.25,
  });

  const thomas = createAttractorStepper(
    "Thomas",
    [0.003 * state.macroIterationNumber],
    p
  );
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
    skipCount: state.numberOfIterations,
  });

  const amplitude = baseAmplitude * golden ** state.macroIterationNumber;
  //const amplitude = baseAmplitude;

  const combiners = [];

  const steppers = [lines, thomas];

  for (let i = 0; i < numberOfCombiners; i++) {
    combiners.push(
      new combiner(p, {
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
          p.createVector(0, 0, 0),
          p.createVector(0, 0, 0),
          p.createVector(0, 0, 0),
          p.createVector(0, 0, 0),
          p.createVector(0, 0, 0),
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
