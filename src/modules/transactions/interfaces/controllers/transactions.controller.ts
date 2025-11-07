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
import { TransactionRepository } from '../../infrastructure/repositories/transactions.repository';
import { TransactionsDTO } from '../dtos/create.transactions.dto';
import { DecodeBase64Pipe } from 'src/common/pipes/decode-base64.pipe';
import { DecodeBase64Params } from 'src/common/pipes/decode-base64.params.pipe';

import type { IResponseTransaction } from '../types/response-transactions.interfaces';

@Controller('api/v1/services/db/transactions')
export class TransactionController {
    constructor( public transactionsRepository:TransactionRepository ) {};

    @Get('welcome')
    getWelcome() {
        return {
            message:this.transactionsRepository.welcomeAPI("Bienvenido al Servicio de Transacciones"),
        };
    };

    @Get()
    async getTransaction(): Promise<IResponseTransaction> {
        const data = await this.transactionsRepository.findAllTransactions();
        if (!data.length) throw new NotFoundException('No hay transacciones registrados');

        return {
            data,
            message:'Consulta generada',
        };
    };

    @Get(':id')
    async getIdTransaction( @Param('id', DecodeBase64Params) id:string ):Promise<IResponseTransaction> {
        const data =  await this.transactionsRepository.findTransactionById(id);
        if (!data ) throw new NotFoundException(`No se encontro la transacción con el id ${id}`);

        return {
            data,
            message:`Datos de la transacción: ${data.id}`,
        };
    };

    @Post()
    async addTransaction( @Body( new DecodeBase64Pipe() ) dto:TransactionsDTO ): Promise<IResponseTransaction> {
        try {
            const data = await this.transactionsRepository.createTransaction(dto);
            return {
                data,
                message:`Transacción #${data.id} creada.`,
            };
        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            console.error(err);
            throw new BadRequestException(`No se creo la transacción`);
        };
    };
    
    @Patch(':id')
    async setIdTransaction( @Param('id', DecodeBase64Params) id:string, @Body( new DecodeBase64Pipe() ) dto:TransactionsDTO ): Promise<IResponseTransaction> {
        try {            
            const validateTransaction = await this.transactionsRepository.findTransactionById(id)
            if ( !validateTransaction ) throw new NotFoundException('Transacción no encontrada');

            const data = await this.transactionsRepository.updateTransactionId(id, dto);
            return {
                data,
                message:`Transacción ${data?.id} actualizada`,
            };

        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            throw new InternalServerErrorException(`No se actualizo la transacción`);
        };
    };

    @Delete(':id')
    async deleteIdTransaction( @Param('id', DecodeBase64Params) id:string ): Promise<IResponseTransaction>  {
        try {
            const validateUser = await this.transactionsRepository.findTransactionById(id)
            if ( !validateUser ) throw new NotFoundException('Transacción no encontrada');

            const data = await this.transactionsRepository.deleteTransaction(id);
            return {
                data:data.raw,
                message:data.affected ? `Eliminación correcta, Documentos afectados ${data.affected}` : `Eliminación incorrecta, Documentos afectados ${data.affected}`,
            };
        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            throw new InternalServerErrorException(`No se pudo eliminar la transacción`);
        };
    };
};