import { IResponse } from '@interceptors/response.interface';

export default interface ReplicatePaymentOrderPort {
  replicatePaymentOrder(codigoOrdenPago: number): Promise<IResponse<any>>;
}