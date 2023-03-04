import validationMiddleware from "../middleware/validation.middleware";
import { Router } from "express";

import { Routes } from "../interfaces/routes.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

class UserRoute implements Routes {
    public path = '/users';
    public router = Router()
    public userController = new UserController()
    
    constructor(){
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.get(`${this.path}`,this.userController.findAllUsers.bind(this.userController) )
        this.router.post(`${this.path}/register`,validationMiddleware(CreateUserDto, 'body'), this.userController.register.bind(this.userController) )
        this.router.post(`${this.path}/login`,validationMiddleware(LoginDto, 'body'), this.userController.login.bind(this.userController) )
        this.router.get(`${this.path}/test`,authMiddleware, this.userController.test.bind(this.userController) )

    }
}

export default UserRoute