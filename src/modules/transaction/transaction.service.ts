import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsTransaction, ITransactionModels } from './schemas/transactions.schemas';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';
import type { ITransaction } from 'src/typescript/interfaces/transaction/transaction.interfaces';
import type { IResponseTransaction } from 'src/typescript/interfaces/response/response-transaction';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(ModelsTransaction.name)
        private readonly transactionModel:ITransactionModels
    ) {};

    welcomeAPI(text:string):string {
        return text;
    };

    async getTransaction(): Promise<IResponseTransaction> {
        const data:ITransaction[] = await this.transactionModel.allTransaction()
        return {
            data: data,
            message: 'Se ha obtenido todos los Usuarios sastifactoriamente',
        };
    };

    async getTransactionId (id:TIdTransaction): Promise<IResponseTransaction> {
        const response:ITransaction = await this.transactionModel.findOne({ id }) as ITransaction;
        return {
            data:response,
            message:`Se obtenido los datos de la transacción: ${response.id} sastifactoriamente`,
        };
    };

    async setTransactionID ( id:TIdTransaction, data:ITransaction ): Promise<IResponseTransaction> {
        const response:ITransaction = await this.transactionModel.updateIdTransaction(id,data);
        return {
            data: response,
            message:`Se actualizo los datos de la transferencia: ${response.id} sastifactoriamente`,
        };
    };

    async addTransaction(data:ITransaction): Promise<IResponseTransaction> {
        const response:ITransaction = await this.transactionModel.createInstance(data);
        return {
            data:response,
            message:`Se registro la transacción #${response.id} sastifactoriamente`,
        };
    };

    async deleteTransaction(id:TIdTransaction): Promise<IResponseTransaction> {
        const response = await this.transactionModel.deleteOne({ id });
        return {
            data:null,
            message:response.acknowledged ? `Eliminación correcta, Documentos afectados ${response.deletedCount}` : `Eliminación incorrecta, Documentos afectados ${response.deletedCount}`,
        };
    };
};