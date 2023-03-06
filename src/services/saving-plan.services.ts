import { UserEntity } from "../entity/user.entity"
import { HttpException } from "../exceptions/httpExceptions";
import { SavingPlanDto } from "../dto/saving-plan.dto"
import { SavingPlanRepository } from "../repositories/saving-plan.repository"
import { User } from "../interfaces/user.interface";
import { SavingsGroupRepository } from "../repositories/saving-group.repository";
import { InviteStatus } from "../enums/invite-status.enum";
import { SavingPlanEntity } from "../entity/saving-plan.entity";

class SavingPlanService {
  /**
   * Inserts new saving plan in the database
   * @param savingPlanData 
   * @param user must of type `User` and an `Admin`
   * @returns `SavingPlan`
   */
   public async create(savingPlanData: SavingPlanDto, user: User): Promise<SavingPlanEntity> {
      const existingPlan = await SavingPlanRepository.findByTitle(savingPlanData.title)
      if(existingPlan){
        throw new HttpException(400,"Saving Plan with title already exists")
      }
      const savingPlan = await SavingPlanRepository.save({admin: user,...savingPlanData});
      await SavingsGroupRepository.save({user, savingPlan, isAdmin:true, inviteStatus: InviteStatus.ACCEPTED})
      return savingPlan;
   }

   /**
    * Retrieves one `SavingPlan` from the database
    * @param planId 
    * @returns `SavingPlan`
    */
   public async findById(planId: number): Promise<SavingPlanEntity> {
     const savingPlan = await SavingPlanRepository.findById(planId);
     if(!savingPlan) throw new HttpException(404,"Saving plan not found")
     return savingPlan
   }

   /**
    * Retrieves all `SavingPlan` from the database
    * @returns `SavingPlan`
    */
   public async findAll(): Promise<SavingPlanEntity[]| []>  {
     const savingPlans = await SavingPlanRepository.findAllPlans()
     return savingPlans
   }
}

export default SavingPlanService