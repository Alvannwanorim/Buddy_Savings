import validationMiddleware from "../middleware/validation.middleware";
import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middleware/auth.middleware";
import SavingPlanController from "../controllers/saving-plan.controller";
import { SavingPlanDto } from "../dto/saving-plan.dto";

class SavingPlanRoute implements Routes {
    public path = '/saving-plan';
    public router = Router()
    public savingPlanController = new SavingPlanController()
    
    constructor(){
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, validationMiddleware(SavingPlanDto, 'body'),authMiddleware, this.savingPlanController.register.bind(this.savingPlanController) )
        this.router.get(`${this.path}/:planId`,authMiddleware, this.savingPlanController.findOne.bind(this.savingPlanController) )
        this.router.get(`${this.path}`,authMiddleware, this.savingPlanController.findAllSavingPlans.bind(this.savingPlanController) )

    }
}

export default SavingPlanRoute