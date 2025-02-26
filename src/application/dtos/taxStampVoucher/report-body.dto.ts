import { IsNumber, IsArray } from 'class-validator';
import { WithholdingDto } from './withholding.dto';

export class ReportBodyDto {
  @IsArray()
  withHolding: WithholdingDto[];

  @IsNumber()
  totalGrossAmount: number;

  @IsNumber()
  totalAmountVat: number;

  @IsNumber()
  totalNetTaxableIncome: number;

  @IsNumber()
  withholdingPercentage: number;
}