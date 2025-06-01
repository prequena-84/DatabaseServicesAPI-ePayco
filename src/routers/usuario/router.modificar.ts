import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import getUsuario from '../../modules/modificacion/modify-usuario'

import type { IUsuario } from 'interfaces/IUsuario'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const 
            datoUsuario:IUsuario = req.body,
            responseUsuario = await getUsuario(datoUsuario.id, datoUsuario)

        res.status(200).send({
            data:responseUsuario.data,
            message: responseUsuario.message,
        })
    } catch(err) {
        
        res.status(500).send({
            data:null,
            message:`Error en la actualización de datos del cliente: ${err}`,
        })
    }
})

export default Router;