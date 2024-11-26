function perlin({ radiusx, radiusy, dr }) {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.radians = 0.0;

  this.step = function () {
    this.radians += dr;
    const noiseVal = noise(
      Math.cos(this.radians),
      Math.sin(this.radians),
      Math.sin(this.radians)
    );
    this.x = noiseVal;
    this.y = noiseVal;
    this.z = noiseVal;
  };

  this.getNormalisedVector = function () {
    return createVector(this.x, this.y, this.z);
  };
}
