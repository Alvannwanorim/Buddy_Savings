
import { NextFunction, Request, response, Response } from "express"
import UserService from "../services/userService"
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";
import { RequestWithUser } from "@/interfaces/request-with-user.interface";




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
        console.log(request.headers);
        
        const usersData : LoginDto = request.body
        const token = await this.userService.login(usersData)
        response.status(201).json({token})
    } catch (err) {
        next(err)
    }
        
   }



}
export default UserController