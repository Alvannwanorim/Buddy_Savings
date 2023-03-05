
import { SavingPlanDto } from "../dto/saving-plan.dto";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import SavingPlanService from "../services/saving-plan.services";
import { NextFunction, Response } from "express"
import { HttpException } from "../exceptions/httpExceptions";

class SavingPlanController {
   public SavingPlanService = new SavingPlanService();
    
    public async findAllSavingPlans(request: RequestWithUser, response: Response, next: NextFunction){
        const SavingPlans = await this.SavingPlanService.findAll();
        response.status(201).json(SavingPlans)
    }

   public async create(request: RequestWithUser, response: Response, next: NextFunction){
    try {
        const SavingPlansData : SavingPlanDto = request.body
        const createdSavingPlan = await this.SavingPlanService.create(SavingPlansData,request.user)
        response.status(201).json(createdSavingPlan)
    } catch (err) {
        next(err)
    }
        
   }
  
   public async findOne(request: RequestWithUser, response: Response, next: NextFunction){
        try {
            
            if(!request.params.planId){
                throw new HttpException(400,"Please provide the planId")
            }
            const SavingPlan = await this.SavingPlanService.findById(request.params.planId as unknown as number)
            response.status(200).json(SavingPlan)
        } catch (err) {
            next(err)
        }
    }

}
export default SavingPlanController