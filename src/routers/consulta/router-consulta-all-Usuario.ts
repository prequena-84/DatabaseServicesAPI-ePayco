import { connectDB,mongoose } from '../../config/config-mongo'
import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import Usuario from '../../db/models/usuario'

import type { IUsuario } from 'interfaces/IUsuario'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.get('/', async ( _req:TRequest, res:TResponse ): Promise<void> => {
    try {

        await connectDB()
        const response:IUsuario[] = await Usuario.todosLosUsuario()

        res.status(200).send({
            data:response,
            message: 'Se realizo la consulta sastifactoriamente',
        })
    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en la consulta de datos: ${err}`,
        })
    } finally {
        mongoose.connection.close()
    }
})

export default Router