function Attractor(x, y) {
  this.pos = createVector(x, y);
  this.reached = false;
  this.found = false;

  this.show = function () {
    return;
    this.found ? fill(255, 0, 0) : fill(255);
    noStroke();
    if (!this.reached) {
      ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  };
}
