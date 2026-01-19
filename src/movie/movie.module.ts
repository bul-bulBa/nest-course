import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
