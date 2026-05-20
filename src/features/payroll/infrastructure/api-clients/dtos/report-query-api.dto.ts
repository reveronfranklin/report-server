import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReportQueryDto {
  @ApiProperty({ example: 21 })
  @Expose({ name: 'p_tipo_nomina' }) // 🔥 Mapea la propiedad de salida
  @IsNumber()
  @IsPositive()
  payrollType: number;

  @ApiProperty({ example: 13 })
  @Expose({ name: 'codigo_empresa' })
  @IsNumber()
  @IsPositive()
  companyCode: number;

  @ApiProperty({ example: '2025-10-13' })
  @Expose({ name: 'p_fecha_pago' })
  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @ApiProperty({ example: 2 })
  @Expose({ name: 'p_tipo_generacion' })
  @IsNumber()
  @IsPositive()
  generationType: number;

  @ApiProperty({ example: 5959 })
  @Expose({ name: 'p_codigo_periodo' })
  @IsNumber()
  @IsPositive()
  periodCode: number;

  @ApiProperty({ example: 'V12345678', required: false })
  @Expose({ name: 'p_cedula' })
  // 🔥 Si el valor viene vacío o undefined, lo forzamos a ser null
  @Transform(({ value }) => value ?? null)
  @IsString()
  @IsOptional()
  idCard?: string | null;
}