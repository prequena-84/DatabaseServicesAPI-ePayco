import type { IUser } from "../../../modules/users/typescript/interfaces/user.interfaces";
import type { TMessageText } from "src/common/utils/typescript/types/response.type";

interface IResponseUser {
    data?: IUser | IUser[] | null | undefined;
    message?: TMessageText | null | undefined;
}

export type {
    IResponseUser,
}