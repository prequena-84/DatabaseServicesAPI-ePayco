import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './domain/transactions.entity';
import { TransactionsRepository } from './infrastructure/repositories/transactions.repository';
import { TransactionsController } from './interfaces/controllers/transactions.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([TransactionsEntity]),
  ],
  providers: [TransactionsRepository],
  controllers: [TransactionsController],
  exports:[
    TypeOrmModule,
    TransactionsRepository,
  ],
})
export class TransactionModule {};