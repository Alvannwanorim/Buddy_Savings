import { SavingPlanEntity } from "../entity/saving-plan.entity"
import { AppDataSource } from "../database"


export const SavingPlanRepository = AppDataSource.getRepository(SavingPlanEntity).extend({
    findById(planId: number) {
        return this.createQueryBuilder("saving_plan_entity")
            .where("saving_plan_entity.id = :id", {id: planId })
            .getOne()
    },

    findGroupAdmin(planId: number) {
        return this.createQueryBuilder("saving_plan_entity")
            .relation(SavingPlanEntity,"admin")
            .of({id:planId})
            .loadMany()
    },
})
