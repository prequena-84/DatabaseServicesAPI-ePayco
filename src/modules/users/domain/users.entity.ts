import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TransactionsEntity } from "src/modules/transactions/domain/transactions.entity";

import type { IUser } from "src/modules/users/interfaces/types/users.interfaces"


@Entity({ name:'users' })
export class UsersEntity implements IUser {
    @PrimaryGeneratedColumn()
    document:number;

    @Column({ type:'varchar', length:150 })
    name:string;

    @Column({ type:'varchar', length:100 })
    email:string;

    @Column({ type:'varchar', length:20 })
    phone:string;

    @Column({ type:'decimal', precision:10, scale:2, nullable:true })
    balance:number | null;

    @OneToMany(() => TransactionsEntity, transaction => transaction.user)
    transactions:TransactionsEntity[];
};