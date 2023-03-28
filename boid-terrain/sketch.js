var terrain;
let balls;

function setup() {
  createCanvas(800, 800);
  terrain = generatePerlin3dTerrain();
  balls = [new Ball(), new Ball(), new Ball()];

  for (let x = 0; x < terrain.length; x++) {
    for (let y = 0; y < terrain[x].length; y++) {
      const z = terrain[x][y];

      const color = Math.floor(z * 200) % 10 == 1 ? 0 : 255;
      stroke(color);
      strokeWeight(3);
      point(x, y);
    }
  }
}

class Ball {
  constructor() {
    this.pos = createVector(random(0, height), random(0, width));
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  show() {
    stroke(this.color);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
  }

  move(vector) {
    if (this.pos.x + vector.x < 0 || this.pos.x + vector.x > width) return;
    if (this.pos.y + vector.y < 0 || this.pos.y + vector.y > height) return;

    this.pos.add(vector);
  }
}

function draw() {
  // find the downward slope vector at the ball's position
  for (let ball of balls) {
    const x = createVector(
      ball.pos.x - 1,
      ball.pos.y,
      terrain[Math.floor(ball.pos.x - 1)][Math.floor(ball.pos.y)] * 800
    );
    const y = createVector(
      ball.pos.x,
      ball.pos.y - 1,
      terrain[Math.floor(ball.pos.x)][Math.floor(ball.pos.y - 1)] * 800
    );
    const z = createVector(
      ball.pos.x,
      ball.pos.y,
      terrain[Math.floor(ball.pos.x)][Math.floor(ball.pos.y)] * 800
    );

    const slope = getDownwardSlopeVector(x, y, z);
    ball.move(slope.mult(0.1));
    ball.show();
  }
  // add the slope vector to the ball's position
}

function generatePerlin3dTerrain() {
  const terrain = [];
  const terrainSize = 800;
  const terrainScale = 0.005;

  for (let x = 0; x < terrainSize; x++) {
    terrain[x] = [];
    for (let y = 0; y < terrainSize; y++) {
      terrain[x][y] = noise(x * terrainScale, y * terrainScale);
    }
  }

  return terrain;
}

function getDownwardSlopeVector(x, y, z) {
  // calculate the normal vector
  const xy = y.sub(x);
  const xz = z.sub(x);

  const normal = xy.cross(xz);

  // calculate the slope vector
  const slope = normal.cross(xy);

  // normalize the slope vector
  // console.log(slopeNormalized);
  return slope;
}
