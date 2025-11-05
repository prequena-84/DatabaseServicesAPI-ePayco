import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConexionDB } from './infrastructure/database/database.module';
import { UsersModule } from './modules/users/users.module';
//import { TransactionModule } from './modules/transaction/transaction.module';
//import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true }),
    ConexionDB,
    UsersModule,
    //TransactionModule,
    //ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};