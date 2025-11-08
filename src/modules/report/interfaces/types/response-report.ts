import type { ITransaction } from "src/modules/transactions/interfaces/types/transactions.interfaces";
import type { IUser } from "src/modules/users/interfaces/types/users.interfaces";

interface IReport extends ITransaction {
    User:IUser;
}

interface IResponseReport {
    data?: IReport | IReport[] | null;
    message?: string;
}

export type {
    IReport,
    IResponseReport,
}