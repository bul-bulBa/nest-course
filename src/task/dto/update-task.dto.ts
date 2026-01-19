import { IsBoolean, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class updateTaskDto {

    @IsString({message: 'task must be string'})
    @IsNotEmpty({message: 'task must be'})
    @Length(1, 10, {message: 'title must be from 2 to 10 symbols'})
    
    title: string

    @IsBoolean({message: 'isCompleted must be boolean'})
    isCompleted: boolean
}