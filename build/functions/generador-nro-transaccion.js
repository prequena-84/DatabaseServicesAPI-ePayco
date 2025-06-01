"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = nroTransaccion;
const crypto_1 = __importDefault(require("crypto"));
function nroTransaccion() {
    // randomBytes(3)
    return crypto_1.default.randomBytes(10).toString('hex');
}
