import { IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportQueryDto {
  @ApiProperty({
    description: 'Código del lote de pago (codigoLotePago)',
    example: 12345
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  paymentBatchCode: number;

  @ApiProperty({
    description: 'Código del pago (codigoPago)',
    example: 12345
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  paymentCode?: number;
}