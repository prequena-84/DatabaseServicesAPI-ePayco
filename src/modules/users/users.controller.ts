import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './infrastructure/repositories/users.repositories';

import type { IUser } from 'src/modules/users/interfaces/user.interfaces';
import type { TDocument } from 'src/modules/users/typescript/types/user.type';
import type { IResponseUser } from './interfaces/response-user.interfaces';

@Controller('DatabaseServicesAPI/V1/user')
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
        const data = await this.usersService.getUser();

        

        return {
            data,
            message:'Se ha obtenido todos los Usuarios sastifactoriamente',
        };
    };

    @Get('get/:id')
    async getIdUser( @Param('id') id:TDocument ):Promise<IResponseUser> {
        const response = await this.usersService.getUserId(id);
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