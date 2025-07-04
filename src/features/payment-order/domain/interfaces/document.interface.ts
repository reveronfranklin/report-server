export interface IDocument {
  affectedDocumentNumber: string;
  documentAmount: number;
  documentControlNumber: string;
  documentDate: Date;
  documentNumber: string;
  documentOperationCode: number;
  documentTypeId: string;
  exemptTaxAmount: number;
  operationTypeId: string;
  paymentOrderCode: number;
  taxableBase: number;
  taxAmount: number;
  taxTypeId: string;
  transactionTypeId: string;
  withheldAmount: number;
}