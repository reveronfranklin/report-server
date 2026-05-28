import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IPayrollFilter } from '../../domain/interfaces/payroll-filter.interface';

export class ReportQueryDto implements IPayrollFilter {
  @ApiProperty({
    description: 'Código del tipo de nómina (ej. Quincenal, Mensual)',
    example: 21,
  })
  @IsNumber()
  @IsPositive()
  payrollType: number;

  @ApiProperty({
    description: 'Código de la empresa a la que pertenece la nómina',
    example: 13,
  })
  @IsNumber()
  @IsPositive()
  companyCode: number;

  @ApiProperty({
    description: 'Fecha de pago de la nómina en formato ISO (YYYY-MM-DD)',
    example: '2025-10-13',
  })
  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @ApiProperty({
    description: 'Tipo de generación del reporte (ej. Preliminar, Definitivo)',
    example: 2,
  })
  @IsNumber()
  @IsPositive()
  generationType: number;

  @ApiProperty({
    description: 'Código del período específico de nómina',
    example: 5959,
  })
  @IsNumber()
  @IsPositive()
  periodCode: number;

  @ApiProperty({
    description: 'Número de cédula para filtrar un empleado específico (Opcional)',
    example: 'V12345678',
    required: false,
  })
  @Transform(({ value }) => value ?? null)
  @IsString()
  @IsOptional()
  idCard?: string | null;
}