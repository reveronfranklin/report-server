import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateReportDto {
  @ApiProperty({
    description: 'Código de la orden de pago',
    example: 12345
  })
  @IsNumber()
  @IsPositive()
  CodigoOrdenPago: number;
}