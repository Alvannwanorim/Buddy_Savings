import { HttpException } from "../exceptions/httpExceptions";
import { SavingsGroupRepository } from "../repositories/saving-group.repository";
import { UserRepository } from "../repositories/user.repository";
import { SavingPlanRepository } from "../repositories/saving-plan.repository";
import { UserEntity } from "../entity/user.entity";
import { SavingPlanEntity } from "../entity/saving-plan.entity";
import { SavingsGroupEntity } from "../entity/savings-group.entity";
import { InviteStatus } from "../enums/invite-status.enum";

class SavingsGroupService {
  /**
   * create a new saving group for a given user plan
   * @param planId of an existing `SavingPlan`
   * @param userId of a `User`
   * @returns `SavingsGroupEntity`
   */
   public async create(planId: number, userId: number): Promise<SavingsGroupEntity>{

    const user: UserEntity =  await UserRepository.findById(userId)
    if(!user) throw new HttpException(404,"User not found")
    
    const plan: SavingPlanEntity =await  SavingPlanRepository.findById(planId)
    if(!plan) throw new HttpException(404,"savings plan not found")

    const groupCount = await SavingsGroupRepository.getGroupCounts(planId)
    
    if(groupCount >= plan.limit)throw new HttpException(400,"This group has reached its maximum capacity")
    
    const userInGroup: SavingsGroupEntity = await SavingsGroupRepository.findByIdAndUserId(planId, userId)

    if(userInGroup){
      if(userInGroup.inviteStatus ===InviteStatus.ACCEPTED){

        return userInGroup

      }else if(userInGroup.inviteStatus ===InviteStatus.PENDING || userInGroup.inviteStatus ===InviteStatus.REJECTED){
        
        userInGroup.inviteStatus = InviteStatus.PENDING 
        const updatedSavingsGroup = await SavingsGroupRepository.save(userInGroup)
        return updatedSavingsGroup
      }
    }
    const savingsGroup = await SavingsGroupRepository.save({user, plan});
    return savingsGroup;
   }

   /**
    * Retrieves `SavingsGroup` from the database
    * @param groupId of an existing `SavingsGroup`
    * @returns `SavingsGroupEntity`
    */
   public async findById(groupId: number): Promise<SavingsGroupEntity>{

     const savingsGroup = await SavingsGroupRepository.findById(groupId);
     if(!savingsGroup) throw new HttpException(404,"Saving group not found")
     return savingsGroup

   }

   /**
    * Retrieves all `SavingsGroup` from the database
    * @returns `SavingsGroupEntity[]`
    */
   public async findAll(): Promise<SavingsGroupEntity[]>{
     const savingsGroups = await SavingsGroupRepository.findAllGroups()
     return savingsGroups
   }
   /**
    * Update the status of user `SavingsGroup` invite
    * @param planId of an existing `SavingPlan`
    * @param userId of a `User`
    * @param status of `InviteStatus` must be an enum of type `REJECTED` or `ACCEPTED`
    * @returns `SavingsGroupEntity`
    */
   public async acceptorRejectInvite(planId: number, userId: number, status: string): Promise<SavingsGroupEntity>{
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