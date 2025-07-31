import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BatchReportQueryDto {
  @ApiProperty({
    description: 'Código del lote (codigoLote)',
    example: 12345
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  batchCode: number;
}