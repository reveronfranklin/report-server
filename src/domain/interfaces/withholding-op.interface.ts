export interface IWithholdingOp {
  byRetention: number;
  opRetentionCode: string;
  paymentOrderCode: number;
  retentionAmount: number;
  retentionCode: string;
  taxableBase: number;
  withholdingTypeId: string;
}