import { IPucPaymentOrder } from '../interfaces/puc-payment-order.interface';
import { BalanceEntity } from './balance.entity';

export class PucPaymentOrderEntity implements IPucPaymentOrder {
  constructor(
    public amount: number,
    public balanceCode: number,
    public paymentOrderCode: number,
    public pucPaymentOrderCode: number,

    /* Relations */
    public balance?: BalanceEntity
  ) {}
}