export interface IPaymentOrder {
  amountInWords: string | null;
  deadlineEndDate: Date;
  deadlineStartDate: Date;
  insertionDate: Date;
  paymentAmount: number | null;
  paymentFrequencyId: number | null;
  paymentOrderCode: number;
  paymentOrderDate: Date;
  paymentOrderNumber: string;
  paymentOrderTypeId: number;
  reason: string | null;
  receiptNumber: number | null;
  reportTitle: string | null;
  status: string | null;
  supplierCode: number;
  withholdingAgentAddress: string | null;
  withholdingAgentName: string | null;
  withholdingAgentPhone: string | null;
  withholdingAgentRIF: string | null;
}