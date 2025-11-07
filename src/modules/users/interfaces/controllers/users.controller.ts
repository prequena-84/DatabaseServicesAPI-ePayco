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
} from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import type { IResponseUser } from '../types/response-user.interfaces';
import { UsersDTO } from '../dtos/create.users.dto';
import { DecodeBase64Pipe } from 'src/common/pipes/decode-base64.pipe';
import { DecodeBase64Params } from 'src/common/pipes/decode-base64.params.pipe';

@Controller('api/v1/services/db/users')
export class UsersController {
    constructor( public usersRepository: UsersRepository ) {};

    @Get()
    getWelcome() {
        return {
            message:this.usersRepository.welcomeAPI("Bienvenido al Servicio de CRUD de Usuarios"),
        };
    };

    @Get()
    async getUsers(): Promise<IResponseUser> {
        const data = await this.usersRepository.findAllUsers();
        if (!data.length) throw new NotFoundException('No se han encontrado registro de usuarios existentes');

        return {
            data,
            message:'Se ha obtenido todos los Usuarios sastifactoriamente',
        };
    };

    @Get(':id')
    async getIdUser( @Param('id', DecodeBase64Params) id:number ):Promise<IResponseUser> {
        const data = await this.usersRepository.findUserById(id);
        if (!data ) throw new NotFoundException(`No se han encontrado el cliente con el registro ${id}`);

        return {
            data,
            message:`Se obtenido los datos del Cliente: ${data.name} sastifactoriamente`,
        };
    };

    @Post(':id')
    async addUser( @Body( new DecodeBase64Pipe() ) dto:UsersDTO ): Promise<IResponseUser> {
        try {
            const validateUser = await this.getIdUser(dto.document)
            if (validateUser) throw new ConflictException(`El usuario ya se encuentra creado, por favor revise la información`);

            const data = await this.usersRepository.createUser(dto);
            return {
                data,
                message:`Se registro el Usuario ${data.name} sastifactoriamente`,
            };
        } catch(err) {
            throw new BadRequestException(`No se pudo crear el usuario, por favor revise los datos`);
        };
    };

    @Patch(':id')
    async setIdUser( @Param('id', DecodeBase64Params) id:number, @Body() dto:UsersDTO ): Promise<IResponseUser> {
        try {
            const validateUser = await this.getIdUser(id);
            if ( !validateUser ) throw new NotFoundException('Usuario no encontrado');

            const data = await this.usersRepository.updateUserID(id, dto);
            return {
                data,
                message:`Se actualizo los datos del usuario: ${data?.name} sastifactoriamente`,
            };

        } catch(err) {
            throw new BadRequestException('No se pudo actualizar el usuario')
        };
    };

    @Delete(':id')
    async deleteIdUser( @Param('id', DecodeBase64Params) id:number ): Promise<IResponseUser>  {
        try {
            const validateUser = await this.getIdUser(id);
            if ( !validateUser ) throw new NotFoundException('Usuario no encontrado');

            const data = await this.usersRepository.deleteUser(id);
            return {
                data:data.raw,
                message:data.affected ? `Eliminación correcta, Documentos afectados ${data.affected}` : `Eliminación incorrecta, Documentos afectados ${data.affected}`,
            };
        } catch(err) {
            throw new InternalServerErrorException('No se pudo eliminar el usuario, por favor revise los datos ingresados');
        };
    };
};