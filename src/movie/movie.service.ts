import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRopository: Repository<MovieEntity>,
        @InjectRepository(ActorEntity)
        private readonly actorRepository: Repository<ActorEntity>,
        @InjectRepository(MoviePosterEntity)
        private readonly posterRepository: Repository<MoviePosterEntity>
    ) { }

    async findAll(): Promise<MovieEntity[]> {
        return await this.movieRopository.find({
            where: {
                isAvailable: true
            },
            order: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true
            }
        })
    }

    async findById(id: string): Promise<MovieEntity> {
        const movie = await this.movieRopository.findOne({
            where: {
                id,
            },
            relations: ['actors']
        })

        if (!movie) throw new NotFoundException('film is not found')

        return movie
    }

    async create(dto: MovieDto): Promise<MovieEntity> {
        const { title, releaseYear, imageUrl, actorIds } = dto

        const actors = await this.actorRepository.find({
            where: {
                id: In(actorIds)
            }
        })

        if (!actors || !actors.length)
            throw new NotFoundException('One or many actors not found')

        let poster: MoviePosterEntity | null = null

        if(imageUrl) {
            poster = this.posterRepository.create({url: imageUrl})
            await this.posterRepository.save(poster)
        }

        const movie = this.movieRopository.create({ title, releaseYear, poster, actors })

        return await this.movieRopository.save(movie)
    }

    async update(id: string, dto: MovieDto): Promise<boolean> {
        const movie = await this.findById(id)

        Object.assign(movie, dto)

        await this.movieRopository.save(movie)

        return true
    }

    async delete(id: string): Promise<string> {
        const movie = await this.findById(id)

        await this.movieRopository.remove(movie)

        return movie.id
    }
}
