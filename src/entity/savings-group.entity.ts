import { InviteStatus } from "../enums/invite-status.enum";
import { Column, CreateDateColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { SavingsGroup } from "../interfaces/saving-group.interface";
import { SavingPlanEntity } from "./saving-plan.entity";
import { UserEntity } from "./user.entity";

export class SavingsGroupEntity implements SavingsGroup{
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => SavingPlanEntity, (plan) => plan.group)
    plan: SavingPlanEntity;

    @ManyToOne(() => UserEntity, (user) => user.group)
    user: UserEntity;

    @Column({default: false})
    isAdmin: boolean;

    @Column({default: true})
    isActive: boolean;

    @Column({enum:InviteStatus,default: InviteStatus.PENDING})
    inviteStatus: InviteStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}