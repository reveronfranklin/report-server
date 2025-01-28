import { IsString, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class ReportHeaderDto {
  @IsString()
  @IsNotEmpty()
  nameWithholdingAgent: string;

  @IsString()
  @IsNotEmpty()
  phoneWithholdingAgent: string;

  @IsString()
  @IsNotEmpty()
  rifWithholdingAgent: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  addressWithholdingAgent: string;

  /* Tax period */
  @IsDate()
  @IsNotEmpty()
  taxPeriod: Date;

  @IsString()
  @IsNotEmpty()
  nameSubjectWithheld: string;

  @IsString()
  @IsNotEmpty()
  rifSubjectWithheld: string;

  @IsNumber()
  @IsNotEmpty()
  paymentOrderNumber: number;
}