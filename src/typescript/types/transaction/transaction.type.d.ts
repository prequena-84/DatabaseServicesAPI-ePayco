import type { TDocument } from "../users/user.type";

type TIdTransaction = string;
type TUserDocument = TDocument;
type TTransaction = 'recarga' | 'pago';
type TAmount = number;
type TStatus = 'pendiente' | 'confirmada';
type TTokenConfirmation = string | null;
type TSessionExp = number | null;

export type {
    TIdTransaction,
    TUserDocument,
    TTransaction,
    TAmount,
    TStatus,
    TTokenConfirmation,
    TSessionExp,
}