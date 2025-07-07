import { IsArray, IsNumber, IsString } from 'class-validator';
import { FundsDto } from './funds.dto';
import { WithholdingDto } from './withholding.dto';

export class ReportBodyDto {
  @IsArray()
  funds: FundsDto[];

  @IsArray()
  withholding: WithholdingDto[];

  @IsNumber()
  totalPaymentOrder: number;

  @IsNumber()
  amountToPay: number;

  @IsString()
  specificTitle: string;

  @IsString()
  reason: string;
}