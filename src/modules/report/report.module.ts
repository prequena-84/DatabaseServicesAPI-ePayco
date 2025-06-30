import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsTransaction, TransactionSchema } from '../transaction/schemas/transactions.schemas';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: ModelsTransaction.name, schema:TransactionSchema }])
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports:[ReportService],
})
export class ReportModule {};