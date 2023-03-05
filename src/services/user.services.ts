import { UserEntity } from "../entity/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { HttpException } from "../exceptions/httpExceptions";
import { UserRepository } from "../repositories/user.repository";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { LoginDto } from "../dto/login.dto";
import { Payload } from "../interfaces/payload.interface";
class UserService {
   

    /**
     * Generate access token for a user
     * @param usersData 
     * @returns `access_token`
     */
    public async login(usersData: LoginDto) {
        const user: UserEntity = await UserRepository.findByEmail(usersData.email);

        if(!user){
            throw new HttpException(404,"User not found")
        }
        const isMatch = await bcrypt.compare(usersData.password, user.password)
        if(!isMatch){
            throw new HttpException(400,"Password mismatch")
        }
        const payload: Payload ={
            email: user.email,
            sub: user.id
        }

        const token =  jwt.sign(payload, process.env.JWT_SECRET)
        return token
    }

    /**
     * save or update user record to the database
     * @param usersData 
     * @returns `User`
     */
    public async create(usersData: CreateUserDto) {
        const user = await UserRepository.findByEmail(usersData.email )
        // console.log(user);
        
        if(user){
            throw new HttpException(400,"User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        usersData.password = await bcrypt.hash(usersData.password, salt)

        const createdUser = UserRepository.save({...usersData})
        return createdUser
    }

    /**
     * @description retrieves all user records from the database
     * @returns `User[]`
     */
    public async findAll():Promise<UserEntity[]>{
        return await UserRepository.find({})
    }

    /**
     * @description retrieves a single user records from the database
     * @returns `User`
     */
    public async findOne(userId: number):Promise<UserEntity> {
        const user =  await UserRepository.findById(userId);
        if(!user) throw new HttpException(404,"User not found")
        return user
    }
}

export default UserService;