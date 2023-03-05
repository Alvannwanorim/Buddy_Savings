import { HttpException } from "../exceptions/httpExceptions";
import { SavingsGroupRepository } from "../repositories/saving-group.repository";
import { UserRepository } from "../repositories/user.repository";
import { SavingPlanRepository } from "../repositories/saving-plan.repository";
import { UserEntity } from "../entity/user.entity";
import { SavingPlanEntity } from "../entity/saving-plan.entity";
import { SavingsGroupEntity } from "../entity/savings-group.entity";
import { InviteStatus } from "../enums/invite-status.enum";

class SavingsGroupService {
  
   public async create(planId: number, userId: number) {
    const user: UserEntity =  await UserRepository.findById(userId)
    if(!user) throw new HttpException(404,"User not found")
    
    const plan: SavingPlanEntity =await  SavingPlanRepository.findById(planId)

    if(!plan) throw new HttpException(404,"savings plan not found")

    const existingGroup = await SavingsGroupRepository.findByIdAndUserId(planId, userId)
    const savingsGroup = await SavingsGroupRepository.save({user, plan});
    return savingsGroup;
   }

   public async findById(groupId: number) {
     const savingsGroup = await SavingsGroupRepository.findById(groupId);
     if(!savingsGroup) throw new HttpException(404,"Saving group not found")
     return savingsGroup
   }

   public async findAll() {
     const savingsGroups = await SavingsGroupRepository.findAllGroups()
     return savingsGroups
   }

   public async acceptorRejectInvite(planId: number, userId: number, status: string){
    const savingsGroup: SavingsGroupEntity = await SavingsGroupRepository.findByIdAndUserId(planId, userId)
 
    if(savingsGroup.inviteStatus===InviteStatus.ACCEPTED || savingsGroup.inviteStatus===InviteStatus.REJECTED) return savingsGroup
    if(status.toUpperCase() ===InviteStatus.ACCEPTED){
      
      savingsGroup.inviteStatus = InviteStatus.ACCEPTED
     
    }else if (status.toUpperCase() ===InviteStatus.REJECTED){
      savingsGroup.inviteStatus = InviteStatus.REJECTED
    }
    const updatedSavingsGroup = await SavingsGroupRepository.save(savingsGroup)
    return updatedSavingsGroup
   }
}

export default SavingsGroupService