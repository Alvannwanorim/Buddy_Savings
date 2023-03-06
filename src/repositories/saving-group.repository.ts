import { InviteStatus } from "../enums/invite-status.enum";
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
    findByPlan(planId: number) {
        const savingsGroup =  this.createQueryBuilder("savings_group_entity")
                        .leftJoinAndSelect("savings_group_entity.user", "user_entity") 
                        .leftJoinAndSelect("savings_group_entity.plan", "saving_plan_entity") 
                        .where("savings_group_entity.planId = :planId", { planId }) 
                        .getMany();
        return savingsGroup
        
    },

    findAllGroups(){
        const savingsGroups =  this.createQueryBuilder("savings_group_entity") 
                        .leftJoinAndSelect("savings_group_entity.user", "user_entity") 
                        .leftJoinAndSelect("savings_group_entity.plan", "saving_plan_entity") 
                        .getMany();
        return savingsGroups
           
    },
    findByIdAndUserId(planId: number, userId: number){
        const savingsGroups =  this.createQueryBuilder("savings_group_entity")
                                .where("savings_group_entity.planId = :planId AND savings_group_entity.user = :userId", { planId, userId })
                                .getOne()

        return savingsGroups;
    },
    getGroupCounts(planId: number){
        const count =  this.createQueryBuilder("savings_group_entity")
                                .where("savings_group_entity.planId = :planId AND savings_group_entity.inviteStatus = :inviteStatus ", { planId,inviteStatus:InviteStatus.ACCEPTED })
                                .getCount()

        return count;
    }
})
