import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import type { ITransaction } from 'src/typescript/interfaces/transaction/transaction.interfaces';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';
import type { IResponseTransaction } from 'src/typescript/interfaces/response/response-transaction';

@Controller('transaction')
export class TransactionController {
    constructor( public transactionService:TransactionService ) {};

    @Get('/')
    getWelcome() {
        return {
            message:this.transactionService.welcomeAPI("Bienvenido al Servicio de CRUD de Transacciones"),
        };
    };

    @Get('get')
    async getUsers(): Promise<IResponseTransaction> {
        const response = await this.transactionService.getTransaction();
        return {
            data:response.data,
            message:response.message,
        };
    };

    @Post('add')
    async addUser( @Body() body:ITransaction ): Promise<IResponseTransaction> {
        const response = await this.transactionService.addTransaction(body);
        return {
            data:response.data,
            message:response.message,
        };
    };

    @Delete(':id')
    async deleteIdUser( @Param('id') id:TIdTransaction ): Promise<IResponseTransaction>  {
        const response = await this.transactionService.deleteTransaction(id)
        return {
            data:response.data,
            message:response.message,
        };
    };

    @Patch(':id')
    async setIdUser( @Param('id') id:TIdTransaction, @Body() body:ITransaction ): Promise<IResponseTransaction> {
        const response = await this.transactionService.setTransactionID(id,body);
        return {
            data:response.data,
            message:response.message,
        };
    };
}
