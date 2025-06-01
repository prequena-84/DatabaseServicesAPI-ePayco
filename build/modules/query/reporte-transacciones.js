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
exports.default = reportCliente;
const config_mongo_1 = require("../../config/config-mongo");
const usuario_1 = __importDefault(require("../../db/models/usuario"));
function reportCliente() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, config_mongo_1.connectDB)();
            const report = yield usuario_1.default.aggregate([
                {
                    $lookup: {
                        from: "Transaccion", // Tabla a unificar
                        localField: "user_id", // Campo de ID colección de Tabla a unificar
                        foreignField: "id", // Campo de ID colección de clientes
                        as: "Repote_Transacciones", // Nombre del campo donde se guardará la información combinada
                    }
                },
                {
                    $unwind: "$Usario"
                },
            ]);
            return {
                data: report,
                message: 'Reporte de Trasacciones',
            };
        }
        catch (err) {
            return {
                data: null,
                message: 'Reporte de Cliente',
            };
        }
        finally {
            config_mongo_1.mongoose.connection.close();
        }
    });
}
