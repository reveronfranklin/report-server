import { IsNumber, IsString } from 'class-validator';

export class WithholdingDto {
  @IsString()
  DESCRIPCION: string;

  @IsNumber()
  MONTO_RETENIDO: number;
}