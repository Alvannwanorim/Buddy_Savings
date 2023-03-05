import { InviteStatus } from "../enums/invite-status.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SavingsGroup } from "../interfaces/saving-group.interface";
import { SavingPlanEntity } from "./saving-plan.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class SavingsGroupEntity implements SavingsGroup{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SavingPlanEntity, (plan) => plan.groupId)
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