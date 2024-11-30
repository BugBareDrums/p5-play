"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = process.env, NODE_ENV = _a.NODE_ENV, HOST = _a.HOST, PORT = _a.PORT;
exports.default = {
    IS_PROD: NODE_ENV === 'production',
    HOST: typeof HOST === 'undefined' ? 'localhost' : HOST,
    PORT: typeof PORT === 'undefined' ? 4004 : parseInt(PORT),
};
