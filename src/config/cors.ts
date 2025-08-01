import { INestApplication, Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { BadRequestException } from '@exceptions/bad-request.exception';

/**
 * Configura las opciones CORS para la aplicación
 * @param app Instancia de la aplicación NestJS
 * @param allowedOrigins Array de orígenes permitidos
 */
const configureCors = (app: INestApplication, allowedOrigins: string[], environment: string): void => {
  const logger = new Logger('CORS')
  logger.log(`Configurando CORS para el entorno: ${environment}`)

  try {} catch (error) {
    logger.error(`Error configureCors: ${error.message}`)
  }

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Manejar solicitudes sin origen (como las de Postman o curl)
      if (!origin) {
          if (environment === 'development') {
          logger.warn('Solicitud recibida sin origen definido')
          return callback(null, true)
        }

        logger.error('Solicitud recibida sin origen definido')
        return callback(new BadRequestException('No se permiten solicitudes sin origen'), false)
      }

      // Verificar si el origen está en la lista de permitidos
      if (allowedOrigins.includes(origin)) {
        logger.log(`Solicitud CORS aceptada desde origen: ${origin}`)
        return callback(null, true)
      }

      // Rechazar orígenes no permitidos
      logger.error(`Solicitud CORS rechazada desde origen: ${origin}`)
      return callback(new BadRequestException('No permitido por CORS, origen no permitido'), false)
    },
    methods: ['POST'],
    credentials: true,
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, x-refresh-token',
    exposedHeaders: 'access-control-allow-origin'
  }

  app.enableCors(corsOptions)
}

export default configureCors