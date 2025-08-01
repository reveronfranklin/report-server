import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentBatchReportQueryDto {
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
  paymentCode: number;
}