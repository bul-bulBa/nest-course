import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator"

export class RegisterRequest {
    @ApiProperty({
        description: 'user name',
        example: 'john',
        maxLength: 15
    })
    @IsString({message: 'name must be string'})
    @IsNotEmpty({message: 'name is required'})
    @MaxLength(15, {message: 'name must be less then 16 symbols'})
    name: string

    @ApiProperty({
        description: 'user email',
        example: 'example@gmail.com'
    })
    @IsString({message: "email must be string"})
    @IsNotEmpty({message: 'email is required'})
    @IsEmail({}, {message: 'email must be in correct format'})
    email: string

    @ApiProperty({
        description: 'user password',
        example: '12345678',
        minLength: 6,
        maxLength: 16
    })
    @IsString({message: "password must be string"})
    @IsNotEmpty({message: 'password is required'})
    @MinLength(6, {message: 'password cannot be less than 6 symbols'})
    @MaxLength(16, { message: 'password cannot be more than 16 symbols'})
    password: string 
} 