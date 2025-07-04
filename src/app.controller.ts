import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor( public appService: AppService ) {};
    @Get('DatabaseServicesAPI/V1')
    getWelcome() {
      return {
        message:this.appService.welcome('Bienvenidos a la API de Servicios de Base de Datos MongoDB Epayco DEMO 2025'),
      };
    };
};
