import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

import type { IUser } from 'src/typescript/interfaces/user/user.interfaces';
import type { TDocument } from 'src/typescript/types/users/user.type';
import type { IResponseUser } from 'src/typescript/interfaces/response/response-user.interfaces';

@Controller('API/V1/user')
export class UsersController {
    constructor( public usersService: UsersService ) {};

    @Get('/')
    getWelcome() {
        return {
            message:this.usersService.welcomeAPI("Bienvenido al Servicio de CRUD de Usuarios"),
        };
    };

    @Get('get')
    async getUsers(): Promise<IResponseUser> {
        const response = await this.usersService.getUser();
        return {
            data:response.data,
            message:response.message,
        };
    };

    @Post('add')
    async addUser( @Body() body:IUser ): Promise<IResponseUser> {
        const response = await this.usersService.addUser(body);
        return {
            data:response.data,
            message:response.message,
        };
    };

    @Patch(':id')
    async setIdUser( @Param('id') document:TDocument, @Body() body:IUser ): Promise<IResponseUser> {
        const response = await this.usersService.setUserID(document,body);
        return {
            data:response.data,
            message:response.message,
        };
    };

    @Delete(':id')
    async deleteIdUser( @Param('id') id:TDocument ): Promise<IResponseUser>  {
        const response = await this.usersService.deleteUser(id)
        return {
            data:response.data,
            message:response.message,
        };
    };
};
