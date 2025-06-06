import { connectDB, mongoose } from '../../config/config-mongo'
import Transaccion from '../../db/models/transaccion'

import type { ITransaccion, ITrasResp } from 'interfaces/ITransaccion'

export default async function consultaIdTransaccion( id:ITransaccion ): Promise<ITrasResp> {
    try { 
        await connectDB()

        return {
            data: await Transaccion.findOne( {id:id} ),
            message:'Se ha realizado la consulta sastifactoriamente'
        }
    } catch(err) {
        
        return {
            data: null,
            message:`Hubo un Error en la consulta de transaccion: ${err}`,
        }
    } finally {

        mongoose.connection.close()
    }
}