
import { IReplicatePaymentOrder, ReplicatePaymentOrderResult } from '../interfaces/replicate-payment-order.interface';

export abstract class ReplicatePaymentOrderRepository implements IReplicatePaymentOrder {
  abstract replicatePaymentOrder(codigoOrdenPago: number): Promise<ReplicatePaymentOrderResult>;
  abstract existCodigoOrdenPago(codigoOrdenPago: number): Promise<boolean>;
}