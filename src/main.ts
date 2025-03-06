import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { configureCors } from './config/cors';
import { Request, Response, NextFunction } from 'express';

const clientIp = {
  ip: 'localhost'
}

const getClientIp = (req: Request, res: Response, next: NextFunction) => {
  // Obtener la dirección IP
  let ip = req?.ip ?? 'localhost'

  // Convertir a IPv4 si es necesario
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7) // Eliminar la parte '::ffff:'
  }

  clientIp.ip = ip

  next()
}

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  try {
    // Crear la aplicación NestJS
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    })

    // Registrar el middleware antes de iniciar el servidor
    app.use(getClientIp);

    // Obtener la configuración
    const configService = app.get(ConfigService)
    const { port, prefix, allowedOrigins } = configService.get('server')

    // Configurar CORS
    configureCors(app, allowedOrigins)

    // Configurar prefijo global
    app.setGlobalPrefix(prefix)

    // Iniciar el servidor
    await app.listen(port)

    const serverUrl = `http${app.getHttpAdapter().getHttpServer().secure ? 's' : ''}://${clientIp.ip}:${port}/${prefix}`;

    logger.log(`Servidor ejecutándose en el puerto ${port}`);
    logger.log(`Aplicación disponible en: ${serverUrl}`);
  } catch (error) {
    logger.error(`Error al iniciar la aplicación: ${error.message}`, error.stack)
    process.exit(1)
  }
}

// Iniciar la aplicación
bootstrap().catch(err => {
  console.error('Error durante el arranque:', err)
  process.exit(1)
})