import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TaskModule, MovieModule, UserModule, 
    ReviewModule, ActorModule, PrismaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

