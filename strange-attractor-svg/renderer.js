import { state, constants } from "./state.js";

// export function show(vectorWindow, p) {
//   p.push();
//   p.translate(vectorWindow.x, vectorWindow.y);

//   const currentPoints = state.allPoints[state.allPoints.length - 1];

//   p.noFill();
//   p.stroke(0);
//   p.strokeWeight(1);

//   for (let i = 0; i < currentPoints.length; i++) {
//     const points = currentPoints[i];

//     p.beginShape();
//     for (let j = 0; j < points.length; j++) {
//       const point = points[j];

//       const shouldDraw =
//         Math.floor(j / constants.onOffRate + constants.onOffOffset) % 2 <
//         constants.onRatio;

//       if (shouldDraw) {
//         p.vertex(
//           (point.x / vectorWindow.width) * p.width,
//           (point.y / vectorWindow.height) * p.height
//         );
//       }
//     }
//     p.endShape();
//   }

//   p.pop();
// }

export function show(vectorWindow, p) {
  console.log("draw");
  p.push();
  noFill();
  if ((numberOfIterations + onOffOffset) % onOffRate > onOffRate * onRatio) {
    return;
  }

  if (
    vectorWindow.some((vector) => vector === undefined) ||
    vectorWindow.length < 4
  ) {
    return;
  }

  let weight = vectorWindow[0].z * baseWidth;
  if (weight < 0) {
    return;
  }

  strokeWeight(weight);

  const mapToScreen = (value, dimension) => (value + 1) * (dimension / 2);

  const w = vectorWindow;

  stroke("#000");

  curve(
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
