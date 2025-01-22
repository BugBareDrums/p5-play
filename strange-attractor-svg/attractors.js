const attractors = {
  "Lorenz 84": {
    initialParams: [-1.2346115, 0.6818416, -0.9457178, 0.48372614, -0.355516],
    initialPosition: { x: 0, y: 0, z: 0 },
    fn: function (t, e, n, a, r, o) {
      return {
        x: t.x + o * (-e * t.x - t.y * t.y - t.z * t.z + e * a),
        y: t.y + o * (-t.y + t.x * t.y - n * t.x * t.z + r),
        z: t.z + o * (-t.z + n * t.x * t.y + t.x * t.z),
      };
    },
  },
  Lorenz: {
    initialParams: [4.6, 18.5, 0.6, 0.012],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r) {
      return {
        x: t.x + r * (e * (t.y - t.x)),
        y: t.y + r * (t.x * (n - t.z) - t.y),
        z: t.z + r * (t.x * t.y - a * t.z),
      };
    },
  },
  Rossler: {
    initialParams: [0.2, 0.2, 5.7, 0.0085],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: t.x + i * (-t.y - t.z),
        y: t.y + i * (t.x + e * t.y),
        z: t.z + i * (n + t.z * (t.x - a)),
      };
    },
  },
  Pickover: {
    initialParams: [1.068107, -0.62762, 0.64169, -1.60018],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r) {
      return {
        x: Math.sin(e * t.y) - t.z * Math.cos(n * t.x),
        y: t.z * Math.sin(a * t.x) - Math.cos(r * t.y),
        z: Math.sin(t.x),
      };
    },
  },
  "Polynomial type A": {
    initialParams: [1.63108, 1.08454, 0.118899],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a) {
      return {
        x: e + t.y - t.z * t.y,
        y: n + t.z - t.x * t.z,
        z: a + t.x - t.y * t.x,
      };
    },
  },
  "Polynomial type B": {
    initialParams: [0.6934, 0.26139, 0.74517, 0.15297, 0.9057, 0.26402],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: e + t.y - t.z * (n + t.y),
        y: a + t.z - t.x * (r + t.z),
        z: o + t.x - t.y * i,
      };
    },
  },
  "Polynomial type C": {
    initialParams: [
      0.9218706, -0.858799, -0.8621235, 0.89861906, 0.013761461, 0.1665296,
      0.049253225, 0.65695226, 0.049607992, 0.1527924, -0.43470955, 0.25819838,
      0.7989209, -0.25225127, 0.43356472, 0.67362326, -0.6379633, -0.6840042,
    ],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i, c, s, u, d, l, f, h, m, v, E, p, g) {
      return {
        x: e + t.x * (n + a * t.x + r * t.y) + t.y * (o + i * t.y),
        y: c + t.y * (s + u * t.y + d * t.z) + t.z * (l + f * t.z),
        z: h + t.z * (m + v * t.z + E * t.x) + t.x * (p + g * t.x),
      };
    },
  },
  Latoocarfian: {
    initialParams: [
      1.2544194, 1.1821778, 1.0815392, 1.3997533, -1.6979753, -2.0924227,
    ],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: Math.sin(t.y * e) + r * Math.sin(t.x * e),
        y: Math.sin(t.z * n) + o * Math.sin(t.y * n),
        z: Math.sin(t.x * a) + i * Math.sin(t.z * a),
      };
    },
  },
  Kamtorus: {
    initialParams: [
      1.1390653, 2.093859, -1.0785681, -0.2240113, -0.83149767, 1.5743972,
    ],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: t.y * Math.sin(e) + (t.z * t.z - t.x) * Math.cos(r),
        y: t.z * Math.sin(n) - (t.x * t.x - t.y) * Math.cos(o),
        z: t.x * Math.sin(a) - (t.y * t.y - t.z) * Math.cos(i),
      };
    },
  },
  "Clifford 3D": {
    initialParams: [
      -2.7650595, -1.4949875, -1.5734646, -0.7236035, 1.9719217, 1.3144507,
    ],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: Math.sin(e * t.y) + r * Math.cos(e * t.x),
        y: Math.sin(n * t.z) + o * Math.cos(n * t.y),
        z: Math.sin(a * t.x) + i * Math.cos(a * t.z),
      };
    },
  },
  Hadley: {
    initialParams: [0.2, 4, 8, 1, 0.001],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o) {
      return {
        x: t.x + o * (-t.y * t.y - t.z * t.z + e * a),
        y: t.y + o * (t.x * t.y - n * t.x * t.z - t.y + r),
        z: t.z + o * (n * t.x * t.y + t.x * t.z - t.z),
      };
    },
  },
  DequanLi: {
    initialParams: [40, 1.833, 0.16, 0.65, 55, 20, 1e-4],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i, c) {
      return {
        x: t.x + c * (e * (t.y - t.x) + a * t.x * t.z),
        y: t.y + c * (o * t.x + i * t.y - t.x * t.z),
        z: t.z + c * (n * t.z + t.x * t.y - r * t.x * t.x),
      };
    },
  },
  Thomas: {
    initialParams: [0.19],
    initialPosition: { x: 2, y: 2, z: 1 },
    typicalMax: 4,
    fn: function (t, b) {
      return {
        x: t.x - b * t.x + Math.sin(t.y),
        y: t.y - b * t.y + Math.sin(t.z),
        z: t.z - b * t.z + Math.sin(t.x),
      };
    },
  },
  "Lu Chen 1": {
    initialParams: [40, 5 / 6, 0.5, 0.65, 20, 0.001],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: t.x + i * (e * (t.y - t.x) + a * t.x * t.z),
        y: t.y + i * (-t.x * t.z + o * t.y),
        z: t.z + i * (-r * t.x * t.x + t.x * t.y + n * t.z),
      };
    },
  },
  "Lu Chen 2": {
    initialParams: [40, 55, 11 / 6, 0.16, 0.65, 20, 5e-5],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i, c) {
      return {
        x: t.x + c * (e * (t.y - t.x) + r * t.x * t.z),
        y: t.y + c * (n * t.x - t.x * t.z + i * t.y),
        z: t.z + c * (-o * t.x * t.x + t.x * t.y + a * t.z),
      };
    },
  },
  Dadras: {
    initialParams: [3, 2.7, 1.7, 2, 9, 0.001],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: t.x + i * (t.y - e * t.x + n * t.y * t.z),
        y: t.y + i * (a * t.y - t.x * t.z + t.z),
        z: t.z + i * (r * t.x * t.y - o * t.z),
      };
    },
  },
  Sprot: {
    initialParams: [
      1.1390653, 2.093859, -1.0785681, -0.2240113, -0.83149767, 1.5743972,
    ],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x:
          e + n * t.x + a * t.x * t.x + r * t.x * t.y + o * t.y + i * t.y * t.y,
        y: t.x,
        z: t.y,
      };
    },
  },
  "Peter de Jong": {
    initialParams: [3.1, -0.1, 6.1, 4, 4, 0],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: Math.sin(e * t.y) - Math.sin(r * t.x),
        y: Math.sin(n * t.z) - Math.sin(o * t.y),
        z: Math.sin(a * t.x) - Math.sin(i * t.z),
      };
    },
  },
  Aizawa: {
    initialParams: [0.25, 0.95, 0.6, 3.5, 0.1, 0.14],
    initialPosition: { x: 1, y: 1, z: 1 },
    fn: function (t, e, n, a, r, o, i) {
      return {
        x: t.x + i * ((t.z - n) * t.x - r * t.y),
        y: t.y + i * (r * t.x + (t.z - n) * t.y),
        z:
          t.z +
          i *
            (a +
              e * t.z -
              (t.z * t.z * t.z) / 3 -
              t.x * t.x +
              o * t.z * t.x * t.x * t.x),
      };
    },
  },
  Tamari: {
    // initialParams: [
    //   1.021004, 0.000059, 18.84047, 1.319445, -0.009, 0.01, 1, 0.1113, 0.2706,
    // ],
    initialParams: [1.013, -0.011, 0.02, 0.96, 0, 0.01, 1, 0.05, 0.05],
    initialPosition: { x: 0.1, y: 0.1, z: 0.1 },
    typicalMax: 8000,
    fn: function (t, a, b, c, d, e, f, g, u, i) {
      if (Math.abs(t.x) < 1e-10 || Math.abs(1 - i) < 1e-10) {
        throw new Error("Division by zero detected");
      }

      // Calculate arctangent term according to the equation
      const atanArg = ((1 - u) * t.y) / ((1 - i) * t.x);

      return {
        x: (t.x - a * t.y) * Math.cos(t.z) - b * t.y * Math.sin(t.z),
        y: (t.x + c * t.y) * Math.sin(t.z) + d * t.y * Math.cos(t.z),
        z: e + f * t.z + g * Math.atan(atanArg),
      };
    },
  },
  "Three Scroll Unified": {
    initialParams: [40, 55, 11 / 6, 0.16, 0.65, 20, 4e-4],
    initialPosition: { x: 1, y: 1, z: 1 },
    typicalMax: 300,
    fn: function (t, e, n, a, r, o, i, c) {
      return {
        x: t.x + c * (e * (t.y - t.x) + r * t.x * t.z),
        y: t.y + c * (n * t.x - t.x * t.z + i * t.y),
        z: t.z + c * (-o * t.x * t.x + t.x * t.y + a * t.z),
      };
    },
  },
};

function createAttractorStepper(
  attractorName,
  paramMods = [0, 0, 0, 0, 0, 0, 0]
) {
  const attractor = attractors[attractorName];

  const initialParams = { ...attractor.initialParams };

  for (let i = 0; i < paramMods.length; i++) {
    initialParams[i] += paramMods[i];
  }

  function stepper() {
    this.vector = createVector(
      attractor.initialPosition.x,
      attractor.initialPosition.y,
      attractor.initialPosition.z
    );

    this.step = function () {
      this.vector = attractor.fn(
        this.vector,
        initialParams[0],
        initialParams[1],
        initialParams[2],
        initialParams[3],
        initialParams[4],
        initialParams[5],
        initialParams[6],
        initialParams[7],
        initialParams[8],
        initialParams[9],
        initialParams[10]
      );
    };

    this.getNormalisedVector = function () {
      return normaliseVector(
        createVector(this.vector.x, this.vector.y, this.vector.z),
        attractor.typicalMax ?? 4
      );
    };
  }

  return new stepper();
}
