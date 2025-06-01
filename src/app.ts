// Importacion de librerias o componentes
import routerInstance from "./class/class-router"
import cors from 'cors'
import { PORT } from './config/config-app'

// Importacio clase del Router
const CS = new routerInstance()
const servidor = CS.Servidor()

servidor.use( cors() )

// Importacion de Tipos o interfaces
import type { TRequest, TResponse } from 'types/TRouter' 

servidor.all( '/', ( _req:TRequest, res:TResponse ) => {
    res.send('Bienvenido a la API de Servicios de ePayco')
})

// Definicion de las rutas de las consultas entre APIs
/*servidor.use( '/customer', CUSTOMER )
servidor.use( '/prescription', PRESCRIPTION )
servidor.use( '/user', USER )
servidor.use('/token', VALIDATE_TOKEN)*/

servidor.listen( PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`) )