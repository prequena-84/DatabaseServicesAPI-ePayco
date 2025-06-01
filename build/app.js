"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importacion de librerias o componentes
const class_router_1 = __importDefault(require("./class/class-router"));
const cors_1 = __importDefault(require("cors"));
const config_app_1 = require("./config/config-app");
// Importación Servicios del modulo de Cliente
const servicio_usuario_1 = __importDefault(require("./services/servicio-usuario"));
const servicio_usuario_2 = __importDefault(require("./services/servicio-usuario"));
// Importacio clase del Router
const CS = new class_router_1.default();
const servidor = CS.Servidor();
servidor.use((0, cors_1.default)());
servidor.all('/', (_req, res) => {
    res.send('Bienvenido a la API de Servicios de ePayco');
});
// Definicion de las rutas de las consultas entre APIs
servidor.use('/usuario', servicio_usuario_1.default);
servidor.use('/transaccion', servicio_usuario_2.default);
servidor.listen(config_app_1.PORT, () => console.log(`Servidor corriendo en: http://localhost:${config_app_1.PORT}`));
