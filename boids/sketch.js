let flock;
const canvasX = 1000;
const canvasY = 500;
const numBoids = 5;
const maxSpeed = 10;
const forceRatio = 0.02;
const variance = 0.01;
const separationFactor = 6;
const alignmentFactor = 2.0;
const coheranceFactor = 1.0;
const boidSize = 10;
disappearancePercentage = 1;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup() {
  frameRate(30);
  createCanvas(canvasX, canvasY);

  flock = new Flock();
  for (let i = 0; i < numBoids; i++) {
    let j = new Boid(rand(0, canvasX), rand(0, canvasY));
    flock.addBoid(j);
  }
}

function draw() {
  background(255);
  flock.run();
}

function mouseClicked() {
  save("mySVG.svg");
}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

function Flock() {
  this.boids = [];
}

Flock.prototype.run = function () {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);
  }
};

Flock.prototype.addBoid = function (j) {
  this.boids.push(j);
};

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.previousPositions = [];
  this.r = boidSize;
  this.mass = 2;
  this.maxspeed = maxSpeed / 2 + rand(0, maxSpeed * variance);
  const maxForce = forceRatio * maxSpeed;
  this.maxforce = maxForce / 2 + rand(0, maxForce * variance);
}

Boid.prototype.run = function (boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.addPoint(this.position.x, this.position.y);
  this.render();
};

// We could add mass here if we want A = F / M
// 添加群眾
Boid.prototype.applyForce = function (force) {
  this.acceleration.add(force);
};

Boid.prototype.flock = function (boids) {
  let sep = this.separate(boids);
  let ali = this.align(boids);
  let coh = this.cohesion(boids);

  sep.mult(separationFactor);
  ali.mult(alignmentFactor);
  coh.mult(coheranceFactor);

  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
};

Boid.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxspeed);
  this.lastPosition = {
    ...this.position,
  };
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

Boid.prototype.seek = function (target) {
  let desired = p5.Vector.sub(target, this.position);
  desired.normalize();
  desired.mult(this.maxspeed);
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);
  return steer;
};

Boid.prototype.addPoint = function (x, y) {
  this.previousPositions.push(new p5.Vector(x, y));
};

Boid.prototype.render = function () {
  stroke(0);
  strokeWeight(2);
  //let theta = this.velocity.heading() + radians(100);

  const lineSkip = 10;

  for (let i = 0; i < this.previousPositions.length - 1; i + lineSkip) {
    let lineEnd = i + lineSkip - 1;
    if (lineEnd > this.previousPositions.length - 1) {
      lineEnd = this.previousPositions.length - 1;
    }

    if (this.previousPositions[i].dist(this.previousPositions[lineEnd]) < 10) {
      line(
        this.previousPositions[i].x,
        this.previousPositions[i].y,
        this.previousPositions[lineEnd].x,
        this.previousPositions[lineEnd].y
      );
    }
  }
};

Boid.prototype.borders = function () {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
};

Boid.prototype.separate = function (boids) {
  let desiredseparation = 40.0;
  let steer = createVector(0, 0);
  let count = 0;

  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < desiredseparation) {
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // 持續追蹤總數
    }

    // avoid bottom
    if (this.position.y !== 0 && this.position.y < desiredseparation) {
      let diff = p5.Vector.sub(this.position, createVector(this.position.x, 0));
      diff.normalize();
      diff.div(this.position.y); // Weight by distance
      steer.add(diff);
      count++; // 持續追蹤總數
    }

    // avoid left
    if (this.position.x !== 0 && this.position.x < desiredseparation) {
      let diff = p5.Vector.sub(this.position, createVector(0, this.position.y));
      diff.normalize();
      diff.div(this.position.x); // Weight by distance
      steer.add(diff);
      count++; // 持續追蹤總數
    }

    // avoid right
    const distanceFromRight = canvasX - this.position.x;
    if (distanceFromRight !== 0 && distanceFromRight < desiredseparation) {
      let diff = p5.Vector.sub(
        this.position,
        createVector(canvasX, this.position.Y)
      );
      diff.normalize();
      diff.div(distanceFromRight); // Weight by distance
      steer.add(diff);
      count++;
    }

    // avoid top
    const distanceFromTop = canvasY - this.position.y;
    if (distanceFromTop !== 0 && distanceFromTop < desiredseparation) {
      let diff = p5.Vector.sub(
        this.position,
        createVector(this.position.x, canvasY)
      );
      diff.normalize();
      diff.div(distanceFromTop); // Weight by distance
      steer.add(diff);
      count++;
    }
  }

  if (count > 0) {
    steer.div(count);
  }

  if (steer.mag() > 0) {
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
};

Boid.prototype.align = function (boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < neighbordist) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Boid.prototype.cohesion = function (boids) {
  let neighbordist = 1000;
  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < neighbordist) {
      sum.add(boids[i].position);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);
  } else {
    return createVector(0, 0);
  }
};
