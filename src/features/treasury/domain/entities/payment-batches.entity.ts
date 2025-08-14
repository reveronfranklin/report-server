import { IPaymentBatches } from '../interfaces/payment-batches.interface';

export class PaymentBatchEntity implements IPaymentBatches {
  public accountNumber: string        = null;
  public amount: number               = null;
  public checkCode: number            = null;
  public checkDate: Date              = null;
  public checkNumber: number          = null;
  public name: string                 = null;
  public opIcpPucAmount: number       = null;
  public opIcpPucDetail: string       = null;
  public paymentBatchCode: number     = null;
  public payToTheOrderOf: string      = null;
  public reason: string               = null;
  public reportTitle: string | null   = null;
  public taxWithholdingAmount: number = null;

  constructor(data: IPaymentBatches) {
    Object.assign(this, data)
  }
}