export interface ITaxDocument {
  documentOperationCode: number;
  exemptTaxAmount: number;
  retentionCode: number;
  retentionTypeId: number;
  taxableBase: number;
  taxAmount: number;
  taxDocumentOperationCode: number;
}