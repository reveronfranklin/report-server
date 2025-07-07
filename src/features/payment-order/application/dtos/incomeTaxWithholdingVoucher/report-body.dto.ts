import { IsNumber, IsArray } from 'class-validator';
import { WithholdingDto } from './withholding.dto';

export class ReportBodyDto {
  @IsArray()
  withHolding: WithholdingDto[];

  @IsNumber()
  totalTaxableIncome: number;

  @IsNumber()
  totalIncomeTaxWithheld: number;
}