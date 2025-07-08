import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class ReportBodyDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  opIcpPucAmount: number;

  @IsNotEmpty()
  @IsString()
  opIcpPucDetail: string;

  @IsNotEmpty()
  @IsString()
  payToTheOrderOf: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsNumber()
  taxWithholdingAmount: number;
}