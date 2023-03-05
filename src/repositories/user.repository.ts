import { AppDataSource } from "../database"
import { UserEntity } from "../entity/user.entity"

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
    findByEmail(email: string) {
        return this.createQueryBuilder("user_entity")
            .where("user_entity.email = :email", { email })
            .getOne()
    },

    findById(userId: number) {
        return this.createQueryBuilder("user_entity")
            .where("user_entity.id = :id", {id: userId })
            .getOne()
    },
})
