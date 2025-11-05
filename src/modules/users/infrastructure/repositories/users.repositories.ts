import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { usersEntity } from '../../domain/users.entity';

import type { IUser } from 'src/modules/users/interfaces/user.interfaces';
import type { IResponseUser } from '../../interfaces/response-user.interfaces';

@Injectable()
export class UsersRepository {
    constructor( 
        @InjectRepository(usersEntity)
        private readonly userRepository:Repository<usersEntity>
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async findAllUsers(): Promise<IUser[]> {
       return this.userRepository.update;  
    };

    async findUserById (document:TDocument): Promise<IResponseUser> {
        const response:IUser = await this.userModel.findOne({ document }) as IUser;
        return {
            data:response,
            message:`Se obtenido los datos del Cliente: ${response.name} sastifactoriamente`,
        };
    };

    async updateUserID ( document:TDocument, data:IUser ): Promise<IResponseUser> {
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