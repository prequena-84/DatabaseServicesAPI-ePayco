import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsUsers, IUserModels } from './schemas/users.schema';

import type { TDocument } from 'src/modules/users/typescript/types/user.type';
import type { IUser } from 'src/modules/users/typescript/interfaces/user.interfaces';
import type { IResponseUser } from './typescript/interfaces/response-user.interfaces';

@Injectable()
export class UsersService {
    constructor( 
        @InjectModel(ModelsUsers.name)
        private readonly userModel:IUserModels
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async getUser(): Promise<IResponseUser> {
        const data:IUser[] = await this.userModel.allUsers();
        return {
            data: data,
            message: 'Se ha obtenido todos los Usuarios sastifactoriamente',
        };
    };

    async getUserId (document:TDocument): Promise<IResponseUser> {
        const response:IUser = await this.userModel.findOne({ document }) as IUser;
        return {
            data:response,
            message:`Se obtenido los datos del Cliente: ${response.name} sastifactoriamente`,
        };
    };

    async setUserID ( document:TDocument, data:IUser ): Promise<IResponseUser> {
        const response:IUser = await this.userModel.updateIdUser(document,data);
        return {
            data: response,
            message:`Se actualizo los datos del usuario: ${response.name} sastifactoriamente`,
        };
    };

    async addUser(data:IUser): Promise<IResponseUser> {
        const response:IUser = await this.userModel.createInstance(data);
        return {
            data:response,
            message:`Se registro el Usuario ${response.name} sastifactoriamente`,
        };
    };

    async deleteUser(document:TDocument): Promise<IResponseUser> {
        const response = await this.userModel.deleteOne({ document });
        return {
            data:null,
            message:response.acknowledged ? `Eliminación correcta, Documentos afectados ${response.deletedCount}` : `Eliminación incorrecta, Documentos afectados ${response.deletedCount}`,
        };
    };
};