import { IPucPaymentOrder } from '../interfaces/puc-payment-order.interface';

export interface IPucPaymentOrderRepository {
  findById(id: number, options?: any): Promise<IPucPaymentOrder | null>;
}