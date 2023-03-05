
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { NextFunction, Response } from "express"
import { HttpException } from "../exceptions/httpExceptions";
import SavingsGroupService from "../services/savings-group.service";

class SavingsGroupController {
   public SavingsGroupService = new SavingsGroupService();
    
    public async findAllSavingPlans(request: RequestWithUser, response: Response, next: NextFunction){
        try {
            const SavingPlans = await this.SavingsGroupService.findAll();
            response.status(201).json(SavingPlans)
        } catch (err) {
            next(err)
        }
    }

   public async register(request: RequestWithUser, response: Response, next: NextFunction){
    try {
        const createdSavingPlan = await this.SavingsGroupService.create(
            request.params.planId as unknown as number,
            request.params.userId as unknown as number,
            )
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
            const SavingPlan = await this.SavingsGroupService.findById(request.params.planId as unknown as number)
            response.status(200).json(SavingPlan)
        } catch (err) {
            next(err)
        }
    }

}
export default SavingsGroupController