import { IPaymentBatches } from '../interfaces/payment-batches.interface';

export class PaymentBatchEntity implements IPaymentBatches {
  constructor(
    public paymentBatchCode: number,
    public checkCode: number,
    public checkNumber: number,
    public checkDate: Date,
    public name: string,
    public accountNumber: string,
    public payToTheOrderOf: string,
    public reason: string,
    public amount: number,
    public endorsement: string,
    public userIns: string,
    public supplierCode: number,
    public opIcpPucDetail: string,
    public opIcpPucAmount: number,
    public taxWithholdingDetail: string | null,
    public taxWithholdingAmount: number,
    public budgetCode: number,
  ) {}
}