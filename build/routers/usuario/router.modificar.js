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
const body_parser_1 = __importDefault(require("body-parser"));
const class_router_1 = __importDefault(require("../../class/class-router"));
const modify_usuario_1 = __importDefault(require("../../modules/modificacion/modify-usuario"));
const CR = new class_router_1.default(), Router = CR.Router();
Router.use(body_parser_1.default.json());
Router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datoUsuario = req.body, responseUsuario = yield (0, modify_usuario_1.default)(datoUsuario.id, datoUsuario);
        res.status(200).send({
            data: responseUsuario.data,
            message: responseUsuario.message,
        });
    }
    catch (err) {
        res.status(500).send({
            data: null,
            message: `Error en la actualización de datos del cliente: ${err}`,
        });
    }
}));
exports.default = Router;
