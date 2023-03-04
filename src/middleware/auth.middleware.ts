import { HttpException } from "../exceptions/httpExceptions";
import { Payload } from "../interfaces/payload.interface";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { UserRepository } from "../repositories/user.repository";
const authMiddleware =async (req: RequestWithUser, res: Response, next: NextFunction)=>{
    try {
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            const token = req.headers.authorization.split(' ')[1]
            const decoded =  (jwt.verify(token, 'secret')) as unknown as Payload
            const email = decoded.email
            const user = await UserRepository.findByEmail(email)
            if(user){
                req.user = user
                next()
            }else{
                next(new HttpException(401, 'Wrong authentication token')); 
            }
        }else{
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401,"Wrong authentication token"))
    }
}

export default authMiddleware