export const constants = {
  attractorName: "gcode-magic",
  golden: (1 + Math.sqrt(5)) / 2,
  numberOfCombiners: 1,
  refreshRate: 100,
  maxIterations: 100 * 20,
  beginAtIteration: 0,
  baseWidth: 5,
  baseAmplitude: 0.5,
  macroIterationRotation: 0,
  iterationRotation: 0,
  xyRotation: 0,
  onOffRate: 10,
  onOffOffset: 0,
  onRatio: 1,
};

export const state = {
  combiners: [],
  allPoints: [],
  numberOfIterations: 0,
  vectorWindows: [],
  save: true,
  macroIterationNumber: 0,
};

for (let i = 0; i < constants.numberOfCombiners; i++) {
  state.allPoints.push([]);
}
