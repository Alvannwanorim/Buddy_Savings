import { HttpException } from "../exceptions/httpExceptions";
import { SavingsGroupRepository } from "../repositories/saving-group.repository";
import { UserRepository } from "../repositories/user.repository";
import { SavingPlanRepository } from "../repositories/saving-plan.repository";
import { UserEntity } from "../entity/user.entity";
import { SavingPlanEntity } from "../entity/saving-plan.entity";

class SavingsGroupService {
  
   public async create(planId: number, userId: number) {
    const user: UserEntity =  await UserRepository.findById(userId)
    if(!user) throw new HttpException(404,"User not found")
    
    const plan: SavingPlanEntity =await  SavingPlanRepository.findById(planId)

    if(!plan) throw new HttpException(404,"savings plan not found")
    const savingPlan = await SavingsGroupRepository.save({user, plan});
    return savingPlan;
   }

   public async findById(groupId: number) {
     const savingPlan = await SavingsGroupRepository.findById(groupId);
     if(!savingPlan) throw new HttpException(404,"Saving group not found")
     return savingPlan
   }

   public async findAll() {
     const savingPlans = await SavingsGroupRepository.findAllGroups()
     return savingPlans
   }
}

export default SavingsGroupService