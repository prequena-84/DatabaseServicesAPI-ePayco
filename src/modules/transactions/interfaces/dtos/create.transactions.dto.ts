import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from "class-validator";

export class TransactionsDTO {
    @IsNumber()
    @IsNotEmpty()
    document:number;

    @IsString()
    @IsNotEmpty()
    @IsIn(['recarga', 'pago'])
    type:'recarga' | 'pago';

    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsString()
    @IsNotEmpty()
    @IsIn(['pendiente', 'confirmada'])
    status: 'pendiente' | 'confirmada';

    @IsString()
    @IsOptional()
    tokenConfirmation?:string | null;

    @IsNumber()
    @IsOptional()
    sessionExp?:number | null;
};