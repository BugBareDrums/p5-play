function Node(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.child = null;
  if (this.parent != null) {
    this.parent.child = this;
  }
  this.dir = dir;
  this.closestCount = 0;
  this.origDir = this.dir.copy();
  this.len = 6;
  this.wormEaten = false;

  this.numberOfChildren = 1;

  this.reset = function () {
    this.dir = this.origDir.copy();
    this.closestCount = 0;
  };

  this.getWormPath = function () {
    if (this.parent == null || this.wormEaten) {
      return [];
    }

    //this.wormEaten = true;

    const path = [];

    for (let i = 0; i < 4; i++) {
      const pos = createVector(
        lerp(this.pos.x, this.parent.pos.x, i / 4),
        lerp(this.pos.y, this.parent.pos.y, i / 4)
      );

      path.push(pos);
    }

    return [...path, ...this.parent.getWormPath()];
  };

  this.next = function () {
    // this.incrementNumberOfChildren();
    var nextDir = p5.Vector.mult(this.dir, this.len);
    var nextPos = p5.Vector.add(this.pos, nextDir);
    return new Node(this, nextPos, this.dir.copy());
  };

  // this.incrementNumberOfChildren = function () {
  //   this.numberOfChildren++;
  //   if (this.parent != null) {
  //     this.parent.incrementNumberOfChildren();
  //   }
  // };

  this.show = function () {
    if (this.parent != null) {
      stroke(COLOURS.branch);
      strokeWeight(this.numberOfChildren);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      parent.show(false);
    }
  };
}
