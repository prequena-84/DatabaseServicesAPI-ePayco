import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

import type { IUser } from 'src/typescript/interfaces/user/user.interfaces';
import type { TDocument } from 'src/typescript/types/users/user.type';
import type { IResponseUser } from 'src/typescript/interfaces/response/response-user.interfaces';

@Controller('API/V1/users')
export class UsersController {
    constructor( public usersService: UsersService ) {};

    getWelcome() {
        return this.usersService.welcomeAPI("Bienvenido al Servicio de CRUD de Usuarios")
    };

    @Get('get')
    getUsers() {
        return this.usersService.getUser();
    };

}
