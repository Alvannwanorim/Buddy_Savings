import { AppDataSource } from "../database"
import { UserEntity } from "../entity/User"

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
    findByEmail(email: string) {
        return this.createQueryBuilder("user_entity")
            .where("user_entity.email = :email", { email })
            .getOne()
    },
})
