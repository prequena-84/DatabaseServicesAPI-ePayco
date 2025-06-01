import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import getTransaccion from '../../modules/modificacion/modify-transaccion'

import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const 
            datoTransaccion:ITransaccion = req.body,
            responseTransaccion = await getTransaccion(datoTransaccion.id, datoTransaccion)

        res.status(200).send({
            data:responseTransaccion.data,
            message: responseTransaccion.message,
        })
    } catch(err) {
        
        res.status(500).send({
            data:null,
            message:`Error en la actualización de datos del cliente: ${err}`,
        })
    }
})

export default Router;