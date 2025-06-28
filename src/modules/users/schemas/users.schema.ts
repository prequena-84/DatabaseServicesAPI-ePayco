import { Document, Model } from "mongoose"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { TDocument,TName,TEmail,TPhone,TBalance } from "src/typescript/types/users/user.type"
import type { IUser } from "src/typescript/interfaces/user/user.interfaces"
import type { IResponseUser } from "src/typescript/interfaces/response/response-user.interfaces"

@Schema()
export class ModelsUsers implements IUser {
    @Prop({ required:true, unique:true })
    document:TDocument

    @Prop({ required:true })
    name:TName

    @Prop({ required:true, unique:true })
    email:TEmail

    @Prop({ required:true, unique:true })
    phone:TPhone

    @Prop({ required:false, default:0 })
    balance:TBalance
}
export type UserDocument = ModelsUsers & Document
export const UserSchema = SchemaFactory.createForClass(ModelsUsers)

export interface IUserModels extends Model<UserDocument> {
    allUsers(): Promise<IUser[]>;
    updateIdUser(document:TDocument, data:IUser): Promise<IResponseUser>;
    createInstance(data:IUser): Promise<IResponseUser>;
}

UserSchema.statics.allUsers = async function():Promise<IResponseUser | null> {
    try {
        return {
            data: await this.find(),
            message: 'Se ha obtenido todos los Usuarios sastifactoriamente',
        }
    } catch(err) {
        return {
            data:null,
            message:`Se presento el siguiente Error en la actualizacion de datos: ${err}`,
        }
    }
}

UserSchema.statics.updateIdUser = async function( document:TDocument, data:IUser ): Promise<IResponseUser | null> {
    try {
        const userData:IUser = await this.findOneAndUpdate({document}, data, {new:true})
        return {
            data: userData,
            message:`Se actualizo los datos del usuario: ${userData.name} sastifactoriamente`,
        }
    } catch(err) {
        return {
            data:null,
            message:`Se presento el siguiente Error en la actualizacion de datos: ${err}`,
        }
    }
}

UserSchema.statics.createInstance = async function(data:IUser): Promise<IResponseUser> {
    try {
        const { document,name,email,phone }:IUser = data
        const newUser = new this({ document,name,email,phone })
        await newUser.save()

        return {
            data:newUser,
            message:`Se registro el Usuario ${newUser.name} sastifactoriamente`,
        }
    } catch(err) {
                return {
            data:null,
            message:`Se presento el siguiente error al registrar al nuevo usuario: ${err}`,
        }
    }
}