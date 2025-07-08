import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateReportDto {
  @ApiProperty({
    description: 'Código del lote de pago',
    example: 12345
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  codigoLotePago: number;

  @ApiProperty({
    description: 'Código del pago',
    example: 12345
  })
  @IsNumber()
  @IsPositive()
  codigoPago: number;
}