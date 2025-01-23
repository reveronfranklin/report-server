import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ReportHeaderDto {
  @IsString()
  @IsNotEmpty()
  DESCRIPCION: string;

  @IsString()
  @IsNotEmpty()
  NUMERO_COMPROMISO: string;

  @IsString()
  @IsNotEmpty()
  TITULO: string;

  @IsString()
  @IsNotEmpty()
  NUMERO_ORDEN_PAGO: string;

  @IsDate()
  @IsNotEmpty()
  FECHA_ORDEN_PAGO: Date;

  @IsDate()
  @IsNotEmpty()
  FECHA_COMPROMISO: Date;
}