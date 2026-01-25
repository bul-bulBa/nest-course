import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  const config = app.get(ConfigService)

  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGINS').split(','),
    // origin: *,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeaders: '*'
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();  
