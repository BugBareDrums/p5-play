function chen({ xx, yy, zz, a, b, c, dt }) {
  this.x = xx;
  this.y = yy;
  this.z = zz;

  this.step = function () {
    let dx = (-a * b * this.x) / (a + b) - (this.y * this.z + c);
    let dy = a * this.y + this.x * this.z;
    let dz = b * this.z + this.x * this.y;

    this.lastX = this.x;
    this.lastY = this.y;
    this.lastZ = this.z;

    this.x += dx * dt;
    this.y += dy * dt;
    this.z += dz * dt;
  };

  this.getNormalisedVector = function () {
    return normaliseVector(createVector(this.x, this.y, this.z), 20);
  };
}
