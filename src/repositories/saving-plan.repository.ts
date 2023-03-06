import { SavingPlanEntity } from "../entity/saving-plan.entity"
import { AppDataSource } from "../database"


export const SavingPlanRepository = AppDataSource.getRepository(SavingPlanEntity).extend({
    findById(planId: number) {
        const savingsPlan =  this.createQueryBuilder("saving_plan_entity")
                        .leftJoinAndSelect("saving_plan_entity.admin", "user_entity") 
                        .where("saving_plan_entity.id = :id", { id: planId }) 
                        .getOne();
        return savingsPlan
        
    },
    findByTitle(title: string) {
        const savingsPlan =  this.createQueryBuilder("saving_plan_entity")
                        .where("saving_plan_entity.title = :title", { title})
                        .getOne()
        return savingsPlan
        
    },

    findAllPlans(){
        const savingsPlans =  this.createQueryBuilder("saving_plan_entity") 
                        .leftJoinAndSelect("saving_plan_entity.admin", "user_entity") 
                        .getMany();
        return savingsPlans
           
    }
})
