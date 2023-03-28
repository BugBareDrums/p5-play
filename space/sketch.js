let tree;
let wormPhase = 0;
const worms = [];

function setup() {
  createCanvas(1200, 800);
  angleMode(RADIANS);
  tree = new Tree(createVector(width / 2, height + 50), createVector(0, 1));

  tree.growTillWithinAttractionDistance();

  frameRate(60);
}

function draw() {
  if (!tree.complete) {
    background(COLOURS.background);
    tree.show();
    tree.grow();
  } else {
    if (wormPhase == 0) {
      const endNodes = tree.getEndNodes();

      for (let endNode of endNodes) {
        worms.push(new Worm(endNode.getWormPath()));
      }

      worms.sort(
        (a, b) => b.path[b.path.length - 1].x - a.path[a.path.length - 1].x
      );
    }

    wormPhase++;
    for (let worm of worms) {
      worm.show(wormPhase);
    }
  }
}
