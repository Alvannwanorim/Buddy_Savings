import { SavingPlanEntity } from "../entity/saving-plan.entity"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "../entity/user.entity"
import { SavingsGroupEntity } from "../entity/savings-group.entity"
import 'dotenv/config'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [UserEntity, SavingPlanEntity, SavingsGroupEntity],
    migrations: [],
    subscribers: [],
})
