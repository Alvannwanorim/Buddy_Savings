import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middleware/auth.middleware";
import SavingsGroupController from "../controllers/saving-group.controller";

class SavingsGroupRoute implements Routes {
    public path = '/savings-group';
    public router = Router()
    public savingsGroupController = new SavingsGroupController()
    
    constructor(){
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.post(`${this.path}/add`,authMiddleware, this.savingsGroupController.register.bind(this.savingsGroupController) )
        this.router.get(`${this.path}/:groupId`,authMiddleware, this.savingsGroupController.findOne.bind(this.savingsGroupController) )
        this.router.get(`${this.path}`,authMiddleware, this.savingsGroupController.findAllSavingPlans.bind(this.savingsGroupController) )

    }
}

export default SavingsGroupRoute