import { normaliseVector } from "../utils.js";

export function lineScan({ length, gap, stepSize, zStepSize, skipCount = 0 }) {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.counter = skipCount;

  this.step = function () {
    this.counter++;
    this.x = (this.counter % length) * stepSize;
    this.y = Math.floor((this.counter * stepSize) / length) * gap;

    this.z = this.y * zStepSize;
  };

  this.getNormalisedVector = function () {
    if (this.x < 1) {
      return undefined;
    }

    return normaliseVector(
      { x: this.x - length / 2, y: this.y - length / 2, z: this.z },
      length
    );
  };
}
