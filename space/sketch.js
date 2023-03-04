let trees = [];

function setup() {
  createCanvas(640, 360);
  trees = [new Tree(createVector(width, height), createVector(0, 1))];

  for (let tree of trees) {
    tree.growTillWithinAttractionDistance();
  }

  frameRate(60);
}

function draw() {
  background(100);

  for (let tree of trees) {
    tree.show(true);
    tree.grow();
  }
}

function mousePressed() {
  for (let tree of trees) {
    tree.grow();
  }
}
