import type { IUser } from "./users.interfaces";

export interface IResponseUser {
    data?: IUser | IUser[] | null | undefined;
    message?: string | null | undefined;
}