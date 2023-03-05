import { SavingPlanEntity } from "../entity/saving-plan.entity"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "../entity/user.entity"
import { SavingsGroupEntity } from "../entity/savings-group.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "alvan2327",
    database: "buddy-saving",
    synchronize: true,
    logging: false,
    entities: [UserEntity, SavingPlanEntity, SavingsGroupEntity],
    migrations: [],
    subscribers: [],
})
