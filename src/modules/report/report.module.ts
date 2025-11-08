import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from '../transactions/domain/transactions.entity';
import { ReportRepository } from './infrastructure/repositories/report.repository';
import { ReportController } from './interfaces/controller/report.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([TransactionsEntity]),
  ],
  providers: [ReportRepository],
  controllers: [ReportController],
  exports:[
    TypeOrmModule,
    ReportRepository,
  ],
})
export class ReportModule {};