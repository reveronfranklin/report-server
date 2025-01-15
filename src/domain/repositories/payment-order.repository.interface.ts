import { PaymentOrderEntity } from '../entities/payment-order.entity';

export interface IPaymentOrderRepository {
  findByIdWithRelations(id: number): Promise<PaymentOrderEntity | null>;
  existPaymentOrder(id: number): Promise<boolean>;
}