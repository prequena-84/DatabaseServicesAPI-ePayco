import { connectDB, mongoose } from '../../config/config-mongo'
import Usuario from '../../db/models/usuario'

import type { TIdUsuario } from 'types/TUsuario'
import type { IUsuario, IUsuarioResp } from 'interfaces/IUsuario'

export default async function getUsuario( documento:TIdUsuario, data:IUsuario ): Promise<IUsuarioResp> {
    try {
        await connectDB()
        return await Usuario.actualizarDatoIdUsuario(documento,data)
    } catch(err) {
        return {
            data: null,
            message:`Hubo un Error en la actualización del cliente: ${err}`,
        }
    } finally {
        mongoose.connection.close()
    }
}