import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { MovieModule } from 'src/movie/movie.module';
import { ActorEntity } from 'src/actor/entities/actor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, ActorEntity]),
    MovieModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
  