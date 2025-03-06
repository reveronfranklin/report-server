import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { INestApplication } from '@nestjs/common';

/**
 * Configura las opciones CORS para la aplicación
 * @param app Instancia de la aplicación NestJS
 * @param allowedOrigins Array de orígenes permitidos
 */
export function configureCors(app: INestApplication, allowedOrigins: string[]): void {
  const logger = new Logger('CORS')

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Manejar solicitudes sin origen (como las de Postman o curl)
      if (!origin) {
        logger.warn('Solicitud recibida sin origen definido')
        if (process.env.NODE_ENV === 'development') {
          return callback(null, true)
        }

        return callback(new Error('No se permiten solicitudes sin origen'), false)
      }

      // Verificar si el origen está en la lista de permitidos
      if (allowedOrigins.includes(origin)) {
        logger.log(`Solicitud CORS aceptada desde origen: ${origin}`)
        return callback(null, true)
      }

      // Rechazar orígenes no permitidos
      logger.warn(`Solicitud CORS rechazada desde origen: ${origin}`)
      return callback(new Error('No permitido por CORS'), false)
    },
    methods: ['POST'],
    credentials: true,
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, x-refresh-token',
    exposedHeaders: 'access-control-allow-origin'
  };

  app.enableCors(corsOptions)
}