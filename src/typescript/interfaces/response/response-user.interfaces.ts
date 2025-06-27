import type { IUser } from "../user/user.interfaces";
import type { TMessageText } from "src/typescript/types/response/response.type";

interface IResponseUser {
    data?: IUser | IUser[] | null | undefined;
    message?: TMessageText | null | undefined;
}

export type {
    IResponseUser,
}