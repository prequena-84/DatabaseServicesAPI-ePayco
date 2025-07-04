import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('DatabaseServicesAPI/V1/report')
export class ReportController {
    constructor( public transactionService:ReportService ) {};

    @Get('/')
    getWelcome() {
        return {
            message:this.transactionService.welcomeAPI("Bienvenido al Servicio de Reportes"),
        };
    };

    @Get('transaction')
    async getTransactionReport() {
        const response = await this.transactionService.getReporteTransaction();
        return {
            data:response.data,
            reponse:response.message,
        };
    };
};