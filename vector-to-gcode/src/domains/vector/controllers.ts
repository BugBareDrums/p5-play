import express from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { gc } from '../../lib/grbl';
import { OutputBounds, Vector } from './types';

export type RequestBody = {
  outputBounds: OutputBounds;
  vectors: Vector[];
};

const options = [
  gc.selectXYPlane,
  gc.toolRadiusCompensationOff,
  gc.unitsInMillimeters,
  gc.workCoordinateSystem1,
  gc.unitsPerMinuteFeedRateMode,
  gc.feedRate(2000),
  '',
].join('\n');

export default {
  index: (
    request: express.Request<ParamsDictionary, string, RequestBody>,
    response: express.Response<string>
  ) => {
    console.log('request.body', request.body);

    const { outputBounds, vectors } = request.body;

    if (vectors.length === 0 || !Array.isArray(vectors)) {
      response.status(400).json('Invalid request');
    }

    const normalisedVectors = vectors.map((vector) =>
      mapNormalVectorToOutputBounds(vector, outputBounds)
    );

    const raisePen = `g0 x0 y0 z5\n`;
    const goToStart = `g0 x${normalisedVectors[0].x} y${normalisedVectors[0].y} z5\n`;

    const responseBody = vectors
      .map((vector) => mapNormalVectorToOutputBounds(vector, outputBounds))
      .map((vector) => `g1 x${vector.x} y${vector.y} z${vector.z}`)
      .join('\n');

    response.json(options + raisePen + goToStart + responseBody);
  },
};

function mapNormalVectorToOutputBounds(
  vector: Vector,
  outputBounds: OutputBounds
) {
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
