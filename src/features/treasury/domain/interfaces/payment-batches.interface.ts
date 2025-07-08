export interface IPaymentBatches {
  accountNumber:        string;
  amount:               number;
  checkCode:            number;
  checkDate:            Date;
  checkNumber:          number;
  name:                 string;
  opIcpPucAmount:       number;
  opIcpPucDetail:       string;
  paymentBatchCode:     number;
  payToTheOrderOf:      string;
  reason:               string;
  taxWithholdingAmount: number;
}