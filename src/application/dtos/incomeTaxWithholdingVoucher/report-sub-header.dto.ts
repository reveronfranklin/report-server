import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ReportSubHeaderDto {
  @IsString()
  @IsNotEmpty()
  NOMBRE_AGENTE_RETENCION: string;

  @IsString()
  @IsNotEmpty()
  TELEFONO_AGENTE_RETENCION: string;

  @IsString()
  @IsNotEmpty()
  RIF_AGENTE_RETENCION: string;

  @IsString()
  @IsNotEmpty()
  DIRECCION_AGENTE_RETENCION: string;

  @IsDate()
  @IsNotEmpty()
  FECHA: Date;

  @IsString()
  @IsNotEmpty()
  PERIODO_FISCAL: string;

  @IsString()
  @IsNotEmpty()
  NOMBRE_SUJETO_RETENIDO: string;

  @IsString()
  @IsNotEmpty()
  RIF_SUJETO_RETENIDO: string;

  @IsString()
  @IsNotEmpty()
  NRO_ORDEN_PAGO: string;
}