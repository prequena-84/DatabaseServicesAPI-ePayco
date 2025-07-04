import { Document, Model } from "mongoose"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { TDocument,TName,TEmail,TPhone,TBalance } from "src/typescript/types/users/user.type"
import type { IUser } from "src/typescript/interfaces/user/user.interfaces"

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
    updateIdUser(document:TDocument, data:IUser): Promise<IUser>;
    createInstance(data:IUser): Promise<IUser>;
};

UserSchema.statics.allUsers = async function() {
    const response:IUser[] =  await this.find();
    return response;
};

UserSchema.statics.updateIdUser = async function( document:TDocument, data:IUser ): Promise<IUser> {
    const userData:IUser = await this.findOneAndUpdate({document}, data, {new:true});
    return userData;
};

UserSchema.statics.createInstance = async function(data:IUser): Promise<IUser> {
    const { document,name,email,phone }:IUser = data, newUser = new this({ document,name,email,phone });
    await newUser.save()
    return newUser;
};