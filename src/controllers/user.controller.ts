
import { NextFunction, Request, response, Response } from "express"
import UserService from "../services/user.services"
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { HttpException } from "../exceptions/httpExceptions";




class UserController {
   public userService = new UserService();
    
    
    public async findAllUsers(request: Request, response: Response, next: NextFunction){
        const users = await this.userService.findAll();
        response.status(201).json(users)
    }
    public async test(request: RequestWithUser, response: Response, next: NextFunction){
        const users = request.user
        console.log(users);
        
        response.status(201).json(users)
    }


   public async register(request: Request, response: Response, next: NextFunction){
    try {
        const usersData : CreateUserDto = request.body
        const createdUser = await this.userService.create(usersData)
        response.status(201).json(createdUser)
    } catch (err) {
        next(err)
    }
        
   }
   public async login(request: Request, response: Response, next: NextFunction){
    try {
        const usersData : LoginDto = request.body
        const token = await this.userService.login(usersData)
        response.status(201).json({token})
    } catch (err) {
        next(err)
    }
        
   }

   public async findOne(request: Request, response: Response, next: NextFunction){
        try {
            if(!request.params.userId){
                throw new HttpException(400,"Please provide the userId")
            }
            const user = await this.userService.findOne(request.params.userId as unknown as number)
            response.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
   
   public async currentUser(request: RequestWithUser, response: Response, next: NextFunction){
    try {
        const user = request.user
        delete user.password
        response.status(200).json(user)
    } catch (err) {
        next(err)
    }
   }



}
export default UserController