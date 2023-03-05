import { SavingPlanEntity } from "../entity/saving-plan.entity";
import { InviteStatus } from "../enums/invite-status.enum";
import { SavingPlan } from "./saving-plan.interface";
import { User } from "./user.interface";

export interface SavingsGroup {
    plan: SavingPlanEntity;
    user: User;
    isAdmin: boolean;
    isActive: boolean;
    inviteStatus: InviteStatus

}