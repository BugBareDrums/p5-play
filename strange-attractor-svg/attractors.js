const attractors = {};

function createAttractorStepper(
  attractorName,
  paramMods = [0, 0, 0, 0, 0, 0, 0]
) {
  const attractor = attractors[attractorName];

  for (let i = 0; i < paramMods.length; i++) {
    attractor.params[i] += paramMods[i];
  }

  function stepper() {
    this.params = attractor.params;
    this.x = this.params[0];
    this.y = this.params[1];
    this.z = this.params[2];

    this.step = function () {
      const poo = attractor.fn(
        this,
        this.params[0],
        this.params[1],
        this.params[2],
        this.params[3],
        this.params[4],
        this.params[5]
      );
    };

    this.getNormalisedVector = function () {
      return normaliseVector(createVector(this.x, this.y, this.z), 10);
    };
  }

  return new stepper();
}

const create = function (name, params, fn, iterations) {
  attractors[name] = { name, params, fn, iterations };
};

create(
  "Lorenz 84",
  [-1.2346115, 0.6818416, -0.9457178, 0.48372614, -0.355516],
  function (t, e, n, a, r, o) {
    var i = t.x,
      c = t.y,
      s = t.z;
    return (
      (t.x = i + o * (-e * i - c * c - s * s + e * a)),
      (t.y = c + o * (-c + i * c - n * i * s + r)),
      (t.z = s + o * (-s + n * i * c + i * s)),
      t
    );
  }
);
create(
  "Lorenz",
  [4.6, 18.5, 0.6, 0.012],
  function (t, e, n, a, r) {
    var o = t.x,
      i = t.y,
      c = t.z;
    return (
      (t.x = o + r * (e * (i - o))),
      (t.y = i + r * (o * (n - c) - i)),
      (t.z = c + r * (o * i - a * c)),
      t
    );
  },
  40
);
create(
  "Rossler",
  [0.2, 0.2, 5.7, 0.0085],
  function (t, e, n, a, r) {
    var o = t.x,
      i = t.y,
      c = t.z;
    return (
      (t.x = o + r * (-i - c)),
      (t.y = i + r * (o + e * i)),
      (t.z = c + r * (n + c * (o - a))),
      t
    );
  },
  40
);
create(
  "Pickover",
  [1.068107, -0.62762, 0.64169, -1.60018],
  function (t, e, n, a, r) {
    var o = Math.sin,
      i = Math.cos,
      c = t.x,
      s = t.y,
      u = t.z;
    return (
      (t.x = o(e * s) - u * i(n * c)),
      (t.y = u * o(a * c) - i(r * s)),
      (t.z = o(c)),
      t
    );
  },
  400
);
create(
  "Polynomial type A",
  [1.63108, 1.08454, 0.118899],
  function (t, e, n, a) {
    var r = t.x,
      o = t.y,
      i = t.z;
    return (
      (t.x = e + o - i * o), (t.y = n + i - r * i), (t.z = a + r - o * r), t
    );
  }
);
create(
  "Polynomial type B",
  [0.6934, 0.26139, 0.74517, 0.15297, 0.9057, 0.26402],
  function (t, e, n, a, r, o, i) {
    var c = t.x,
      s = t.y,
      u = t.z;
    return (
      (t.x = e + s - u * (n + s)),
      (t.y = a + u - c * (r + u)),
      (t.z = o + c - s * (i + c)),
      t
    );
  }
);
create(
  "Polynomial type C",
  [
    0.9218706, -0.858799, -0.8621235, 0.89861906, 0.013761461, 0.1665296,
    0.049253225, 0.65695226, 0.049607992, 0.1527924, -0.43470955, 0.25819838,
    0.7989209, -0.25225127, 0.43356472, 0.67362326, -0.6379633, -0.6840042,
  ],
  function (t, e, n, a, r, o, i, c, s, u, d, l, f, h, m, v, E, p, g) {
    var A = t.x,
      y = t.y,
      b = t.z;
    return (
      (t.x = e + A * (n + a * A + r * y) + y * (o + i * y)),
      (t.y = c + y * (s + u * y + d * b) + b * (l + f * b)),
      (t.z = h + b * (m + v * b + E * A) + A * (p + g * A)),
      t
    );
  }
);
create(
  "Latoocarfian",
  [1.2544194, 1.1821778, 1.0815392, 1.3997533, -1.6979753, -2.0924227],
  function (t, e, n, a, r, o, i) {
    var c = Math.sin,
      s = t.x,
      u = t.y,
      d = t.z;
    return (
      (t.x = c(u * e) + r * c(s * e)),
      (t.y = c(d * n) + o * c(u * n)),
      (t.z = c(s * a) + i * c(d * a)),
      t
    );
  }
);
create(
  "Kamtorus",
  [1.1390653, 2.093859, -1.0785681, -0.2240113, -0.83149767, 1.5743972],
  function (t, e, n, a, r, o, i) {
    var c = Math.sin,
      s = Math.cos,
      u = t.x,
      d = t.y,
      l = t.z;
    return (
      (t.x = d * c(e) + (l * l - u) * s(r)),
      (t.y = l * c(n) - (u * u - d) * s(o)),
      (t.z = u * c(a) - (d * d - l) * s(i)),
      t
    );
  }
);
create(
  "Clifford 3D",
  [-2.7650595, -1.4949875, -1.5734646, -0.7236035, 1.9719217, 1.3144507],
  function (t, e, n, a, r, o, i) {
    var c = Math.sin,
      s = Math.cos,
      u = t.x,
      d = t.y,
      l = t.z;
    return (
      (t.x = c(e * d) + r * s(e * u)),
      (t.y = c(n * l) + o * s(n * d)),
      (t.z = c(a * u) + i * s(a * l)),
      t
    );
  }
);
create("Hadley", [0.2, 4, 8, 1, 0.001], function (t, e, n, a, r, o) {
  var i = t.x,
    c = t.y,
    s = t.z;
  return (
    (t.x = i + o * (-c * c - s * s + e * a)),
    (t.y = c + o * (i * c - n * i * s - c + r)),
    (t.z = s + o * (n * i * c + i * s - s)),
    t
  );
});
create(
  "Dequan-Li",
  [40, 1.833, 0.16, 0.65, 55, 20, 1e-4],
  function (t, e, n, a, r, o, i, c) {
    var s = t.x,
      u = t.y,
      d = t.z;
    return (
      (t.x = s + c * (e * (u - s) + a * s * d)),
      (t.y = u + c * (o * s + i * u - s * d)),
      (t.z = d + c * (n * d + s * u - r * s * s)),
      t
    );
  },
  6
);
create("Thomas", [0.19, -1.9], function (t, e, n) {
  var a = Math.sin,
    r = t.x,
    o = t.y,
    i = t.z;
  return (
    (t.x = r + n * (e * r + a(o))),
    (t.y = o + n * (e * o + a(i))),
    (t.z = i + n * (e * i + a(r))),
    t
  );
});
create(
  "Lu Chen 1",
  [40, 5 / 6, 0.5, 0.65, 20, 0.001],
  function (t, e, n, a, r, o, i) {
    var c = t.x,
      s = t.y,
      u = t.z;
    return (
      (t.x = c + i * (e * (s - c) + a * c * u)),
      (t.y = s + i * (-c * u + o * s)),
      (t.z = u + i * (-r * c * c + c * s + n * u)),
      t
    );
  },
  12
);
create(
  "Lu Chen 2",
  [40, 55, 11 / 6, 0.16, 0.65, 20, 5e-5],
  function (t, e, n, a, r, o, i, c) {
    var s = t.x,
      u = t.y,
      d = t.z;
    return (
      (t.x = s + c * (e * (u - s) + r * s * d)),
      (t.y = u + c * (n * s - s * d + i * u)),
      (t.z = d + c * (-o * s * s + s * u + a * d)),
      t
    );
  },
  6
);
create(
  "Dadras",
  [3, 2.7, 1.7, 2, 9, 0.001],
  function (t, e, n, a, r, o, i) {
    var c = t.x,
      s = t.y,
      u = t.z;
    return (
      (t.x = c + i * (s - e * c + n * s * u)),
      (t.y = s + i * (a * s - c * u + u)),
      (t.z = u + i * (r * c * s - o * u)),
      t
    );
  },
  40
);
create(
  "Sprot",
  [1.1390653, 2.093859, -1.0785681, -0.2240113, -0.83149767, 1.5743972],
  function (t, e, n, a, r, o, i) {
    var c = t.x,
      s = t.y;
    return (
      (t.x = e + n * c + a * c * c + r * c * s + o * s + i * s * s),
      (t.y = c),
      (t.z = s),
      t
    );
  }
);
create(
  "Peter de Jong",
  [3.1, -0.1, 6.1, 4, 4, 0],
  function (t, e, n, a, r, o, i) {
    var c = Math.sin,
      s = Math.cos,
      u = t.x,
      d = t.y,
      l = t.z;
    return (
      (t.x = c(e * d) - s(r * u)),
      (t.y = c(n * l) - s(o * d)),
      (t.z = c(a * u) - s(i * l)),
      t
    );
  }
);
create(
  "Aizawa",
  [0.25, 0.95, 0.6, 3.5, 0.1, 0.14],
  function (t, e, n, a, r, o, i) {
    var c = t.x,
      s = t.y,
      u = t.z;
    return (
      (t.x = c + i * ((u - n) * c - r * s)),
      (t.y = s + i * (r * c + (u - n) * s)),
      (t.z = u + i * (a + e * u - (u * u * u) / 3 - c * c + o * u * c * c * c)),
      t
    );
  }
);
create(
  "Tamari",
  [1.013, -0.011, 0.02, 0.96, 0, 0.01, 1, 0.05, 0.05, 0.01],
  function (t, e, n, a, r, o, i, c, s, u, d) {
    void 0 === this.c5 && (this.c5 = -0.76);
    var l = Math.sin,
      f = Math.cos,
      h = Math.atan,
      m = t.x,
      v = t.y,
      E = t.z;
    return (
      (t.x = m + d * ((m - e * v) * f(E) - n * v * l(E))),
      (t.y = v + d * ((m + a * v) * l(E) + r * v * f(E))),
      (t.z = E + d * (o + i * E + c * h(((1 - s) / (1 - u)) * m * v))),
      t
    );
  },
  140
);
create(
  "Three-Scroll Unified Chaotic System",
  [40, 1.833, 55, 0.16, 0.65, 20, 2e-5],
  function (t, e, n, a, r, o, i, c) {
    var s = t.x,
      u = t.y,
      d = t.z;
    return (
      (t.x = s + c * (e * (u - s) + r * s * d)),
      (t.y = u + c * (a * s - s * d + i * u)),
      (t.z = d + c * (n * d + s * u - o * s * s)),
      t
    );
  },
  4
);
