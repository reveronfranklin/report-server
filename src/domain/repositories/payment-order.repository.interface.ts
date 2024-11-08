import { PaymentOrderEntity } from '../entities/payment-order.entity';

export const PAYMENT_ORDER_REPOSITORY = 'PAYMENT_ORDER_REPOSITORY';

export interface IPaymentOrderRepository {
  findById(id: number, options?: any): Promise<PaymentOrderEntity | null>;
}