import { SavingFrequency } from "@/enums/saving-frequency.enums";
import { SavingMethod } from "@/enums/saving-method.enum";
import { User } from "./user.interface";

export interface SavingPlan {
    title: string;
    amount: number;
    limit: number;
    isTargeted: boolean;
    method: SavingMethod;
    frequency: SavingFrequency;
    startDate: Date;
    endDate: Date;
    yearlyTarget: number;
    duration: number;
    admin: User;
    isActive: boolean;

}