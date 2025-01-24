export function circ({ dr }) {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.radians = 0.0;

  this.step = function () {
    this.radians += dr;
    this.x = Math.cos(this.radians);
    this.y = Math.sin(this.radians);
    this.z = 1;
  };

  this.getNormalisedVector = function () {
    return createVector(this.x, this.y, this.z);
  };
}
