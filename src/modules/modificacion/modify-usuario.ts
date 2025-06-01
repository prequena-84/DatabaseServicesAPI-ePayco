import { connectDB, mongoose } from '../../config/config-mongo'
import Usuario from '../../db/models/usuario'

import type { TIdusuario } from 'types/TUsuario'
import type { IUsuario, IUsuarioResp } from 'interfaces/IUsuario'

export default async function getUsuario( documento:TIdusuario, data:IUsuario ): Promise<IUsuarioResp> {
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