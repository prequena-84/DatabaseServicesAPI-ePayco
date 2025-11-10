import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/service/db/welcome')
export class AppController {
  constructor( public appService: AppService ) {};
    @Get()
    getWelcome() {
      return {
        message:this.appService.welcome('Bienvenidos a la API de Servicios de Base de Datos MySQL Epayco DEMO Noviembre 2025'),
      };
    };
};
