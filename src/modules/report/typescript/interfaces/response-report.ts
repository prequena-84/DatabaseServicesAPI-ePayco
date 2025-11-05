import type { ITransaction } from "../../../transaction/typescript/interfaces/transaction.interfaces";
import type { IUser } from "../../../users/interfaces/user.interfaces";
import type { TMessageText } from "src/common/utils/typescript/types/response.type";

interface IReport extends ITransaction {
    User:IUser;
}

interface IResponseReport {
    data?:IReport | IReport[] | null;
    message?:TMessageText;
}

export type {
    IReport,
    IResponseReport,
}