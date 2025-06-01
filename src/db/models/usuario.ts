// Importacion componentes de mongoose
import { Schema, model } from 'mongoose'

// Importacion de Tipos o interfaces
import type { TIdusuario } from 'types/TUsuario'
import type { IUsuario, IUsuarioDocument, IUsuarioModel, IUsuarioResp  } from 'interfaces/IUsuario' 

// creacion del esquema
const usuarioSchema = new Schema<IUsuarioDocument> ({
    id:{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    documento :{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    nombre:{ 
        type: String, 
        unique: true, 
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
        unique: true, 
        required: true
    }, 
})

// consulta todos los usuarios
usuarioSchema.statics.todosLosUsuario = async function (): Promise<IUsuario[]> {
    return await this.find()
}

usuarioSchema.statics.actualizarDatoIdUsuario = async function( id:TIdusuario, datoActualizado:IUsuario ): Promise<IUsuarioResp> {
    try {
        const nuevDatoUsuario = await this.findOneAndUpdate(
            {id},
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
            id,
            documento,
            nombre, 
            email, 
            celular, 
            saldo, 
        }: IUsuario  = datoUsuario

        const nuevoUsuario = new this({
            id,
            documento,
            nombre, 
            email, 
            celular, 
            saldo, 
        })

        await nuevoUsuario.save()

        return {
            data:nuevoUsuario,
            message:`Se registro el Usuario #${nuevoUsuario.nombre} sastifactoriamente`,
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