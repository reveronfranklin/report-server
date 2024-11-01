import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ReportHeaderDto {
  @IsString()
  @IsNotEmpty()
  DESCRIPCION: string;

  @IsString()
  @IsNotEmpty()
  TIPO_ORDEN_PAGO: string;

  @IsDate()
  @IsNotEmpty()
  FECHA_ORDEN_PAGO: Date;

  @IsString()
  @IsNotEmpty()
  NOMBRE_PROVEEDOR: string;

  @IsString()
  @IsNotEmpty()
  CEDULA_PROVEEDOR: string;

  @IsString()
  @IsNotEmpty()
  RIF_PROVEEDOR: string;

  @IsString()
  @IsNotEmpty()
  NOMBRE_BENEFICIARIO: string;

  @IsString()
  @IsNotEmpty()
  APELLIDO_BENEFICIARIO: string;

  @IsString()
  @IsNotEmpty()
  CEDULA_BENEFICIARIO: string;

  @IsDate()
  @IsNotEmpty()
  FECHA_PLAZO_DESDE: Date;

  @IsDate()
  @IsNotEmpty()
  FECHA_PLAZO_HASTA: Date;

  @IsString()
  @IsNotEmpty()
  FORMA_DE_PAGO: string;
}