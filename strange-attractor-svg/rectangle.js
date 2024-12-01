function rectangle({ height, width, stepSize }) {
  this.x = 0 - width / 2;
  this.y = 0 - height / 2;
  this.z = 1;
  this.counter = 0;
  const edgeSize = height * 2 + width * 2;

  this.step = function () {
    this.counter++;
    const edgePoint = this.counter % edgeSize;

    if (edgePoint < width) {
      this.x += stepSize;
    } else if (edgePoint < width + height) {
      this.y += stepSize;
    } else if (edgePoint < width * 2 + height) {
      this.x -= stepSize;
    } else {
      this.y -= stepSize;
    }
    this.z = this.x + this.y;
  };

  this.getNormalisedVector = function () {
    return normaliseVector(
      createVector(this.x * 2, this.y * 2, this.z * 2),
      Math.max(width, height)
    );
  };
}
