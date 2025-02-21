import { PaymentOrderEntity } from '../entities/payment-order.entity';

export interface IPaymentOrderRepository {
  findByIdWithPaymentOrder(id: number): Promise<PaymentOrderEntity | null>;
  findByIdWithHoldingISLR(id: number): Promise<PaymentOrderEntity | null>;
  findByIdWithHoldingVat(id: number): Promise<PaymentOrderEntity | null>;
}