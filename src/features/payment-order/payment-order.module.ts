import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentOrderRepository } from './infrastructure/persistence/payment-order.repository';
import { PaymentOrderService } from './application/services/payment-order.service';
import { PaymentOrderController } from './infrastructure/http/controllers/payment-order.controller';
import { PAYMENT_ORDER_REPOSITORY } from './domain/repositories/payment-order.repository.interface';
import { PaymentOrderModel } from './infrastructure/persistence/payment-order.model';
import { DescriptiveModel } from '../descriptive/infrastructure/persistence/descriptive.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PaymentOrderModel, DescriptiveModel]),
  ],
  providers: [
    PaymentOrderService,
    {
      provide: PAYMENT_ORDER_REPOSITORY,
      useClass: PaymentOrderRepository,
    }
  ],
  controllers: [PaymentOrderController],
})
export class PaymentOrderModule {}