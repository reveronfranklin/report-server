import { PaymentOrderEntity } from '../entities/payment-order.entity';

export interface IPaymentOrderRepository {
  findById(id: number, options?: any): Promise<PaymentOrderEntity | null>;
}