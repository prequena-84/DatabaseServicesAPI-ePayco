import { connectDB, mongoose } from '../../config/config-mongo'
import Transaccion from '../../db/models/transaccion'

import type { TIdTransaccion } from 'types/TTransaccion'
import type { ITransaccion, ITrasResp } from 'interfaces/ITransaccion'

export default async function getTransaccion( id:TIdTransaccion, data:ITransaccion ): Promise<ITrasResp> {
    try {
        await connectDB()
        return await Transaccion.actualizarDatoIdTransaccion(id,data)
    } catch(err) {
        return {
            data: null,
            message:`Hubo un Error en la actualización del cliente: ${err}`,
        }
    } finally {
        mongoose.connection.close()
    }
}