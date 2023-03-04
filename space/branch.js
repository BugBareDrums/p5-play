function Node(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.closestCount = 0;
  this.origDir = this.dir.copy();
  this.len = 4;

  this.numberOfChildren = 0;

  this.reset = function () {
    this.dir = this.origDir.copy();
    this.closestCount = 0;
  };

  this.next = function () {
    this.incrementNumberOfChildren();
    var nextDir = p5.Vector.mult(this.dir, this.len);
    var nextPos = p5.Vector.add(this.pos, nextDir);
    return new Node(this, nextPos, this.dir.copy());
  };

  this.incrementNumberOfChildren = function () {
    this.numberOfChildren++;
    if (this.parent != null) {
      this.parent.incrementNumberOfChildren();
    }
  };

  this.show = function () {
    if (this.parent != null) {
      stroke(255);
      strokeWeight(this.numberOfChildren / 50);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      parent.show(false);
    }
  };
}
