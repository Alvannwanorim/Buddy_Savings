import { User } from "../interfaces/user.interface"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Roles } from "../enums/roles.enums"

@Entity()
export class UserEntity implements User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({nullable: true})
    phoneNumber: string
    @Column({enum: Roles, default: Roles.USER
    })
    role: Roles;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

}
