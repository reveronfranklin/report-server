/* Dependencies */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

/* Config */
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';
import { DatabaseModule } from './shared/modules/db/database.module';

/* Module Payment Order */
import { PAYMENT_ORDER_REPOSITORY } from './domain/repositories/payment-order.repository.interface';
import { PaymentOrderService } from './application/services/payment-order.service';
import { PaymentOrderModel } from './infrastructure/persistence/models/payment-order.model';
import { PaymentOrderRepository } from './infrastructure/persistence/repositories/payment-order.repository';
import { PaymentOrderController } from './infrastructure/http/controllers/payment-order.controller';

/* Module Descriptive */
import { DESCRIPTIVE_REPOSITORY } from './domain/repositories/descriptive.repository.interface';
import { DescriptiveModel } from './infrastructure/persistence/models/descriptive.model';
import { DescriptiveRepository } from './infrastructure/persistence/repositories/descriptive.repository';

/* Module Supplier */
import { SUPPLIER_REPOSITORY } from './domain/repositories/supplier.repository.interface';
import { SupplierModel } from './infrastructure/persistence/models/supplier.model';
import { SupplierRepository } from './infrastructure/persistence/repositories/supplier.repository';

/* Module Beneficiary */
import { BeneficiaryModel } from './infrastructure/persistence/models/beneficiary.model';
import { BeneficiaryRepository } from './infrastructure/persistence/repositories/beneficiary.repository';

/* Module Balance */
import { BalanceModel } from './infrastructure/persistence/models/balance.model';
import { BalanceRepository } from './infrastructure/persistence/repositories/balance.repository';

/* Module PucPaymentOrder */
import { PucPaymentOrderModel } from './infrastructure/persistence/models/puc-payment-order.model';
import { PucPaymentOrderRepository } from './infrastructure/persistence/repositories/puc-payment-order.repository';

/* Resources */
import { PdfGeneratorAdapter } from './infrastructure/pdf/pdf-generator.adapter';
import { PrinterModule } from 'src/shared/modules/printer/printer.module';

@Module({
  imports: [
    /* Configs */
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigService esté disponible globalmente
      load: [configLoader],
      validationSchema: envSchema
    }),
    DatabaseModule,
    SequelizeModule.forFeature([
      PaymentOrderModel,
      DescriptiveModel,
      SupplierModel,
      BeneficiaryModel,
      BalanceModel,
      PucPaymentOrderModel
    ]),
    PrinterModule
  ],
  providers: [
    PaymentOrderService,
    {
      provide: PAYMENT_ORDER_REPOSITORY,
      useClass: PaymentOrderRepository
    },
    {
      provide: DESCRIPTIVE_REPOSITORY,
      useClass: DescriptiveRepository
    },
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: SupplierRepository
    },
    {
      provide: 'IBeneficiaryRepository',
      useClass: BeneficiaryRepository
    },
    {
      provide: 'IBalanceRepository',
      useClass: BalanceRepository
    },
    {
      provide: 'IPucPaymentOrderRepository',
      useClass: PucPaymentOrderRepository
    },
    {
      provide: 'IPdfGenerator',
      useClass: PdfGeneratorAdapter
    }
  ],
  controllers: [PaymentOrderController]
})
export class AppModule {}