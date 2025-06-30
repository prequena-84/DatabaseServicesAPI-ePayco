import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsTransaction, ITransactionModels } from '../transaction/schemas/transactions.schemas';
import { IReport, IResponseReport } from 'src/typescript/interfaces/response/response-report';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(ModelsTransaction.name)
        private readonly transactionModel:ITransactionModels
    ) {};

    welcomeAPI(text:string):string {
        return text;
    };

    async getReporteTransaction():Promise<IResponseReport> {
        const reportTransaction:IReport[] = await this.transactionModel.aggregate([
            {
                $lookup:{
                    from:"modelsusers",
                    localField:"userDocument",
                    foreignField:"document",
                    as:"User",
                }
            },
            {
                $unwind:"$User",
            }
        ]);

        return {
            data:reportTransaction,
            message:"Reporte Transacciones",
        };
    };
};