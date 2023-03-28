// const COLOURS = {
//   background: "#295366",
//   branch: "#CFC1AE",
//   worms: ["#D6A258", "#C47645", "#B04A2E"],
// };
// const COLOURS = {
//   background: "#382F32",
//   branch: "#FFEAF2",
//   worms: ["#FCD9E5", "#FBC5D8", "#F1396D"],
// };
const COLOURS = {
  background: "#4C6406",
  branch: "#7D940E",
  worms: ["#F2C043", "#FFC218"],
};
// const COLOURS = {
//   background: "#BFDDDB",
//   branch: "#90BEBC",
//   worms: ["#6190A2", "#619CAA", "#6DA5B4", "#90BEBC"],
// };

const CONFIG = {
  attractionDistance: 200,
  killDistance: 60,
  lightDirectionRadians: Math.PI,
  colourContrast: 100,
  colourOffset: -50,
  noiseAmplitude: 0.2,
  noiseTerrainSpeed: 2,
  sizeVariance: 0.5,
  baseWormThickness: 100,
  wormThicknessIncrease: 50,
};

const memoizedLightenDarkenColour = memoized(lightenDarkenColour);

function memoized(fn) {
  const cache = {};
  return function (...args) {
    if (cache[args]) {
      return cache[args];
    }
    const result = fn.apply(this, args);
    cache[args] = result;
    return result;
  };
}

function lightenDarkenColour(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
