import { IsNumber, IsArray } from 'class-validator';
import { WithholdingDto } from './withholding.dto';

export class ReportBodyDto {
  @IsArray()
  withHolding: WithholdingDto[];

  @IsNumber()
  totalPurchasesVat: number;

  @IsNumber()
  totalPurchasesCredit: number;

  @IsNumber()
  totalTaxableBase: number;

  @IsNumber()
  totalVatTax: number;

  @IsNumber()
  totalVatWithheld: number;
}