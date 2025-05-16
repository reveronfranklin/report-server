import { IBalance } from '../interfaces/balance.interface';
import { PucPaymentOrderEntity } from './puc-payment-order.entity';

export class BalanceEntity implements IBalance {
  constructor(
    public balanceCode: number,
    public financedDescription: string,
    public icpCodeConcat: string,
    public pucCodeConcat: string,
    public pucDenomination: string,
    public year: number,

    /* Relations */
    public pucPaymentOrder?: PucPaymentOrderEntity
  ) {}
}