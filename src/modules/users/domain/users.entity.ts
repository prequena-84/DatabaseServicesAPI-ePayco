import type { IUser } from "src/modules/users/interfaces/types/user.interfaces"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name:'users' })
export class usersEntity implements IUser {
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
};