import { connectDB, mongoose } from '../../config/config-mongo'
import Usuario from '../../db/models/usuario'

import type { IUsuario, IUsuarioResp } from 'interfaces/IUsuario'

export default async function consultaUsuario( documento:IUsuario ): Promise<IUsuarioResp> {
    try { 
        await connectDB()
        return {
            data: await Usuario.findOne( {documento:documento} ),
            message:'Se ha realizado la consulta sastifactoriamente'
        };

    } catch(err) {
        return {
            data: null,
            message:`Hubo un Error en el registro del Usuario: ${err}`,
        }
    } finally {

        mongoose.connection.close()
    }
}