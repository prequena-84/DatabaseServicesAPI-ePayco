import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import numberTransaction from "src/common/utils/key.transaction.service";
import { UsersEntity } from "src/modules/users/domain/users.entity";

import type { ITransaction } from "../interfaces/types/transactions.interfaces";

@Entity({ name:'transactions' })
export class TransactionsEntity implements ITransaction {
    @PrimaryColumn()
    id:string;

    @BeforeInsert()
    generateId() {
        this.id = numberTransaction();
    }

    @Column({ type:'int'})
    document:number;

    @Column({ type:'varchar', length:10 })
    type:'recarga' | 'pago';

    @Column({ type:'decimal', precision:10, scale:2 })
    amount:number;

    @Column({ type:'varchar', length:10 })
    status: 'pendiente' | 'confirmada';

    @Column({ type:'varchar', length:500, nullable:true })
    tokenConfirmation?:string | null;

    @Column({ type:'int', nullable:true })
    sessionExp?:number | null;

    @ManyToOne(() => UsersEntity, user => user.transactions)
    @JoinColumn({ name:'document', referencedColumnName: 'document'})
    user: UsersEntity;
};