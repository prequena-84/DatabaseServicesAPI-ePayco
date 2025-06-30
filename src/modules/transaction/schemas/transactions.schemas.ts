import { Document, Model } from "mongoose"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { TIdTransaction,TUserDocument,TTransaction,TAmount,TStatus,TTokenConfirmation, TSessionExp } from "src/typescript/types/transaction/transaction.type"
import type { ITransaction } from "src/typescript/interfaces/transaction/transaction.interfaces"
import type { IResponseTransaction } from "src/typescript/interfaces/response/response-transaction"

@Schema()
export class ModelsTransaction implements ITransaction {
    @Prop({ 
        required:true, 
        unique:true 
    })
    id:TIdTransaction

    @Prop({ required:true })
    userDocument:TUserDocument

    @Prop({ 
        required:true,
        enum: [
            "recarga",
            "pago",
        ],
    })
    type:TTransaction

    @Prop({ required:true })
    amount:TAmount

    @Prop({ 
        required:true,
        enum: [
            "pendiente",
            "confirmada",
        ],
    })
    status:TStatus

    @Prop({ 
        required:true, 
        default:null
    })
    TokenConfirmation:TTokenConfirmation

    @Prop({ 
        required:true, 
        default:0 
    })
    SessionExp:TSessionExp
}
export type TransactionDocument = ModelsTransaction & Document
export const TransactionSchema = SchemaFactory.createForClass(ModelsTransaction)

export interface ITransactionModels extends Model<TransactionDocument> {
    allTransaction(): Promise<ITransaction[]>;
    updateIdTransaction(document:TIdTransaction, data:ITransaction): Promise<ITransaction>;
    createInstance(data:ITransaction): Promise<ITransaction>;
}

TransactionSchema.statics.allTransaction = async function():Promise<IResponseTransaction | null> {
    try {
        return {
            data: await this.find(),
            message: 'Se ha obtenido todos las Transacciones sastifactoriamente',
        }
    } catch(err) {
        return {
            data:null,
            message:`Se presento el siguiente Error en la consulta de Transacciones: ${err}`,
        }
    }
}

TransactionSchema.statics.updateIdTransaction= async function( id:TIdTransaction, data:ITransaction ): Promise<IResponseTransaction | null> {
    try {
        const transactionData:ITransaction = await this.findOneAndUpdate({id}, data, {new:true})
        return {
            data: transactionData,
            message:`Se actualizo los datos de la Transacción: ${transactionData.id} sastifactoriamente`,
        }
    } catch(err) {
        return {
            data:null,
            message:`Se presento el siguiente Error en la actualizacion de datos: ${err}`,
        }
    }
}

TransactionSchema.statics.createInstance = async function( data:ITransaction ): Promise<IResponseTransaction> {
    try {
        const { userDocument,type,amount,status }: ITransaction = data
        const newTransaction = new this({ userDocument,type,amount,status })

        // Queda agregar los utils con esta función
        //newTransaction.id = NTransaction();
        await newTransaction.save()

        return {
            data:newTransaction,
            message:`Se registro la Transacción #${newTransaction.id} sastifactoriamente`,
        }
    } catch(err) {
        return {
            data:null,
            message:`Se presento el siguiente error: ${err}`,
        }
    }
}