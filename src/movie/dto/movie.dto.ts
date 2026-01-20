import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from "class-validator"

export class MovieDto {
    
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsInt()
    @Min(1888)
    @Max(new Date().getFullYear())
    releaseYear: string

    @IsOptional()
    @IsString()
    imageUrl: string

    @IsArray()
    @IsUUID('4', {each: true})
    actorIds: string[]

} 