import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions/httpExceptions";
const handleErrorMiddleware=(error: HttpException, request: Request, response: Response, next: NextFunction)=>{
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Custom error message'
        console.error(error.message)
        response.status(status).json({message})     
    } catch (error) {
        next(error)
        
    }
}

export default handleErrorMiddleware