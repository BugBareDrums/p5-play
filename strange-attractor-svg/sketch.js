import { state, constants } from "./state.js";
import { createCombiners } from "./combiners.js";
import { show } from "./renderer.js";
import { saveGcode, savePng } from "./utils.js";

export const createSetup = (p) => {
  return () => {
    p.createCanvas(3000, 3000);
    document.getElementById("save-gcode").addEventListener("click", saveGcode);
    document
      .getElementById("save-png")
      .addEventListener("click", () => savePng(p));
    document.getElementById("stop").addEventListener("click", () => {
      p.noLoop();
    });
    document.getElementById("start").addEventListener("click", () => {
      p.loop();
    });
    document.getElementById("reset").addEventListener("click", () => {
      state.numberOfIterations = 0;
      state.allPoints = [];
      p.loop();
    });
  };
};

export const createDraw = (p) => {
  return () => {
    state.macroIterationNumber =
      Math.floor(state.numberOfIterations / constants.refreshRate) + 1;

    if (state.numberOfIterations % constants.refreshRate === 0) {
      state.combiners = createCombiners(macroIterationNumber, p);
    }

    state.numberOfIterations++;

    if (
      state.numberOfIterations < 4 ||
      state.numberOfIterations % constants.refreshRate <
        constants.beginAtIteration
    ) {
      return;
    }

    if (state.numberOfIterations > constants.maxIterations) {
      p.noLoop();
    }

    for (const vectorWindow of state.vectorWindows) {
      show(vectorWindow, p);
    }
  };
};
