import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingMiddleware } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/all-exeption.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe)
  // app.use(LoggingMiddleware)
  // app.useGlobalInterceptors(new ResponseInterceptor)
  // app.useGlobalFilters(new AllExceptionFilter)

  const config = new DocumentBuilder()
  .setTitle('Nest Course api')
  .setDescription('api documentation')
  .setVersion('1.0.0')
  .setContact('bul bulBA', 'http/example.com', 'support...')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/docs', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); 
