export interface IPaymentBatches {
  paymentBatchCode:     number;
  checkCode:            number;
  checkNumber:          number;
  checkDate:            Date;
  name:                 string;
  accountNumber:        string;
  payToTheOrderOf:      string;
  reason:               string;
  amount:               number;
  endorsement:          string;
  userIns:              string
  supplierCode:         number;
  opIcpPucDetail:       string;
  opIcpPucAmount:       number;
  taxWithholdingDetail: string | null;
  taxWithholdingAmount: number;
  budgetCode:           number;
}