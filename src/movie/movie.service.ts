import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie, MoviePoster } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class MovieService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll() {
        return await this.prismaService.movie.findMany({
            where: {
                isAvailable: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                actors: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    }

    async findById(id: string): Promise<Movie> {
        const movie = await this.prismaService.movie.findUnique({
            where: { id },
            include: {
                actors: true,
                poster: true,
                reviews: true
            }
        })

        if (!movie || !movie.isAvailable)
            throw new NotFoundException('film is not found')

        return movie
    }

    async create(dto: MovieDto): Promise<Movie> {
        const { title, releaseYear, imageUrl, actorIds } = dto

        const actors = await this.prismaService.actor.findMany({
            where: {
                id: { in: actorIds }
            }
        })

        if (!actors || !actors.length)
            throw new NotFoundException('One or many actors not found')

        const movie = await this.prismaService.movie.create({
            data: {
                title,
                releaseYear: Number(releaseYear),
                ...(imageUrl && {
                    poster: {
                        create: { url: imageUrl }
                    }
                }),

                actors: {
                    connect: actors.map(a => ({ id: a.id }))
                }
            }
        })


        return movie
    }

    async update(id: string, dto: MovieDto): Promise<boolean> {
        const { title, releaseYear, imageUrl, actorIds } = dto
        const movie = await this.findById(id)

        const actors = await this.prismaService.actor.findMany({
            where: {
                id: { in: actorIds }
            }
        })

        if (!actors || !actors.length)
            throw new NotFoundException('One or many actors not found')

        await this.prismaService.movie.update({
            where: { id: movie.id },
            data: {
                title,
                releaseYear,
                ...(imageUrl && {
                    poster: {
                        create: { url: imageUrl }
                    }
                }),
                actors: {
                    connect: actors.map(a => ({ id: a.id }))
                }
            }
        })

        return true
    }

    async delete(id: string): Promise<string> {
        const movie = await this.findById(id)

        await this.prismaService.movie.delete({
            where: { id }
        })

        return movie.id
    }
}
