import type { ITransaction } from "./transactions.interfaces";

export interface IResponseTransaction {
    data?: ITransaction | ITransaction[] | null | undefined | string;
    message?: string | null | undefined;
}