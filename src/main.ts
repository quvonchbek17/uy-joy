import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)
  const port = config.getOrThrow<number>('app.port')

  app.setGlobalPrefix("api/v1")
  
  await app.listen(port);
}
bootstrap();
