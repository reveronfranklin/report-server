import { IsNumber, IsString, IsDate } from 'class-validator';

export class ReportBodyDto {
  @IsNumber()
  invoiceNumber: number;

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
  IncomeTaxWithheld: number;

  @IsNumber()
  subtrahend: number;
}