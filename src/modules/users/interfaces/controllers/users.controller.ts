import { 
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Patch,
    NotFoundException,
    BadRequestException,  
    ConflictException,
    InternalServerErrorException,
    HttpException,
} from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { UsersDTO } from '../dtos/create.users.dto';
import { DecodeBase64Pipe } from 'src/common/pipes/decode-base64.pipe';
import { DecodeBase64NumberParams } from 'src/common/pipes/decode-base64-number.params.pipe';

import type { IResponseUser } from '../types/response-users.interfaces';

@Controller('api/v1/service/db/users')
export class UsersController {
    constructor( public usersRepository: UsersRepository ) {};

    @Get('Welcome')
    getWelcome() {
        return {
            message:this.usersRepository.welcomeAPI("Bienvenido al Servicio Clientes"),
        };
    };

    @Get()
    async getUsers(): Promise<IResponseUser> {
        const data = await this.usersRepository.findAllUsers();

        return {
            data,
            message:data.length ? 'Consulta generada' : 'No hay clientes registrados',
        };
    };

    @Get(':document')
    async getIdUser( @Param('document', DecodeBase64NumberParams) document:number ):Promise<IResponseUser> {
        const data = await this.usersRepository.findUserById(document);
        if (!data ) throw new NotFoundException(`No se encontro el Cliente con el id ${document}`);

        return {
            data,
            message:`Datos del cliente: ${data.name}`,
        };
    };

    @Post()
    async addUser( @Body( new DecodeBase64Pipe() ) dto:UsersDTO ): Promise<IResponseUser> {
        try {
            const validateUser = await this.usersRepository.findUserById(dto.document);
            if (validateUser) throw new ConflictException(`Cliente ya registrado`);

            const data = await this.usersRepository.createUser(dto);
            return {
                data,
                message:`Cliente ${data.name} creado.`,
            };
        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            console.error(err);
            throw new BadRequestException(`No se creo el Cliente`);
        };
    };

    @Patch(':document')
    async setIdUser( @Param('document', DecodeBase64NumberParams ) document:number, @Body( new DecodeBase64Pipe() ) dto:UsersDTO ): Promise<IResponseUser> {
        try {
            const validateUser = await this.usersRepository.findUserById(document);
            if ( !validateUser ) throw new NotFoundException('Cliente no encontrado');

            const data = await this.usersRepository.updateUserID(document, dto);
            return {
                data,
                message:`Cliente ${data?.name} actualizado`,
            };

        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            throw new InternalServerErrorException(`No se actualizo el cliente`);
        };
    };

    @Delete(':document')
    async deleteIdUser( @Param('document', DecodeBase64NumberParams) document:number ): Promise<IResponseUser>  {
        try {
            const validateUser = await this.usersRepository.findUserById(document);
            if ( !validateUser ) throw new NotFoundException('Cliente no encontrado');

            const data = await this.usersRepository.deleteUser(document);
            return {
                data:data.raw,
                message:data.affected ? `Eliminación correcta, Documentos afectados ${data.affected}` : `Eliminación incorrecta, Documentos afectados ${data.affected}`,
            };
        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            throw new InternalServerErrorException(`No se pudo eliminar el cliente`);
        };
    };
};