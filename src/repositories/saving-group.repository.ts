import { AppDataSource } from "../database"
import { SavingsGroupEntity } from "../entity/savings-group.entity"

export const SavingsGroupRepository = AppDataSource.getRepository(SavingsGroupEntity).extend({
    findById(groupId: number) {
        const savingsGroup =  this.createQueryBuilder("savings_group_entity")
                        .leftJoinAndSelect("savings_group_entity.user", "user_entity") 
                        .leftJoinAndSelect("savings_group_entity.plan", "saving_plan_entity") 
                        .where("savings_group_entity.id = :id", { id: groupId }) 
                        .getOne();
        return savingsGroup
        
    },

    findAllGroups(){
        const savingsGroups =  this.createQueryBuilder("savings_group_entity") 
                        .leftJoinAndSelect("savings_group_entity.user", "user_entity") 
                        .leftJoinAndSelect("savings_group_entity.plan", "saving_plan_entity") 
                        .getMany();
        return savingsGroups
           
    }
})
