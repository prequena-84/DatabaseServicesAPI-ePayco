import { 
    Controller,
    Get,
    NotFoundException,
} from '@nestjs/common';
import { ReportRepository } from '../../infrastructure/repositories/report.repository';

@Controller('api/v1/service/db/reporting')
export class ReportController {
    constructor( public transactionRepository:ReportRepository ) {};

    @Get('welcome')
    getWelcome() {
        return {
            message:this.transactionRepository.welcomeAPI("Bienvenido al Servicio de Reportes"),
        };
    };

    @Get()
    async getTransactionReport() {
        try {
            const data = await this.transactionRepository.reportTransactions();
            if (!data.length) throw new NotFoundException('No hay transacciones registradas');

            return {
                data,
                reponse:'Se descargo el reporte de transacciones',
            };
        } catch(err) {
            return {
                data:[],
                reponse:'No hay transacciones registrada',
            };
        }
    };
};