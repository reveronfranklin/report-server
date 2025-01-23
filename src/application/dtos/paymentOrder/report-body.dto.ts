import { IsArray, IsNumber } from 'class-validator';
import { FundsDto } from './paymentOrder/funds.dto';
import { WithholdingDto } from './withholding.dto';

export class ReportBodyDto {
  @IsArray()
  FUNDS: FundsDto[];

  @IsArray()
  WITHHOLDING: WithholdingDto[];

  @IsNumber()
  TOTAL_ORDEN_PAGO: number;

  @IsNumber()
  MONTO_PAGAR: number;
}