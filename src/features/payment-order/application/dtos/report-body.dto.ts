// src/features/payment-order/application/dtos/report-body.dto.ts

import { IsNumber, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class ReportBodyDto {
  @IsNumber()
  @IsPositive()
  CODIGO_ORDEN_PAGO: number;

  @IsNumber()
  @IsPositive()
  MONTO: number;

  @IsString()
  @IsNotEmpty()
  CONCEPTO: string;

  // Puedes agregar más campos según sea necesario, siguiendo el mismo patrón
}