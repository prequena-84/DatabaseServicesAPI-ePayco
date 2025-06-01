import type { TIdTransaccion,TTransaccion } from 'types/TTransaccion'
import { Document, Model } from 'mongoose'

interface ITransaccion {
    id:TIdTransaccion;
    user_id:TTransaccion;
    tipo : 'recarga' | 'pago';
    monto : number;
    status : 'pendiente' | 'confirmada'
    token_confirmacion?: string | null;
    session_id?: string | null
}

interface ITrasResp {
    data?:ITransaccion | null | unknown;
    message?:string | null;
}

interface ITransDocument extends Document, ITransaccion{}

interface ITransModel extends Model<ITransDocument> {
    updateDataIdTrans(id:TIdTransaccion, dataUpdate:ITransaccion ): Promise<ITrasResp>;
    allTrans(): Promise<ITransaccion[]>;
    createInstance(dataTransaccion:ITransaccion): Promise<ITrasResp>;
}

export {
    ITransaccion,
    ITrasResp,
    ITransDocument,
    ITransModel,
}