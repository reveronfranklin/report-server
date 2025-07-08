export interface IDebitNoteThirdPartiesRepository {
  getPaymentBatches(codigoLotePago: number): Promise<any | null>
  getPaymentBatchByPaymentCode(codigoLotePago: number, codigoPago: number): Promise<any | null>
}