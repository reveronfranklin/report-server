import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class ReportQueryApiDto {
  @ApiProperty({
    description: 'Codigo del tipo de nomina',
    example: 20
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  codigoTipoNomina: number;

  @ApiProperty({
    description: 'Status del personal',
    example: 'A',
    required: false
  })
  @IsString()
  @IsOptional()
  status?: string;
}
