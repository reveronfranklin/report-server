import { IResponse } from '@interceptors/response.interface';
import ReplicatePaymentOrder from '../interfaces/replicate-payment-order.interface';

export abstract class ReplicatePaymentOrderPort implements ReplicatePaymentOrder {
  abstract replicatePaymentOrder(codigoOrdenPago: number): Promise<IResponse<any>>;
}