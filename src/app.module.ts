import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConexionDB } from './config/database/database.module';

@Module({
  imports: [
    ConexionDB,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};

// Quede en crear la carpetas de los tipos e interfaces y averiguar sobre las bibliotecas de javascript.