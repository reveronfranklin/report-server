import { IsNumber, IsString, IsDate } from 'class-validator';

export class WithholdingDto {
  @IsNumber()
  invoiceNumber: string;

  @IsDate()
  invoiceDate: Date;

  @IsString()
  conceptPayment: string;

  @IsNumber()
  extensiveTax: number;

  @IsNumber()
  taxableIncome: number;

  @IsNumber()
  alicuota: number;

  @IsNumber()
  incomeTaxWithheld: number;

  @IsString()
  subtrahend: string;
}