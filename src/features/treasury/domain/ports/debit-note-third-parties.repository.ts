import { PaymentBatchEntity } from '../entities/payment-batches.entity';

export interface IDebitNoteThirdPartiesRepository {
  getPaymentBatches(codigoLotePago: number): Promise<PaymentBatchEntity[] | null>
  getPaymentBatchByPaymentCode(codigoLotePago: number, codigoPago: number): Promise<PaymentBatchEntity | null>
}