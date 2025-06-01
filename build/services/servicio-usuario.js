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
// Importación de class Router y Servidor
const class_router_1 = __importDefault(require("../class/class-router"));
// Servicios VRouter Servicios
const router_agregar_1 = __importDefault(require("../routers/usuario/router-agregar"));
const router_modificar_1 = __importDefault(require("../routers/usuario/router.modificar"));
// Instancia de la clase Servido y Router
const CR = new class_router_1.default(), Router = CR.Router();
// Importación de la descripcion del servicio
Router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({
            message: 'Bienvenido al Servicio de Clientes',
        });
    }
    catch (err) {
        res.status(500).send({
            mensaje: `error en la peticion: ${err}`,
        });
    }
}));
Router.use('/agregar', router_agregar_1.default);
Router.use('/actualizar', router_modificar_1.default);
exports.default = Router;
