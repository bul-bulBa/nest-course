import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    PrismaModule,
    ArtistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}