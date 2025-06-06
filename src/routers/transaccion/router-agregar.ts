import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import agregarTransaccion from  '../../modules/agregar/agregar-transaccion'

import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const datoTransaccion:ITransaccion = req.body
        const respTransaccion = await agregarTransaccion(datoTransaccion)

        res.status(200).send({
            data:respTransaccion.data,
            message: respTransaccion.message,
        })
    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en el registro de datos: ${err}`,
        })
    }
})

export default Router