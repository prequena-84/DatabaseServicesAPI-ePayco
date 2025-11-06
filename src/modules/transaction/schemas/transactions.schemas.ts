/*import { Document, Model } from "mongoose"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import numberTransaction from "src/common/utils/key.transaction.service"
import type { TIdTransaction,TUserDocument,TTransaction,TAmount,TStatus,TTokenConfirmation, TSessionExp } from "src/modules/transaction/typescript/types/transaction.type"
import type { ITransaction } from "src/modules/transaction/typescript/interfaces/transaction.interfaces"

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
    tokenConfirmation:TTokenConfirmation

    @Prop({ 
        required:false, 
        default:0 
    })
    sessionExp:TSessionExp
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
    const { userDocument,type,amount,status }: ITransaction = data
    const newTransaction = new this({ userDocument,type,amount,status })

    newTransaction.id = numberTransaction();
    
    await newTransaction.save()
    return newTransaction;
};*/