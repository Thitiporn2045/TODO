import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const frontendOrigin = config.get<string>('FRONTEND_ORIGIN', 'http://localhost:5173');
  const corsOrigin =
    frontendOrigin.trim() === '*'
      ? true
      : frontendOrigin
          .split(',')
          .map((origin) => origin.trim())
          .filter(Boolean);

  app.enableCors({
    origin: corsOrigin,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = Number(config.get<string>('PORT', '3000'));
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
