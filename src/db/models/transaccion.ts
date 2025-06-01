// Importacion componentes de mongoose
import { Schema, model } from 'mongoose'

// Importacion de Tipos o interfaces
import type { TIdTransaccion } from 'types/TTransaccion'
import type { ITransaccion, ITransDocument, ITransModel, ITrasResp  } from 'interfaces/ITransaccion' 

// creacion del esquema
const transSchema = new Schema<ITransDocument> ({
    id:{ 
        type: Number, 
        unique: true, 
        required: true
    }, 
    user_id :{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    tipo:{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    monto:{ 
        type: Number, 
        unique: true, 
        required: true
    }, 
    status:{ 
        type: String, 
        unique: true, 
        required: true
    }, 
    token_confirmacion:{ 
        type: String, 
        unique: true, 
    }, 
    session_id:{ 
        type: String, 
        unique: true, 
    }, 
})

// consulta todos los usuarios
transSchema.statics.todasLasTransacciones = async function (): Promise<ITransaccion[]> {
    return await this.find()
}

transSchema.statics.actualizarDatoIdTransaccion = async function( id:TIdTransaccion, datoActualizado:ITransaccion ): Promise<ITrasResp> {
    try {
        const nuevaTransaccion = await this.findOneAndUpdate(
            {id},
            datoActualizado,
            {new:true}
        )

        return {
            data:nuevaTransaccion,
            message: `Se actualizo los datos del usuario #${nuevaTransaccion.id} sastifactoriamente`,
        }
    } catch(err) {
        return {
            data:null,
            message:`Se presento el siguiente Error en la actualizacion de datos: ${err}`,
        }
    }
}

// Registro de Usuarios
transSchema.statics.createInstance = async function(datoTransaccion:ITransaccion): Promise<ITrasResp> {
    try {
        const {
            id, 
            user_id, 
            tipo, 
            monto, 
            status,
            token_confirmacion, 
            session_id, 
        }: ITransaccion = datoTransaccion

        const nuevaTransacion = new this({
            id, 
            user_id, 
            tipo, 
            monto, 
            status,
            token_confirmacion, 
            session_id 
        })

        await nuevaTransacion.save()

        return {
            data:nuevaTransacion,
            message:`Se registro la transaccion #${nuevaTransacion.id} sastifactoriamente`,
        }

    } catch(err) {

        return {
            data:null,
            message:`Se presento el siguiente error al registrar al nuevo usuario: ${err}`,
        }
    }
}

const Transaccion = model<ITransDocument, ITransModel>('Transaccion', transSchema)
export default Transaccion