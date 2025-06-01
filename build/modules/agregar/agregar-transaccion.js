"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = agregarTransaccion;
const config_mongo_1 = require("../../config/config-mongo");
const transaccion_1 = __importDefault(require("../../db/models/transaccion"));
function agregarTransaccion(dataTrans) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, config_mongo_1.connectDB)();
            return yield transaccion_1.default.createInstance(dataTrans);
        }
        catch (err) {
            return {
                data: null,
                message: `Hubo un Error en el registro del Usuario: ${err}`,
            };
        }
        finally {
            config_mongo_1.mongoose.connection.close();
        }
    });
}
