import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import consultaIdTransaccion from  '../../modules/consulta/consulta-transaccionID'

import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())


Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {

        const datoIdTransaccion:ITransaccion = req.body.datoDocumento.idTransaccion
        const response = await consultaIdTransaccion(datoIdTransaccion)

        res.status(200).send({
            data:response.data,
            message: response.message,
        })
    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en la consulta de datos: ${err}`,
        })
    }
})

export default Router