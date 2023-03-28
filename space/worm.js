function Worm(path) {
  this.path = path;

  this.show = function (stepIndex) {
    if (stepIndex >= this.path.length) {
      return;
    }
    noFill();
    strokeWeight(3 + stepIndex / 200);
    pathStep = this.path[stepIndex];

    const rotationAngle = this.path[stepIndex - 1].angleBetween(pathStep);

    this.drawCircle(
      stepIndex,
      pathStep.x,
      pathStep.y,
      CONFIG.baseWormThickness +
        stepIndex / (100 / CONFIG.wormThicknessIncrease),
      rotationAngle
    );
  };

  this.drawCircle = function (
    stepIndex,
    travelX,
    travelY,
    size,
    rotationAngle
  ) {
    //beginShape();
    const colourIndex = Math.floor((stepIndex / 10) % COLOURS.worms.length);
    const colour = COLOURS.worms[colourIndex];

    const angleIncrement = TWO_PI / 200;

    for (let a = -PI; a < PI; a += angleIncrement) {
      stroke(
        memoizedLightenDarkenColour(
          colour,
          CONFIG.colourOffset +
            CONFIG.colourContrast * sin(a + CONFIG.lightDirectionRadians)
        )
      );

      let noiseTerrainX = map(cos(a), -1, 1, 0, CONFIG.noiseTerrainSpeed);
      let noiseTerrainY = map(sin(a), -1, 1, 0, CONFIG.noiseTerrainSpeed);
      let noiseAmplitude = size * CONFIG.noiseAmplitude;
      let r = map(
        noise(noiseTerrainX + travelX / 30, noiseTerrainY + travelY / 30),
        0,
        1,
        size - noiseAmplitude,
        size + noiseAmplitude
      );
      r = r * noise(stepIndex / 1000) * CONFIG.sizeVariance;

      // 𝑥(𝛼)=𝑅𝑥cos(𝛼)cos(𝜃)−𝑅𝑦sin(𝛼)sin(𝜃)+𝐶𝑥
      // 𝑦(𝛼)=𝑅𝑦cos(𝛼)sin(𝜃)+𝑅𝑥sin(𝛼)cos(𝜃)+𝐶𝑦
      //   const ellipseFactor = 1;
      //   const rx = r * ellipseFactor;
      //   const ry = r / ellipseFactor;

      //   // rotating elipse
      //   let x =
      //     rx * cos(a) * cos(rotationAngle) -
      //     ry * sin(a) * sin(rotationAngle) +
      //     travelX;

      //   let y =
      //     rx * cos(a) * sin(rotationAngle) +
      //     ry * sin(a) * cos(rotationAngle) +
      //     travelY; // rotating elipse

      //   let x2 =
      //     rx * cos(a + angleIncrement) * cos(rotationAngle) -
      //     ry * sin(a + angleIncrement) * sin(rotationAngle) +
      //     travelX;

      //   let y2 =
      //     rx * cos(a + angleIncrement) * sin(rotationAngle) +
      //     ry * sin(a + angleIncrement) * cos(rotationAngle) +
      //     travelY;

      let x = r * cos(a) + travelX;
      let y = r * sin(a) + travelY;
      let x2 = r * cos(a + angleIncrement) + travelX;
      let y2 = r * sin(a + angleIncrement) + travelY;
      //let x = r * cos(a) + travelX;
      //let y = (r * sin(a)) / 2 + travelY;
      line(x, y, x2, y2);
    }
    //endShape();
  };
}
