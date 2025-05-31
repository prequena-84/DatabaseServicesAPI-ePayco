"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importacion de librerias o componentes
const class_router_1 = __importDefault(require("./class/class-router"));
const cors_1 = __importDefault(require("cors"));
const config_app_1 = require("./config/config-app");
// Importacio clase del Router
const CS = new class_router_1.default();
const servidor = CS.Servidor();
servidor.use((0, cors_1.default)());
servidor.all('/', (_req, res) => {
    res.send('Bienvenido a la API de Servicios de Optica ARANA');
});
/*servidor.use( '/customer', CUSTOMER )
servidor.use( '/prescription', PRESCRIPTION )
servidor.use( '/user', USER )
servidor.use('/token', VALIDATE_TOKEN)*/
servidor.listen(config_app_1.PORT, () => console.log(`Servidor corriendo en: http://localhost:${config_app_1.PORT}`));
