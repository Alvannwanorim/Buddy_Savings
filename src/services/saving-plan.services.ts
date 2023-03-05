import { UserEntity } from "../entity/user.entity"
import { HttpException } from "../exceptions/httpExceptions";
import { SavingPlanDto } from "../dto/saving-plan.dto"
import { SavingPlanRepository } from "../repositories/saving-plan.repository"
import { User } from "../interfaces/user.interface";
import { SavingsGroupRepository } from "../repositories/saving-group.repository";
import { InviteStatus } from "../enums/invite-status.enum";

class SavingPlanService {
  
   public async create(savingPlanData: SavingPlanDto, user: User) {
      const savingPlan = await SavingPlanRepository.save({admin: user,...savingPlanData});
      await SavingsGroupRepository.save({user, savingPlan, isAdmin:true, inviteStatus: InviteStatus.ACCEPTED})
      return savingPlan;
   }

   public async findById(planId: number) {
     const savingPlan = await SavingPlanRepository.findById(planId);
     if(!savingPlan) throw new HttpException(404,"Saving plan not found")
     return savingPlan
   }

   public async findAll() {
     const savingPlans = await SavingPlanRepository.findAllPlans()
     return savingPlans
   }
}

export default SavingPlanService