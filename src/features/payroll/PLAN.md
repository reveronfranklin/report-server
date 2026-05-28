# Plan de implementacion: Reporte de Personal

Este plan describe los pasos propuestos para implementar el reporte PDF de personal usando la API vertical documentada en `Requerimientos/ReportePersonal`.

## Objetivo

Crear un nuevo reporte PDF llamado `Reporte de Personal`, alimentado desde la API:

```text
POST ${API_BASE_URL_VERTICAL}/ReportePersonal/GetAll
```

Body esperado:

```json
{
  "codigoTipoNomina": 20,
  "status": "A"
}
```

El PDF debe respetar el modelo visual de `RH_LISTADO_PERSONAL.pdf` y la imagen embebida en `0.MM.SAMI.RH.ReporteListadoPersonal.docx`.

## Alcance funcional

- Consumir datos desde la API vertical, no desde Sequelize.
- Generar PDF en formato horizontal.
- Usar logos locales desde `src/assets`.
- Agrupar empleados por `departamento`.
- Hacer salto de pagina por departamento.
- Mostrar total de sueldo por departamento.
- Mostrar conteo de registros por departamento.
- Mostrar gran total de sueldo y conteo general.
- Incluir filas de cargos vacantes cuando vengan desde la API.

## Estructura propuesta

```text
src/features/payroll/
  payroll.module.ts
  domain/
    entities/
      personnel-list-item.entity.ts
      personnel-list-report.entity.ts
    interfaces/
      personnel-list-api-response.interface.ts
      personnel-list-item-raw.interface.ts
    ports/
      personnel-list.repository.ts
  application/
    dtos/
      personnelList/
        report-query.dto.ts
        report-header.dto.ts
        report-body.dto.ts
        report-department.dto.ts
        report-summary.dto.ts
        report-scheme.dto.ts
    services/
      personnel-list.service.ts
  infrastructure/
    api-clients/
      adapters/
        personnel-list.adapter.ts
      dtos/
        report-query-api.dto.ts
      mappers/
        personnel-list.mapper.ts
        report-query.mapper.ts
    http/
      controllers/
        personnel-list.controller.ts
    pdf/
      pdf-generator.factory.ts
      generators/
        components/
          header/
            index.ts
            styles.ts
        templates/
          personnelList/
            index.ts
            sections/
              department-header.ts
              table.ts
              totals.ts
            styles/
              body.ts
              header.ts
              totals.ts
```

## Paso 1: Registrar configuracion vertical

Estado actual: ya existe `API_BASE_URL_VERTICAL` en:

- `.env`
- `env.template`
- `src/config/env-schema.ts`
- `src/config/config-loader.ts`

Uso esperado:

```ts
this.configService.get<string>('api.ossmmasoft.verticalBaseUrl');
```

Antes de implementar, confirmar que el ambiente donde se despliegue tenga esta variable.

## Paso 2: Crear contratos de dominio

Crear `IPersonnelListRepository` con un metodo:

```ts
getPersonnelList(query: ReportQueryDto): Promise<ReportSchemeDto | null>
```

Crear interfaces para el item raw de API:

```ts
cedula: string | null;
nombre: string;
fechaIngreso: string | null;
departamento: string;
codigo: string;
cargo: string;
sueldo: number;
descripcionStatus: string | null;
tipoNomina: string;
```

## Paso 3: Crear DTOs de aplicacion

Crear DTO de query interno:

```ts
payrollTypeCode: number
status?: string
```

Crear DTOs del esquema del reporte:

- `ReportHeaderDto`: titulo, fechaEmision, tipoNomina.
- `ReportBodyDto`: departamentos.
- `ReportDepartmentDto`: nombre/codigo departamento, items, totalSueldo, totalRegistros.
- `ReportSummaryDto`: totalGeneralSueldo, totalGeneralRegistros.
- `ReportSchemeDto`: header, body, summary.

## Paso 4: Crear DTO HTTP de entrada

Crear `ReportQueryApiDto` con nombres iguales al requerimiento:

```ts
codigoTipoNomina: number
status?: string
```

Validaciones:

- `codigoTipoNomina` requerido, numerico y positivo.
- `status` opcional, string.

## Paso 5: Crear mapper de query

Crear `ReportQueryMapper`:

```ts
codigoTipoNomina -> payrollTypeCode
status -> status
```

Este mapper evita que el servicio de aplicacion dependa del naming externo.

## Paso 6: Crear adapter HTTP

Crear `PersonnelListAdapter` usando `HttpService` y `ConfigService`.

Endpoint:

```ts
POST`${verticalBaseUrl}/ReportePersonal/GetAll`;
```

Payload enviado:

```ts
{
  codigoTipoNomina: query.payrollTypeCode,
  status: query.status
}
```

Reglas:

- Si `response.data?.data` no existe, lanzar `NotFoundException`.
- Si `isValid === false`, lanzar `BadRequestException`.
- Si `data` es arreglo vacio, lanzar `NotFoundException`.
- En errores HTTP o errores inesperados, envolver con `ExternalServiceException`.

## Paso 7: Crear mapper de datos a reporte

Crear `PersonnelListMapper` para:

1. Normalizar campos.
2. Separar `departamento` en codigo y denominacion cuando sea posible.
3. Agrupar por `departamento`.
4. Ordenar grupos segun el orden recibido o por departamento, segun convenga al modelo.
5. Calcular:
   - total de sueldo por departamento.
   - cantidad de registros por departamento.
   - total general de sueldo.
   - cantidad total general.
6. Mantener empleados vacantes:
   - `cedula` vacia.
   - `nombre` igual a `VACANTE`.
   - `status` vacio si viene null.

Formato recomendado:

- sueldo: guardar numerico en DTO, formatear en PDF.
- fechas: mantener disponibles, pero no mostrarlas inicialmente porque el modelo visual no las incluye.

## Paso 8: Crear servicio de aplicacion

Crear `PersonnelListService.generateReport(query: ReportQueryDto)`.

Flujo:

1. Validar `payrollTypeCode`.
2. Consultar `IPersonnelListRepository`.
3. Si no hay datos, lanzar `NotFoundException`.
4. Obtener generador `personnelList` desde `IPdfGeneratorFactory`.
5. Crear document definitions.
6. Generar y retornar `PDFKit.PDFDocument`.

## Paso 9: Crear factory PDF del feature

Crear `src/features/payroll/infrastructure/pdf/pdf-generator.factory.ts`.

Registrar:

```ts
this.generators.set('personnelList', personnelListPdf);
```

Mantener el mismo contrato compartido:

```ts
IPdfGeneratorFactory;
```

## Paso 10: Crear generador PDF

Crear `PersonnelListPdf` que implemente `IPdfGenerator`.

Configuracion base:

```ts
pageOrientation: 'landscape';
pageSize: 'LETTER';
pageMargins: [20, 24, 20, 24];
```

Usar `PrinterService` para generar el PDF.

## Paso 11: Construir layout del PDF

Elementos:

1. Encabezado institucional:

   - texto: `Republica Bolivariana de Venezuela`.
   - logo izquierdo: `src/assets/logoLeft.jpeg`.
   - logo derecho si aplica: `src/assets/logoRight.jpg`.
   - titulo: `REPORTE DE PERSONAL`.
   - fecha: `FECHA DE EMISION: DD/MM/YYYY hh:mm:ss A`.
   - paginacion: `Pagina X de Y`.

2. Encabezado de departamento:

   - primera fila: `UNIDAD EJECUTORA`.
   - segunda fila: codigo + denominacion del departamento.

3. Tabla:

   - `CEDULA`
   - `APELLIDOS Y NOMBRES`
   - `CODIGO CARGO`
   - `DENOMINACION`
   - `STATUS`
   - `SUELDO`

4. Totales por departamento:

   - cantidad de registros.
   - total sueldo.

5. Gran total:
   - cantidad total de registros.
   - total general de sueldo.

Reglas visuales:

- Usar tipografia compacta.
- Evitar bordes pesados en cada fila si el modelo se ve mas limpio con lineas de seccion.
- Alinear sueldo a la derecha.
- Centrar cedula, codigo cargo y status.
- Mantener nombres y cargos con wrap.
- Agregar `pageBreak: 'before'` desde el segundo departamento.

## Paso 12: Crear controller HTTP

Crear ruta:

```text
POST /personnel-list/pdf/report
```

Controller:

- Recibe `ReportQueryApiDto`.
- Usa `ReportQueryMapper`.
- Llama `PersonnelListService.generateReport`.
- Convierte el `PDFKit.PDFDocument` a `StreamableFile`.
- Retorna `application/pdf`.

Filename:

```text
reporte-personal.pdf
```

## Paso 13: Crear modulo Payroll

Crear `PayrollModule` con:

- `SharedModule`.
- `HttpModule`.
- `PersonnelListController`.
- `PersonnelListService`.
- `PersonnelListPdf`.
- `PersonnelListAdapter`.
- `PdfGeneratorFactory`.
- Provider `IPersonnelListRepository`.
- Provider `IPdfGeneratorFactory`.

Luego registrar `PayrollModule` en `AppModule`.

## Paso 14: Probar integracion

Prueba manual sugerida:

```bash
curl -X POST http://localhost:4000/api-v1.0/personnel-list/pdf/report \
  -H "Content-Type: application/json" \
  -d '{"codigoTipoNomina":20,"status":"A"}' \
  --output reporte-personal.pdf
```

Nota: si el middleware de autenticacion exige headers, agregar los headers requeridos por la aplicacion.

## Paso 15: Validaciones finales

Ejecutar:

```bash
npm run build
```

Si `dist` tiene permisos de `root`, corregir permisos o limpiar `dist` antes de construir.

Revisar visualmente:

- Logo renderizado.
- Encabezado con fecha y paginacion.
- Salto de pagina por departamento.
- Tabla legible en landscape.
- Totales por departamento correctos.
- Gran total correcto.
- Vacantes renderizadas sin romper columnas.

## Riesgos y decisiones pendientes

- El requerimiento SQL menciona `CODIGO_EMPRESA`, pero el endpoint documentado no lo recibe. Decision actual: no incluirlo hasta que la API lo solicite.
- El modelo visual no muestra `fechaIngreso`, aunque la API la retorna. Decision actual: no incluirla en la tabla inicial.
- `API_BASE_URL_VERTICAL` debe existir en todos los ambientes.
- El build actual puede fallar si `dist` pertenece a `root`.
- Hay errores TypeScript preexistentes en templates PDF actuales por tipos de `pdfmake`; evitar copiarlos en el nuevo template.

curl -X POST http://216.244.81.116:4000/api-v1.0/personnel-list/pdf/report \
 -H "Content-Type: application/json" \
 -H "x-refresh-token: <REFRESH_TOKEN>" \
 -d '{"codigoTipoNomina":20,"status":"A"}' \
 --output reporte-personal.pdf

http://216.244.81.116:4000/api-v1.0/payment-orders/pdf/report
