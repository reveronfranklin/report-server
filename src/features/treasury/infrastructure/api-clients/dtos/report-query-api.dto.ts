import { IsNumber, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator'; // 🔥 Importamos Min
import { ApiProperty } from '@nestjs/swagger';

export class ReportQueryApiDto {
  @ApiProperty({
    description: 'Código del lote de pago (codigoLotePago)',
    example: 170
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  codigoLotePago: number;

  @ApiProperty({
    description: 'Código del pago (codigoPago)',
    example: 0
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  codigoPago?: number;
}