import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'https://wedding-gallery-web-seven.vercel.app',
  });

  const PORT = process.env.PORT ?? 4000
  await app.listen(PORT)
  console.log(`Application is running in http://localhost:${PORT}/api`);
}
bootstrap();
