export function corners({ x, y, z, macroIterationNumber }) {
  const largest = Math.max(x, y, z);

  this.step = function () {
    this.x = macroIterationNumber % 2 === 0 ? x : -x;
    this.y = macroIterationNumber % 4 > 1 ? y : -y;
    this.z = z;
  };

  this.getNormalisedVector = function () {
    return createVector(this.x / largest, this.y / largest, this.z / largest);
  };
}
