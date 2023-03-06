import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middleware/auth.middleware";
import SavingsGroupController from "../controllers/saving-group.controller";
import adminMiddleware from "../middleware/admin.middleware";

class SavingsGroupRoute implements Routes {
    public path = '/savings-group';
    public router = Router()
    public savingsGroupController = new SavingsGroupController()
    
    constructor(){
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.post(`${this.path}/add/:userId/:planId`,authMiddleware, adminMiddleware, this.savingsGroupController.createGroup.bind(this.savingsGroupController) )
        this.router.get(`${this.path}/:groupId`,authMiddleware, this.savingsGroupController.findOne.bind(this.savingsGroupController) )
        this.router.get(`${this.path}`,authMiddleware, this.savingsGroupController.findAllSavingsGroup.bind(this.savingsGroupController) )
        this.router.get(`${this.path}/invite/:planId`,authMiddleware, this.savingsGroupController.acceptorRejectInvite.bind(this.savingsGroupController) )
        this.router.get(`${this.path}/plan/:planId`,authMiddleware, this.savingsGroupController.findAllByPlan.bind(this.savingsGroupController) )

    }
}

export default SavingsGroupRoute