import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IGeneral } from '../../../domain/interfaces/general.interface';

export class ReportHeaderDto implements IGeneral {
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