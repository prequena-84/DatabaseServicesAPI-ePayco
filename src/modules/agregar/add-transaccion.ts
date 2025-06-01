import { connectDB, mongoose } from '../../config/config-mongo'
import Transaccion from '../../db/models/transaccion'

import type { ITransaccion,ITrasResp } from 'interfaces/ITransaccion'

export default async function agregarTransaccion( dataTrans:ITransaccion ): Promise<ITrasResp> {
    try {
        await connectDB()
        return await Transaccion.createInstance(dataTrans)
    } catch(err) {
        return {
            data: null,
            message:`Hubo un Error en el registro del Usuario: ${err}`,
        }
    } finally {

        mongoose.connection.close()
    }
}