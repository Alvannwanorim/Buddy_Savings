import { HttpException } from "../exceptions/httpExceptions";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { NextFunction, Response } from "express";
import { Roles } from "../enums/roles.enums";
const adminMiddleware =async (req: RequestWithUser, res: Response, next: NextFunction)=>{
    try {
        const user =req.user
        if(user.role == Roles.ADMIN || user.role == Roles.GROUP_ADMIN || user.role == Roles.SUPER_ADMIN){
            next()
        }else{
            next(new HttpException(401,"User not authorized"))
        }
    } catch (error) {
        next(new HttpException(401,"Authentication Not found"))
    }
}

export default adminMiddleware