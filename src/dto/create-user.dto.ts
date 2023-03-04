import { IsString, IsEmail,MinLength, IsPhoneNumber } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(3)
    firstName: string

    @IsString()
    @MinLength(3)
    lastName: string

    @IsString()
    @IsPhoneNumber('NG')
    phoneNumber: string

    @IsString()
    @MinLength(6)
    password: string
}