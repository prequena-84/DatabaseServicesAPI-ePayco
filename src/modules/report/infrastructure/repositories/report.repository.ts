import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsEntity } from 'src/modules/transactions/domain/transactions.entity';

@Injectable()
export class ReportRepository {
    constructor( 
        @InjectRepository(TransactionsEntity)
        private readonly reportRepository:Repository<TransactionsEntity>
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };
  
    async reportTransactions() {
        const report = await this.reportRepository
            .createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.user','user')
            .getMany();
        return report;
    };
};