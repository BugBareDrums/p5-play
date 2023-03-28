let chen1, chen2;

function setup() {
  createCanvas(1200, 800, WEBGL);

  chen1 = new chen({
    xx: 0.1,
    yy: 0.3,
    zz: -15.15,
    a: -10,
    b: -4,
    c: 18.1,
    dt: 0.007,
    colour: "white",
  });
  chen2 = new chen({
    xx: 0.11,
    yy: 0.3,
    zz: -15.15,
    a: -10,
    b: -4,
    c: 18.1,
    dt: 0.008,
    colour: "white",
  });
}

function chen({ xx, yy, zz, a, b, c, dt, colour }) {
  this.points = [];
  this.x = xx;
  this.y = yy;
  this.z = zz;

  this.step = function () {
    let dx = (-a * b * this.x) / (a + b) - (this.y * this.z + c);
    let dy = a * this.y + this.x * this.z;
    let dz = b * this.z + this.x * this.y;

    this.x += dx * dt;
    this.y += dy * dt;
    this.z += dz * dt;

    this.points.push(createVector(this.x, this.y, this.z));
  };

  this.show = function () {
    push();
    translate(this.x, this.y, this.z);
    stroke(colour);
    sphere(1);
    pop();

    stroke(colour);

    const max = this.points.length < 10 ? this.points.length : 10;

    for (var i = this.points.length - max; i < this.points.length; i++) {
      const p = this.points[i];
      push();
      translate(p.x, p.y, p.z);
      sphere((i - this.points.length) / 10);
      pop();
      // vertex(p.x, p.y, p.z);
    }
  };
}

let points = [];

// let dt = 0.01;
// let x = 0.1;
// let y = 0.3;
// let z = -15.15;
// let a = -10;
// let b = -4;
// let c = 18.1;

let rotateBy = 0.001;

function draw() {
  background(100);
  scale(10);
  noFill();

  ambientLight(255);

  //   let dx = (-a * b * x) / (a + b) - (y * z + c);
  //   let dy = a * y + x * z;
  //   let dz = b * z + x * y;
  //   let dx = -y - z;
  //   let dy = x + a * y;
  //   let dz = b + z * (x - c);

  rotateBy += 0.005;
  rotate(rotateBy, [1, 1, 0]);

  chen1.step();
  chen1.show();
  chen2.step();
  chen2.show();
}
