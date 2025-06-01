// Importacion componentes de mongoose
import { Schema, model } from 'mongoose'

// Importacion de Tipos o interfaces
import type { TIdUsuario } from 'types/TUsuario'
import type { IUsuario, IUsuarioDocument, IUsuarioModel, IUsuarioResp  } from 'interfaces/IUsuario' 

// creacion del esquema
const usuarioSchema = new Schema<IUsuarioDocument> ({
    documento :{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    nombre:{ 
        type: String, 
        required: true
    }, 
    email:{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    celular:{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    saldo:{ 
        type: Number, 
        required: false,
        default:0,
    }, 
})

// consulta todos los usuarios
usuarioSchema.statics.todosLosUsuario = async function (): Promise<IUsuario[]> {
    return await this.find()
}

usuarioSchema.statics.actualizarDatoIdUsuario = async function( documento:TIdUsuario, datoActualizado:IUsuario ): Promise<IUsuarioResp> {
    try {
        const nuevDatoUsuario = await this.findOneAndUpdate(
            {documento},
            datoActualizado,
            {new:true}
        )

        return {
            data:nuevDatoUsuario,
            message: `Se actualizo los datos del usuario #${nuevDatoUsuario.nombre} sastifactoriamente`,
        }
    } catch(err) {
        return {
            data:null,
            message:`Se presento el siguiente Error en la actualizacion de datos: ${err}`,
        }
    }
}

// Registro de Usuarios
usuarioSchema.statics.createInstance = async function(datoUsuario:IUsuario): Promise<IUsuarioResp> {

    try {
        const {
            documento,
            nombre, 
            email, 
            celular, 
        } = datoUsuario

        const nuevoUsuario = new this({
            documento,
            nombre, 
            email, 
            celular,
        })

        await nuevoUsuario.save()

        return {
            data:nuevoUsuario,
            message:`Se registro el Usuario ${nuevoUsuario.nombre} sastifactoriamente`,
        }
    } catch(err) {

        return {
            data:null,
            message:`Se presento el siguiente error al registrar al nuevo usuario: ${err}`,
        }
    }
}

const Usuario= model<IUsuarioDocument, IUsuarioModel>('usuario', usuarioSchema)
export default Usuario