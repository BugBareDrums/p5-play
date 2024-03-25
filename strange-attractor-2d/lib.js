function normaliseVector(v, max) {
  const normalise = (v) => v / max;
  return createVector(normalise(v.x), normalise(v.y), normalise(v.z));
}
