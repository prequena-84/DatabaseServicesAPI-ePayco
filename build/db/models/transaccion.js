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
// Importacion componentes de mongoose
const mongoose_1 = require("mongoose");
const generador_nro_transaccion_1 = __importDefault(require("../../functions/generador-nro-transaccion"));
// creacion del esquema
const transSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: (0, generador_nro_transaccion_1.default)(),
    },
    usuario_doc: {
        type: String,
        unique: true,
        required: true
    },
    tipo: {
        type: String,
        unique: true,
        required: true
    },
    monto: {
        type: Number,
        unique: true,
        required: true
    },
    status: {
        type: String,
        unique: true,
        required: true
    },
    token_confirmacion: {
        type: String,
        unique: true,
    },
    session_id: {
        type: String,
        unique: true,
    },
});
// consulta todos los usuarios
transSchema.statics.todasLasTransacciones = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.find();
    });
};
transSchema.statics.actualizarDatoIdTransaccion = function (id, datoActualizado) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nuevaTransaccion = yield this.findOneAndUpdate({ id }, datoActualizado, { new: true });
            return {
                data: nuevaTransaccion,
                message: `Se actualizo los datos del usuario #${nuevaTransaccion.id} sastifactoriamente`,
            };
        }
        catch (err) {
            return {
                data: null,
                message: `Se presento el siguiente Error en la actualizacion de datos: ${err}`,
            };
        }
    });
};
// Registro de Usuarios
transSchema.statics.createInstance = function (datoTransaccion) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { usuario_doc, tipo, monto, status, token_confirmacion, session_id, } = datoTransaccion;
            const nuevaTransacion = new this({
                usuario_doc,
                tipo,
                monto,
                status,
                token_confirmacion,
                session_id
            });
            yield nuevaTransacion.save();
            return {
                data: nuevaTransacion,
                message: `Se registro la transaccion #${nuevaTransacion.id} sastifactoriamente`,
            };
        }
        catch (err) {
            return {
                data: null,
                message: `Se presento el siguiente error al registrar al nuevo usuario: ${err}`,
            };
        }
    });
};
const Transaccion = (0, mongoose_1.model)('Transaccion', transSchema);
exports.default = Transaccion;
