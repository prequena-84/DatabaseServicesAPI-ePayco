import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsUsers, IUserModels } from './schemas/users.schema';

import type { TDocument } from 'src/typescript/types/users/user.type';
import type { IUser } from 'src/typescript/interfaces/user/user.interfaces';
import type { IResponseUser } from 'src/typescript/interfaces/response/response-user.interfaces';

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
        try {
            const data:IUser[] = await this.userModel.allUsers();
            return {
                data: data,
                message: 'Se ha obtenido todos los Usuarios sastifactoriamente',
            };
        } catch(err) {
            return {
                data: null,
                message:`Se presento el siguiente Error en la actualizacion de datos: ${err}`,
            };
        };
    };

    async setUserID ( document:TDocument, data:IUser ): Promise<IResponseUser> {
        try {
            const response:IUser = await this.userModel.updateIdUser(document,data);
            return {
                data: response,
                message:`Se actualizo los datos del usuario: ${response.name} sastifactoriamente`,
            };
        } catch(err) {      
            return {
                data:null,
                message:`Se presento el siguiente Error en la actualizacion de datos: ${err}`,
            };
        };
    };

    async addUser(data:IUser): Promise<IResponseUser> {
        try {
            const response:IUser = await this.userModel.createInstance(data);
            return {
                data:response,
                message:`Se registro el Usuario ${response.name} sastifactoriamente`,
            };
        } catch(err) {
            return {
                data:null,
                message:`Se presento el siguiente error al registrar al nuevo usuario: ${err}`,
            };
        };
    };
};