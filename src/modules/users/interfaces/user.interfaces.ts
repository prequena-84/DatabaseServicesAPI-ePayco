import type { DeleteResult } from "typeorm";

interface IUser {
    document:number;
    name:string;
    email:string;
    phone:string;
    balance?:number | null;
}

type TResponseDelete = DeleteResult;

export type {
    IUser,
    TResponseDelete,
}