import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConexionDB } from './config/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConexionDB,
    UsersModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};

/**
 * Queda pendiente crear el modulo de reporte
 * Queda pendiente agregar la funcion por users unico
 * Queda pendiente agregar la función por transaction unica
 */