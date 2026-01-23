import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator"

@InputType()
export class LoginInput {

    @Field(() => String)
    @IsString({message: "email must be string"})
    @IsNotEmpty({message: 'email is required'})
    @IsEmail({}, {message: 'email must be in correct format'})
    email: string

    @Field(() => String)
    @IsString({message: "password must be string"})
    @IsNotEmpty({message: 'password is required'})
    @MinLength(6, {message: 'password cannot be less than 6 symbols'})
    @MaxLength(16, { message: 'password cannot be more than 16 symbols'})
    password: string 
} 