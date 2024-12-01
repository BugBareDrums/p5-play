function perlin({ dr }) {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.radians = 0.0;

  this.step = function () {
    this.radians += dr;
    this.x = noise(
      Math.cos(this.radians),
      Math.sin(this.radians),
      Math.sin(this.radians)
    );
    this.y = noise(
      Math.cos(this.radians + 100),
      Math.sin(this.radians + 100),
      Math.sin(this.radians + 100)
    );
    this.z = noise(
      Math.cos(this.radians + 200),
      Math.sin(this.radians + 200),
      Math.sin(this.radians + 200)
    );
  };

  this.getNormalisedVector = function () {
    return createVector(this.x * 2 - 1, this.y * 2 - 1, this.z * 2 - 1);
  };
}
