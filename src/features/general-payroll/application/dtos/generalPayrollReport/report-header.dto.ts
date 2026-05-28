import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportHeaderDto {
  @IsNotEmpty()
  @IsString()
  conceptType: string;

  @IsNotEmpty()
  @IsString()
  conceptNumber: string;

  @IsNotEmpty()
  @IsString()
  conceptDenomination: string;

  @IsNotEmpty()
  @IsNumber()
  assignment: number;

  @IsNotEmpty()
  @IsNumber()
  deduction: number;

  @IsNotEmpty()
  @IsNumber()
  visibleAmount: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  deductible: number;
}