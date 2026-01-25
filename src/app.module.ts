import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { TaskModule } from './task/task.module';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/static'
    }),
    PrismaModule,
    FileModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}