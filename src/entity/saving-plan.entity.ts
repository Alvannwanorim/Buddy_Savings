import { SavingFrequency } from "../enums/saving-frequency.enums";
import { SavingMethod } from "../enums/saving-method.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {  SavingPlan } from "../interfaces/saving-plan.interface";
import { UserEntity } from "./user.entity";
import { SavingsGroupEntity } from "./savings-group.entity";

@Entity()
export class SavingPlanEntity implements SavingPlan{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column({type:'numeric'})
    amount: number;

    @Column({default:5})
    limit: number;

    @Column({default: false})
    isTargeted: boolean;
    
    @ManyToOne(() => UserEntity, (user) => user.savingPlans)
    admin: UserEntity;

    @OneToMany(() => SavingsGroupEntity, (group) => group.plan)
    groupId: SavingsGroupEntity[]

    @Column({enum:SavingMethod, default:SavingMethod.AUTOMATIC})
    method: SavingMethod;

    @Column({enum:SavingFrequency, default:SavingFrequency.WEEKLY})
    frequency: SavingFrequency;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    yearlyTarget: number;

    @Column()
    duration: number;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}