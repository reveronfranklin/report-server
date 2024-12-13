import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { port, prefix } = configService.get('server');

  // Global prefix
  app.setGlobalPrefix(prefix);

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`server running in port ${port}`);
  });
}
bootstrap();
