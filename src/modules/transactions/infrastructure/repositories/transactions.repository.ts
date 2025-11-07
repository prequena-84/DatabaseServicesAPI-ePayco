import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsEntity } from '../../domain/transactions.entity';
import { TransactionsDTO } from '../../interfaces/dtos/create.transactions.dto';

import type { ITransaction, TResponseDelete } from '../../interfaces/types/transactions.interfaces';

@Injectable()
export class TransactionsRepository {
    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly transactionRepository:Repository<TransactionsEntity>
    ) {};

    welcomeAPI(text:string):string {
        return text;
    };

    async findAllTransactions(): Promise<ITransaction[]> {
        return this.transactionRepository.find();
    };

    async findTransactionById (id:string | undefined): Promise<ITransaction | null> {
        return this.transactionRepository.findOneBy({ id });
    };

    async updateTransactionId ( id:string, data:Partial<ITransaction> ): Promise<ITransaction | null> {
        await this.transactionRepository.update({id}, data);
        const dataTransaction:ITransaction | null = await this.transactionRepository.findOneBy({ id });
        return dataTransaction;
    };

    async createTransaction(dto:TransactionsDTO): Promise<ITransaction> {
        const newTransaction:ITransaction = this.transactionRepository.create(dto);
        return await this.transactionRepository.save(newTransaction);
    };

    async deleteTransaction(id:string): Promise<TResponseDelete> {
        const response:TResponseDelete = await this.transactionRepository.delete({ id });
        return response;
    };
};