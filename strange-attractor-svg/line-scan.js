function lineScan({ length, gap, stepSize, zStepSize }) {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.counter = 0;

  this.step = function () {
    this.counter++;
    this.x = (this.counter % length) * stepSize;
    this.y = Math.floor((this.counter * stepSize) / length) * gap;

    this.z = this.y * zStepSize;
  };

  this.getNormalisedVector = function () {
    if (this.x < 2 || this.x > length - 2) {
      return undefined;
    }

    return normaliseVector(
      createVector(this.x - length / 2, this.y - length / 2, this.z),
      length
    );
  };
}
