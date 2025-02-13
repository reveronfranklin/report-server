import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class ReportSubHeaderDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  voucherNumber: number;

  @IsString()
  @IsNotEmpty()
  nameWithholdingAgent: string;

  @IsString()
  @IsNotEmpty()
  withholdingAgentRif: string;

  @IsString()
  @IsNotEmpty()
  withholdingAgentAddress: string;

  @IsString()
  @IsNotEmpty()
  fiscalPeriod: string;

  @IsString()
  @IsNotEmpty()
  subjectNameWithheld: string;

  @IsString()
  @IsNotEmpty()
  subjectNameWithheldRif: string;

  @IsNumber()
  @IsNotEmpty()
  paymentOrderNumber: number;
}