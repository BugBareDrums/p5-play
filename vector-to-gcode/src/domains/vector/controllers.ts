import express from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { gc } from '../../lib/grbl';
import { OutputBounds, Vector } from './types';

export type RequestBody = {
  outputBounds: OutputBounds;
  vectors: Vector[];
};

const raisedPenHeight = 10;

const options = [
  gc.selectXYPlane,
  gc.toolRadiusCompensationOff,
  gc.unitsInMillimeters,
  gc.workCoordinateSystem1,
  gc.unitsPerMinuteFeedRateMode,
  gc.feedRate(1000),
  '',
].join('\n');

export default {
  index: (
    request: express.Request<ParamsDictionary, string, RequestBody>,
    response: express.Response<string>
  ) => {
    const { outputBounds, vectors } = request.body;

    if (vectors.length === 0 || !Array.isArray(vectors)) {
      response.status(400).json('Invalid request');
    }

    const mappedVectors = vectors.map((vector) =>
      mapNormalVectorToOutputBounds(vector, outputBounds)
    );

    // get first non null vector
    const firstVector = mappedVectors.find((vector) => vector != null);

    if (firstVector == null) {
      response.status(400).json('Invalid request - no valid vectors');
    }

    const goToStart = movePenToPositionWithRaise(firstVector!);

    let gcode = '';
    let previousVector = mappedVectors[0];

    for (let i = 1; i < mappedVectors.length; i++) {
      const currentVector = mappedVectors[i];
      previousVector = mappedVectors[i - 1];

      if (currentVector === null && previousVector !== null) {
        gcode += movePenToPositionWithRaise(previousVector);
      } else if (currentVector !== null) {
        if (previousVector === null) {
          gcode += movePenToPositionWithRaise(currentVector);
        } else {
          gcode += movePenToPosition(currentVector);
        }
      }
    }

    // get last non null vector
    const finalVector = mappedVectors
      .reverse()
      .find((vector) => vector != null);

    // add final raise pen command
    gcode += movePenToPositionWithRaise(finalVector!);

    response.json(options + goToStart + gcode);
  },
};

function movePenToPosition(vector: Vector) {
  return `${gc.linearInterpolation} x${vector.x} y${vector.y} z${
    vector.z - 10
  }\n`;
}

function movePenToPositionWithRaise(vector: Vector) {
  return movePenToPosition({ ...vector, z: raisedPenHeight });
}

function mapNormalVectorToOutputBounds(
  vector: Vector | null,
  outputBounds: OutputBounds
) {
  if (vector == null) {
    return null;
  }
  return {
    x: mapToOutputBounds(vector.x, outputBounds.x),
    y: mapToOutputBounds(vector.y, outputBounds.y),
    z: mapToOutputBounds(vector.z, outputBounds.z),
  };
}

function mapToOutputBounds(
  value: number,
  bounds: { min: number; max: number }
) {
  return ((value + 1) * (bounds.max - bounds.min)) / 2 + bounds.min;
}
