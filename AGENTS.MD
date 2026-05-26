# AGENTS.MD

Guia para agentes y desarrolladores que trabajen en este repositorio.

## Resumen del proyecto

`report-server` es una API NestJS orientada a generar reportes PDF. La aplicacion recibe peticiones HTTP, obtiene datos desde PostgreSQL o desde APIs externas, transforma esos datos a DTOs de reporte y delega la construccion del PDF a generadores basados en `pdfmake`/`PDFKit`.

La arquitectura dominante es modular por feature, con una separacion cercana a Clean Architecture:

- `domain`: entidades, interfaces y contratos de repositorio/puertos.
- `application`: casos de uso, servicios y DTOs de entrada/salida del reporte.
- `infrastructure`: controladores HTTP, persistencia Sequelize, clientes externos, mappers y templates PDF.
- `shared`: modulos transversales como base de datos e impresion.
- `config`, `exceptions`, `interceptors`, `middleware`: soporte global de la aplicacion.

## Stack principal

- Node.js + TypeScript.
- NestJS 10.
- Sequelize + `sequelize-typescript`.
- PostgreSQL.
- `@nestjs/axios` para integraciones HTTP.
- `pdfmake`, `pdfkit` y `blob-stream` para generar y entregar PDFs.
- Joi para validacion de variables de entorno.
- Jest para pruebas.

## Comandos utiles

```bash
npm install
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

Antes de entregar cambios relevantes, ejecuta al menos `npm run build`. Si modificas logica de servicios, mappers o repositorios, ejecuta tambien `npm run test` cuando existan pruebas aplicables.

## Entrada de la aplicacion

- `src/main.ts`: bootstrap NestJS, prefijo global, interceptor de respuesta, filtro global de excepciones, CORS y arranque del servidor.
- `src/app.module.ts`: registra configuracion global, modulos compartidos, features y middleware de autenticacion para rutas `POST`.
- `src/config/config-loader.ts`: mapea variables de entorno a estructura de configuracion.
- `src/config/env-schema.ts`: valida variables obligatorias con Joi.

La API usa un prefijo global definido por `PREFIX` y el puerto definido por `SERVER_PORT`.

## Modulos principales

### Shared

`src/shared/shared.module.ts` exporta:

- `DatabaseModule`: configura Sequelize con `SequelizeModule.forRootAsync`.
- `PrinterModule`: expone `PrinterService`, que crea documentos PDF usando fuentes Roboto desde `src/assets/fonts`.

### Payment Order

`src/features/payment-order` agrupa reportes relacionados con ordenes de pago y comprobantes:

- Controladores HTTP en `infrastructure/http/controllers`.
- Servicios de caso de uso en `application/services`.
- DTOs por reporte en `application/dtos`.
- Repositorios Sequelize en `infrastructure/persistence/repositories`.
- Modelos Sequelize en `infrastructure/persistence/models`.
- Mappers de modelo a DTO en `infrastructure/persistence/mappers`.
- Templates PDF en `infrastructure/pdf/generators/templates`.
- Factory de PDF en `infrastructure/pdf/pdf-generator.factory.ts`.

El modulo registra modelos con `SequelizeModule.forFeature` y enlaza contratos por tokens string, por ejemplo:

- `IPaymentOrderRepository` -> `PaymentOrderRepository`.
- `IVatWithholdingVoucherRepository` -> `VatWithholdingVoucherRepository`.
- `IPdfGeneratorFactory` -> `PdfGeneratorFactory`.

Tambien aplica `ReplicatePaymentOrderMiddleware` a rutas de generacion PDF especificas.

### Treasury

`src/features/treasury` agrupa reportes de tesoreria:

- Controladores HTTP en `infrastructure/http/controllers`.
- Servicios de aplicacion en `application/services`.
- Puertos de dominio en `domain/ports`.
- Adaptadores HTTP externos en `infrastructure/api-clients/adapters`.
- Mappers de respuesta externa en `infrastructure/api-clients/mappers`.
- Templates PDF en `infrastructure/pdf/generators/templates`.
- Factory de PDF propia en `infrastructure/pdf/pdf-generator.factory.ts`.

Este modulo obtiene datos principalmente desde APIs externas configuradas con `API_BASE_URL` y `API_AUTH_URL`.

## Flujo general de generacion PDF

1. Un controlador recibe una peticion `POST`.
2. El DTO de entrada contiene identificadores o parametros del reporte.
3. El servicio valida parametros minimos y consulta un repositorio/puerto.
4. El repositorio obtiene datos desde DB o API externa.
5. Un mapper transforma modelos/respuestas raw al `ReportSchemeDto` esperado por el template.
6. El servicio obtiene el generador desde `IPdfGeneratorFactory`.
7. El generador construye `TDocumentDefinitions` y usa `PrinterService` para crear un `PDFKit.PDFDocument`.
8. El controlador convierte el documento a buffer y retorna `StreamableFile` con headers `application/pdf`.

El `ApiResponseInterceptor` deja pasar `StreamableFile` sin envolverlo, y envuelve el resto de respuestas en `ResponseDto`.

## Convenciones de capas

Mantener dependencias en esta direccion:

- `domain` no debe depender de `application` ni `infrastructure`.
- `application` puede depender de `domain` y contratos compartidos.
- `infrastructure` implementa contratos, conoce frameworks, modelos Sequelize, HTTP, PDF y detalles externos.
- `shared` debe contener servicios reutilizables y sin conocimiento fuerte de una feature especifica.

Evita colocar queries, llamadas HTTP externas o detalles de PDF directamente en controladores. El controlador debe orquestar la entrada/salida HTTP; la logica debe vivir en servicios, repositorios, mappers y generadores.

## Como agregar un nuevo reporte

1. Crea DTOs del reporte en `application/dtos/<nombreReporte>`.
2. Define o reutiliza entidades/interfaces en `domain`.
3. Crea un puerto de repositorio en `domain/repositories` o `domain/ports`.
4. Implementa el repositorio/adaptador en `infrastructure/persistence` o `infrastructure/api-clients`.
5. Agrega mappers para transformar datos raw al DTO de reporte.
6. Crea el generador PDF en `infrastructure/pdf/generators/templates/<nombreReporte>`.
7. Registra el generador en la `PdfGeneratorFactory` del modulo correspondiente.
8. Registra provider, controller y, si aplica, modelos Sequelize en el modulo.
9. Si la ruta requiere middleware especifico, agregala en `configure`.
10. Ejecuta build y pruebas.

## Contratos y tokens de inyeccion

El proyecto usa tokens string para varios contratos:

```ts
@Inject('IPaymentOrderRepository')
@Inject('IPdfGeneratorFactory')
```

Cuando agregues un contrato nuevo:

- Declara la interfaz en `domain`.
- Implementala en `infrastructure`.
- Registra el provider en el modulo con `{ provide: 'NombreDelToken', useClass: Implementacion }`.
- Usa exactamente el mismo token en el servicio.

Considera centralizar tokens en constantes si el numero de contratos sigue creciendo.

## Mappers

Los mappers son una pieza critica del proyecto. Deben:

- Aislar nombres de columnas, aliases Sequelize y estructuras externas.
- Entregar DTOs ya normalizados para los templates.
- Evitar que los generadores PDF conozcan modelos Sequelize o payloads externos.

Si un PDF requiere un cambio visual pero los datos ya existen, modifica preferiblemente el template. Si cambia la forma de datos requerida, modifica primero el mapper y el DTO.

## PDF y templates

Los generadores implementan `IPdfGenerator`:

```ts
createDocumentDefinitions(data: any): Promise<TDocumentDefinitions>
generatePdf(data: TDocumentDefinitions): Promise<PDFKit.PDFDocument>
```

Convenciones observadas:

- Cada template suele tener `index.ts`, `sections` y `styles`.
- Los componentes comunes de PDF viven bajo `infrastructure/pdf/generators/components`.
- `PrinterService` usa fuentes Roboto locales.

Al modificar PDFs, revisa visualmente el resultado. El build puede pasar aunque el layout del PDF quede incorrecto.

## Configuracion y entorno

Usa `env.template` como referencia de variables. No hardcodees credenciales ni URLs nuevas en codigo fuente.

Variables importantes:

- `NODE_ENV`
- `PREFIX`
- `SERVER_PORT`
- `ALLOWED_ORIGINS`
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `DB_SYNCHRONIZE`, `DB_LOGGING`, `DB_AUTO_LOAD_MODELS`
- `API_AUTH_URL`
- `API_BASE_URL`

Nota: `env.template` contiene valores reales de ejemplo. Trata cualquier credencial o IP como sensible.

## Manejo de errores y respuestas

- Usa excepciones del directorio `src/exceptions` para errores esperados.
- `GlobalExceptionFilter` transforma errores a la estructura `IResponse`.
- Para errores de integraciones externas o generacion PDF, el patron actual usa `ExternalServiceException`.
- Evita devolver errores crudos de Sequelize, Axios o PDFKit al cliente.

## Middleware y autenticacion

- `AuthMidleware` se aplica globalmente a rutas `POST` desde `AppModule`.
- `ReplicatePaymentOrderMiddleware` se aplica a rutas especificas de reportes en `PaymentOrderModule`.

Antes de agregar rutas nuevas de generacion, valida si deben pasar por alguno de estos middlewares.

## Alias TypeScript

Alias disponibles en `tsconfig.json`:

- `@shared/*`
- `@config/*`
- `@modules/*`
- `@interceptors/*`
- `@exceptions/*`

Prefiere estos alias cuando ya existan en archivos cercanos. Para imports internos profundos de una feature, conserva el estilo local si el modulo ya usa rutas relativas.

## Observaciones de arquitectura

- La separacion por feature y capas esta bien encaminada y ayuda a crecer reportes sin mezclar infraestructura con casos de uso.
- Hay duplicacion conceptual de `PdfGeneratorFactory` por feature. Esta bien si cada modulo tiene catalogos distintos, pero podria evolucionar a un registro compartido si aparecen muchos reportes.
- Los tokens string funcionan, pero son fragiles ante typos. Una mejora segura seria definir constantes por modulo.
- Los controladores repiten el patron de convertir `PDFKit.PDFDocument` a `StreamableFile`. Podria extraerse a un helper compartido si se siguen agregando reportes.
- El README sigue siendo el starter de NestJS. Este archivo debe considerarse la guia practica hasta que el README se actualice.
- Hay nombres con typos historicos, por ejemplo `Thrid` y `fecth`. No los renombres sin revisar impacto en imports, factories y rutas.

## Reglas para cambios futuros

- Mantener cambios acotados a la feature afectada.
- No mezclar refactors globales con cambios de negocio o layout PDF.
- No modificar archivos bajo `Requerimientos/` salvo que la tarea lo pida explicitamente.
- No cambiar contratos de respuesta sin validar clientes consumidores.
- No activar `DB_SYNCHRONIZE=true` en entornos compartidos.
- No commitear `.env`, credenciales nuevas ni artefactos generados pesados.
- Si encuentras cambios no tuyos en el working tree, preservalos.

## Checklist antes de finalizar

- `npm run build` pasa.
- Los imports siguen el estilo del modulo.
- El modulo registra providers, controllers, models y factory keys necesarias.
- Los DTOs y mappers reflejan el shape real consumido por el PDF.
- La ruta nueva respeta prefijo global, middleware y headers esperados.
- Si es un cambio visual de PDF, el archivo generado fue revisado manualmente.

