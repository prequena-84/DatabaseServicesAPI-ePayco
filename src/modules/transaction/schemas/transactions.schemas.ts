import { Document, Model } from "mongoose"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { TIdTransaction,TUserDocument,TTransaction,TAmount,TStatus,TTokenConfirmation, TSessionExp } from "src/typescript/types/transaction/transaction.type"
import type { ITransaction } from "src/typescript/interfaces/transaction/transaction.interfaces"

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
        required:false, 
        default:null
    })
    TokenConfirmation:TTokenConfirmation

    @Prop({ 
        required:false, 
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

TransactionSchema.statics.allTransaction = async function():Promise<ITransaction[]> {
    return await this.find();
}

TransactionSchema.statics.updateIdTransaction= async function( id:TIdTransaction, data:ITransaction ):Promise<ITransaction> {
    const transactionData:ITransaction = await this.findOneAndUpdate({id}, data, {new:true})
    return transactionData;
}

TransactionSchema.statics.createInstance = async function( data:ITransaction ):Promise<ITransaction> {
    const { id,userDocument,type,amount,status }: ITransaction = data
    const newTransaction = new this({ id,userDocument,type,amount,status })

    // Queda agregar los utils con esta función
    //newTransaction.id = NTransaction();
    await newTransaction.save()
    return newTransaction;
};