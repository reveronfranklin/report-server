import { IsNumber, IsString, IsDate } from 'class-validator';

export class ReportBodyDto {
  @IsNumber()
  invoiceNumber: string;

  @IsDate()
  invoiceDate: Date;

  @IsString()
  conceptPayment: string;

  @IsString()
  extensiveTax: string;

  @IsString()
  taxableIncome: string;

  @IsString()
  alicuota: string;

  @IsString()
  incomeTaxWithheld: string;

  @IsString()
  subtrahend: string;

  @IsString()
  totalTaxableIncome: string;

  @IsString()
  totalIncomeTaxWithheld: string;
}