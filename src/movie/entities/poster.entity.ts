import { Column, CreateDateColumn, Entity, Generated, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReviewEntity } from "src/review/entities/review.entity";
import { ActorEntity } from "src/actor/entities/actor.entity"
import { MovieEntity } from "./movie.entity";


@Entity({name: 'movie_posters'})
export class MoviePosterEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar', length: 255})
    url: string

    @OneToOne(() => MovieEntity, movie => movie.poster)
    movie: MovieEntity

    @CreateDateColumn({
        name: 'created_at'
    }) 
    createdAt: Date
} 