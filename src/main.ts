import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ApiResponseInterceptor } from './interceptors/response.interceptor';
import { AppModule } from './app.module';
import configureCors from './config/cors';
import getServerIp from './config/server';

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose']
    })

    /* Obtener la configuración */
    const configService = app.get(ConfigService)
    const environment   = configService.get('environment')

    const { port, prefix, allowedOrigins } = configService.get('server')

    /* Configurar prefijo global */
    app.setGlobalPrefix(prefix)

    /* Interceptores */
    app.useGlobalInterceptors(new ApiResponseInterceptor())

    /* Configurar CORS */
    configureCors(app, allowedOrigins, environment)

    /* Obtener la IP del servidor */
    const serverIp = getServerIp(environment)

    /* Iniciar el servidor */
    await app.listen(port)

    const protocol  = `http${app.getHttpAdapter().getHttpServer().secure ? 's' : ''}`
    const serverUrl = `${protocol}://${serverIp}:${port}/${prefix}`

    /* Logs */
    logger.log(`Servidor ejecutándose en el puerto ${port}`)
    logger.log(`Aplicación disponible en: ${serverUrl}`)
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