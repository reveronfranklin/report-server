import { IsNumber, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class FundsDto {
  @IsNumber()
  @IsPositive()
  MONTO: number;

  @IsNumber()
  @IsPositive()
  ANO: number;

  @IsNumber()
  @IsPositive()
  PERIODICO: number;

  @IsString()
  @IsNotEmpty()
  DESCRIPCION_FINANCIADO: string;

  @IsString()
  @IsNotEmpty()
  CODIGO_ICP_CONCAT: string;

  @IsString()
  @IsNotEmpty()
  CODIGO_PUC_CONCAT: string;
}