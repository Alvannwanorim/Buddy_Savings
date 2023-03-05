import { HttpException } from "../exceptions/httpExceptions";
import { SavingsGroupRepository } from "../repositories/saving-group.repository";
import { SavingsGroupEntity } from "../entity/savings-group.entity";
import { UserRepository } from "../repositories/user.repository";
import { SavingPlanRepository } from "../repositories/saving-plan.repository";

class SavingsGroupService {
  
   public async create(planId: number, userId: number) {
    const user = UserRepository.findById(userId)
    if(!user) throw new HttpException(404,"User not found")

    const plan = SavingPlanRepository.findById(planId)
    if(!plan) throw new HttpException(404,"savings plan not found")
    
    const savingGroup = new SavingsGroupEntity()
    savingGroup.user = user
    savingGroup.plan = plan
    const savingPlan = await SavingsGroupRepository.save({...savingGroup});
    return savingPlan;
   }

   public async findById(planId: number) {
     const savingPlan = await SavingsGroupRepository.findById(planId);
     if(!savingPlan) throw new HttpException(404,"Saving group not found")
     return savingPlan
   }

   public async findAll() {
     const savingPlans = await SavingsGroupRepository.find({})
     return savingPlans
   }
}

export default SavingsGroupService