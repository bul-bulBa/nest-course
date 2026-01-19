import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length, Matches, MaxLength, MinLength } from "class-validator";
import { StartsWith } from "src/common/decorators/start-with.decorator";

export enum TaskTag {
    WORK = 'work',
    STUDY = 'study',
    HOME = 'home'
}

export class createTaskDto {

    @IsString()
    @IsNotEmpty()
    @StartsWith("Task:")
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsInt({message: 'priority must be a full number'})
    @IsPositive({message: 'priority must be positive'})
    priority: number

    @IsArray()
    @IsEnum(TaskTag, {each: true})
    @Length(1, 20, {each: true, message: 'invalid tag name'})
    @IsOptional()
    tags: TaskTag[]

}

