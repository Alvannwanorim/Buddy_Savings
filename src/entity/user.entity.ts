import { User } from "../interfaces/user.interface"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Roles } from "../enums/roles.enums"
import { SavingPlanEntity } from "./saving-plan.entity";
import { SavingsGroupEntity } from "./savings-group.entity";

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

    @OneToMany(() => SavingPlanEntity, (savingPlan) => savingPlan.admin)
    savingPlans: SavingPlanEntity[]

    @OneToMany(() => SavingsGroupEntity, (savingGroup) => savingGroup.user)
    group: SavingsGroupEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

}
