
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { NextFunction, Response } from "express"
import { HttpException } from "../exceptions/httpExceptions";
import SavingsGroupService from "../services/savings-group.service";

class SavingsGroupController {
   public SavingsGroupService = new SavingsGroupService();
    
    public async findAllSavingsGroup(request: RequestWithUser, response: Response, next: NextFunction){
        try {
            const SavingsGroup = await this.SavingsGroupService.findAll();
            response.status(201).json(SavingsGroup)
        } catch (err) {
            next(err)
        }
    }

   public async createGroup(request: RequestWithUser, response: Response, next: NextFunction){
    try {
        const createdSavingsGroup = await this.SavingsGroupService.create(
            request.params.planId as unknown as number,
            request.params.userId as unknown as number,
            )
        response.status(201).json(createdSavingsGroup)
    } catch (err) {
        next(err)
    }
        
   }
  
   public async findOne(request: RequestWithUser, response: Response, next: NextFunction){
        try {
            
            if(!request.params.groupId){
                throw new HttpException(400,"Please provide the planId")
            }
            const savingsGroup = await this.SavingsGroupService.findById(request.params.groupId as unknown as number)
            response.status(200).json(savingsGroup)
        } catch (err) {
            next(err)
        }
    }
   public async acceptorRejectInvite(request: RequestWithUser, response: Response, next: NextFunction){
        try {
            
            if(!request.params.planId){
                throw new HttpException(400,"Please provide the planId")
            }
            if(!request.query.status){
                throw new HttpException(400,"Please a query params of status")
            }
            const savingsGroup = await this.SavingsGroupService.acceptorRejectInvite(
                request.params.planId as unknown as number,
                request.user.id,
                request.query.status as unknown as string
                )
            response.status(200).json(savingsGroup)
        } catch (err) {
            next(err)
        }
    }

}
export default SavingsGroupController