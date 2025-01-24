import { state, constants } from "./state.js";

export function show(vectorWindow, p) {
  console.log("draw");
  const { onOffRate, onOffOffset, onRatio } = constants;
  const { numberOfIterations } = state;
  p.push();
  p.noFill();
  if ((numberOfIterations + onOffOffset) % onOffRate > onOffRate * onRatio) {
    return;
  }

  if (
    vectorWindow.some((vector) => vector === undefined) ||
    vectorWindow.length < 4
  ) {
    return;
  }

  let weight = vectorWindow[0].z * constants.baseWidth;
  if (weight < 0) {
    return;
  }

  p.strokeWeight(weight);

  const mapToScreen = (value, dimension) => (value + 1) * (dimension / 2);

  const w = vectorWindow;

  p.stroke("#000");

  p.curve(
    mapToScreen(w[0].x, p.width),
    mapToScreen(w[0].y, p.height),
    mapToScreen(w[1].x, p.width),
    mapToScreen(w[1].y, p.height),
    mapToScreen(w[2].x, p.width),
    mapToScreen(w[2].y, p.height),
    mapToScreen(w[3].x, p.width),
    mapToScreen(w[3].y, p.height)
  );

  p.pop();
}
