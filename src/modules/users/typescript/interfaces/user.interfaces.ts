import type { TDocument,TName,TEmail,TPhone,TBalance } from "src/modules/users/typescript/types/user.type";

interface IUser {
    document:TDocument;
    name:TName;
    email:TEmail;
    phone:TPhone;
    balance?:TBalance | null;
}

export type {
    IUser,
}       