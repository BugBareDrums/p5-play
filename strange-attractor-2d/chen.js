function chen({ xx, yy, zz, a, b, c, dt }) {
  this.x = xx;
  this.y = yy;
  this.z = zz;

  this.step = function () {
    const noiseFactor = 0;
    let noiseX = (sin(sin(numberOfIterations * 0.5)) - 0.5) * noiseFactor;
    let noiseY = (cos(cos(numberOfIterations * 0.5)) - 0.5) * noiseFactor;
    let dx = noiseX + (-a * b * this.x) / (a + b) - (this.y * this.z + c);
    let dy = noiseY + a * this.y + this.x * this.z;
    let dz = b * this.z + this.x * this.y;

    this.lastX = this.x;
    this.lastY = this.y;
    this.lastZ = this.z;

    this.x += dx * dt;
    this.y += dy * dt;
    this.z += dz * dt;
  };

  this.getNormalisedVector = function () {
    return normaliseVector(createVector(this.x, this.y, this.z), 30);
  };
}
