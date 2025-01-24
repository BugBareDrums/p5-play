import { createSetup, createDraw } from "./sketch.js";

new p5((p) => {
  p.setup = createSetup(p);
  p.draw = createDraw(p);
});
