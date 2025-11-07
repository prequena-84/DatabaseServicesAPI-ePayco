import type { ITransaction } from "./transactions.interfaces";

export interface IResponseTransaction {
    data?: ITransaction | ITransaction[] | null | undefined;
    message?: string | null | undefined;
}