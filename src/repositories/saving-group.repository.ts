import { AppDataSource } from "../database"
import { SavingsGroupEntity } from "../entity/savings-group.entity"

export const SavingsGroupRepository = AppDataSource.getRepository(SavingsGroupEntity).extend({
    findById(groupId: number) {
        return this.createQueryBuilder("savings_group_entity")
            .where("savings_group_entity.id = :id", {id: groupId })
            .getOne()
    },

})
