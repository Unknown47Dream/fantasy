import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  // app.enableShutdownHooks();
  // if (process.env.NODE_ENV === 'development') {
  //   app.enableCors({
  //     origin: 'http://localhost:5173', // Vite default port
  //     credentials: true,
  //   });
  //   console.log('CORS enabled for development');
  // }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
