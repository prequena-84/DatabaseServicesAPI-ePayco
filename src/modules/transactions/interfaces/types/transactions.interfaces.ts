import type { DeleteResult } from "typeorm";

interface ITransaction {
    id: string;
    document: number;
    type: 'recarga' | 'pago';
    amount: number;
    status: 'pendiente' | 'confirmada';
    tokenConfirmation?: string | null;
    sessionExp?: number | null;
}

type TResponseDelete = DeleteResult;

export type {
    ITransaction,
    TResponseDelete,
}