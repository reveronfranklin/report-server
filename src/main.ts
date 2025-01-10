import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { port, prefix } = configService.get('server');

  // CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, x-refresh-token',
    exposedHeaders: 'access-control-allow-origin',
  });

  // Global prefix
  app.setGlobalPrefix(prefix);

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`server running in port ${port}`);
  });
}
bootstrap();
