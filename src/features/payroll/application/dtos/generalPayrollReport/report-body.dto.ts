import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class ReportBodyDto {
  @IsNotEmpty()
  @IsDateString()
  payrollPeriodDate: string | null;

  @IsNotEmpty()
  @IsDateString()
  payrollIssueDate: string | null;

  @IsNotEmpty()
  @IsNumber()
  periodCode: number;

  @IsNotEmpty()
  @IsNumber()
  payrollTypeCode: number;

  @IsNotEmpty()
  @IsString()
  officeCode: string;

  @IsNotEmpty()
  @IsNumber()
  icpCode: number;

  @IsNotEmpty()
  @IsString()
  denomination: string;

  @IsNotEmpty()
  @IsString()
  jobTitleDenomination: string;

  @IsNotEmpty()
  @IsString()
  idCard: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  accountNo: string;

  @IsNotEmpty()
  @IsString()
  conceptNumber: string;

  @IsNotEmpty()
  @IsString()
  conceptTransactionType: string;

  @IsNotEmpty()
  @IsString()
  conceptDenomination: string;

  @IsNotEmpty()
  @IsString()
  conceptComplement: string;

  @IsNotEmpty()
  @IsNumber()
  percentage: number;

  @IsNotEmpty()
  @IsString()
  conceptType: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  assignment: number;

  @IsNotEmpty()
  @IsNumber()
  deduction: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  statusDescription: string;

  @IsNotEmpty()
  @IsNumber()
  personCode: number;

  @IsNotEmpty()
  @IsDateString()
  hireDate: string | null;

  @IsNotEmpty()
  @IsString()
  jobCode: string;

  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsNumber()
  conceptCode: number;

  @IsNotEmpty()
  @IsString()
  module: string;

  @IsNotEmpty()
  @IsString()
  identifierCode: string;
}