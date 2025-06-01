import { connectDB, mongoose } from '../../config/config-mongo'
import usuario from '../../db/models/usuario'

import type { IUsuario, IUsuarioResp } from 'interfaces/IUsuario'

export default async function agregarUsuario( datausuario:IUsuario ): Promise<IUsuarioResp> {
    try {
        await connectDB()
        return await usuario.createInstance(datausuario)
    } catch(err) {
        return {
            data: null,
            message:`Hubo un Error en el registro del Usuario: ${err}`,
        }
    } finally {

        mongoose.connection.close()
    }
}