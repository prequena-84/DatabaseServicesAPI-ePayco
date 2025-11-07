import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from '../../domain/users.entity';
import { UsersDTO } from '../../interfaces/dtos/create.users.dto';
import type { IUser, TResponseDelete } from 'src/modules/users/interfaces/types/users.interfaces';

@Injectable()
export class UsersRepository {
    constructor( 
        @InjectRepository(UsersEntity)
        private readonly userRepository:Repository<UsersEntity>
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async findAllUsers(): Promise<IUser[]> {
       return this.userRepository.find();  
    };

    async findUserById (document:number): Promise<IUser | null> {
        return this.userRepository.findOneBy({ document });
    };

    async updateUserID ( document:number, data:Partial<IUser> ): Promise<IUser | null> {
        await this.userRepository.update({document}, data );
        const dataUser:IUser | null = await this.userRepository.findOneBy({document});
        return dataUser;
    };

    async createUser(dto:UsersDTO): Promise<IUser> {
        const newUser:IUser = this.userRepository.create(dto);
        return await this.userRepository.save(newUser);
    };

    async deleteUser(document:number): Promise<TResponseDelete> {
        const response:TResponseDelete = await this.userRepository.delete({ document });
        return response;
    };
};