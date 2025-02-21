import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { port, prefix, allowedOrigins } = configService.get('server');

  // CORS
  app.enableCors({
    origin: (origin, callback) => {
      console.log(`Solicitud recibida desde origen: ${origin}`);
      if (origin === undefined) {
        console.log('Solicitud recibida sin origen definido');
        // Decide si quieres permitir o rechazar estas solicitudes
        // Para permitir:
        //callback(null, true);
        // Para rechazar:
        console.log('Solicitud recibida sin origen definido');
        callback(new Error('No se permiten solicitudes sin origen'), false);
      } else if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`Solicitud CORS rechazada desde origen: ${origin}`);
        callback(new Error('No permitido por CORS'), false);
      }
    },
    methods: 'POST',
    credentials: true,
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, x-refresh-token',
    exposedHeaders: 'access-control-allow-origin'
  });

  // Global prefix
  app.setGlobalPrefix(prefix);

  await app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
  });
}
bootstrap();