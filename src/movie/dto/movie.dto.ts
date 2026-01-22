import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from "class-validator"

export class MovieDto {
    @ApiProperty({ description: 'film name', example: 'fight club', type: String })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({ description: 'release year', example: 1999, type: Number})
    @IsNotEmpty()
    @IsInt()
    @Min(1888)
    @Max(new Date().getFullYear())
    releaseYear: number

    @ApiPropertyOptional({description: 'poster url', example: 'https://example.com/123.png', type: String})
    @IsOptional()
    @IsString()
    imageUrl: string

    @ApiProperty({description: 'array with actor ids', example: ['123', '456', '789'], type: [String]})
    @IsArray()
    @IsUUID('4', {each: true})
    actorIds: string[]

} 