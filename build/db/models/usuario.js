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
Object.defineProperty(exports, "__esModule", { value: true });
// Importacion componentes de mongoose
const mongoose_1 = require("mongoose");
// creacion del esquema
const usuarioSchema = new mongoose_1.Schema({
    documento: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    celular: {
        type: String,
        unique: true,
        required: true
    },
    saldo: {
        type: Number,
        unique: true,
        required: true
    },
});
// consulta todos los usuarios
usuarioSchema.statics.todosLosUsuario = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.find();
    });
};
usuarioSchema.statics.actualizarDatoIdUsuario = function (documento, datoActualizado) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nuevDatoUsuario = yield this.findOneAndUpdate({ documento }, datoActualizado, { new: true });
            return {
                data: nuevDatoUsuario,
                message: `Se actualizo los datos del usuario #${nuevDatoUsuario.nombre} sastifactoriamente`,
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
usuarioSchema.statics.createInstance = function (datoUsuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { documento, nombre, email, celular, saldo, } = datoUsuario;
            const nuevoUsuario = new this({
                documento,
                nombre,
                email,
                celular,
                saldo,
            });
            yield nuevoUsuario.save();
            return {
                data: nuevoUsuario,
                message: `Se registro el Usuario #${nuevoUsuario.nombre} sastifactoriamente`,
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
const Usuario = (0, mongoose_1.model)('usuario', usuarioSchema);
exports.default = Usuario;
