import { state, constants } from "./state.js";

export function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function savePng(p) {
  p.saveCanvas(`${constants.attractorName}-${new Date()}`, "png");
}

export function saveGcode() {
  if (!state.save) return;

  const points = state.allPoints[0].map((point) =>
    point ? { x: point.x, y: point.y, z: point.z } : undefined
  );

  fetch("http://localhost:4004/vector", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      outputBounds: {
        x: { min: 0, max: 300 },
        y: { min: 0, max: 300 },
        z: { min: -2, max: 0 },
      },
      vectors: points,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      download(
        `${constants.attractorName}strange-attractor-2d-${new Date()}.gcode`,
        response
      );
    });
}

export function getUiValues() {
  const values = {};
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
}

export function rotateArray(arr, k) {
  let copy = arr.slice();
  for (let i = 0; i < k; i++) {
    copy.unshift(copy.pop());
  }

  return copy;
}

export function normaliseVector(v, max) {
  const normalise = (v) => v / max;
  return {
    x: normalise(v.x),
    y: normalise(v.y),
    z: normalise((v.z + max) / 2),
  };
}
