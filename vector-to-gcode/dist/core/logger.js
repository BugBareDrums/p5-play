"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var logger = winston_1.default.createLogger({
    levels: winston_1.default.config.syslog.levels,
    format: winston_1.default.format.combine(winston_1.default.format.label({ label: 'server' }), winston_1.default.format.simple(), winston_1.default.format.timestamp(), winston_1.default.format.printf(function (_a) {
        var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
        return "[".concat(label, ":").concat(level, "] ").concat(message, " (").concat(timestamp, ")");
    })),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;
