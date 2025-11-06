/*import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsTransaction,TransactionSchema } from './schemas/transactions.schemas';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  imports:[
    MongooseModule.forFeature([ {name:ModelsTransaction.name, schema:TransactionSchema} ])
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports:[
    TransactionService,
    MongooseModule,
  ],
})
export class TransactionModule {};*/