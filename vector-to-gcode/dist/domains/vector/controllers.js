"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grbl_1 = require("../../lib/grbl");
var options = [
    grbl_1.gc.selectXYPlane,
    grbl_1.gc.toolRadiusCompensationOff,
    grbl_1.gc.unitsInMillimeters,
    grbl_1.gc.workCoordinateSystem1,
    grbl_1.gc.incrementalPositioning,
    '',
].join('\n');
exports.default = {
    index: function (_a, response) {
        var _b = _a.body, outputBounds = _b.outputBounds, vectors = _b.vectors;
        if (vectors.length === 0 || !Array.isArray(vectors)) {
            response.status(400).json('Invalid request');
        }
        var responseBody = vectors
            .map(function (vector) { return mapNormalVectorToOutputBounds(vector, outputBounds); })
            .map(function (vector) { return "g1 x".concat(vector.x, " y").concat(vector.y, " z").concat(vector.z); })
            .join('\n');
        response.json(options + responseBody);
    },
};
function mapNormalVectorToOutputBounds(vector, outputBounds) {
    return {
        x: mapToOutputBounds(vector.x, outputBounds.x),
        y: mapToOutputBounds(vector.y, outputBounds.y),
        z: mapToOutputBounds(vector.z, outputBounds.z),
    };
}
function mapToOutputBounds(value, bounds) {
    return ((value + 1) * (bounds.max - bounds.min)) / 2 + bounds.min;
}
