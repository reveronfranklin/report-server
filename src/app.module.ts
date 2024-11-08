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
import { PaymentOrderModel } from './infrastructure/persistence/payment-order.model';
import { PaymentOrderRepository } from './infrastructure/persistence/payment-order.repository';
import { PaymentOrderController } from './infrastructure/http/controllers/payment-order.controller';

/* Module Descriptive */
import { DESCRIPTIVE_REPOSITORY } from './domain/repositories/descriptive.repository.interface';
import { DescriptiveModel } from './infrastructure/persistence/descriptive.model';
import { DescriptiveRepository } from './infrastructure/persistence/descriptive.repository';

/* Module Supplier */
import { SUPPLIER_REPOSITORY } from './domain/repositories/supplier.repository.interface';
import { SupplierModel } from './infrastructure/persistence/supplier.model';
import { SupplierRepository } from './infrastructure/persistence/supplier.repository';

/* Module Beneficiary */
import { BeneficiaryModel } from './infrastructure/persistence/beneficiary.model';
import { BeneficiaryRepository } from './infrastructure/persistence/beneficiary.repository';

/* Resources */
import { PdfGeneratorAdapter } from './infrastructure/pdf/pdf-generator.adapter';
import { PrinterModule } from 'src/shared/modules/printer/printer.module';


/* import { PaymentOrderModule } from './features/payment-order/payment-order.module';
import { DescriptiveModule } from './features/descriptive/descriptive.module';

import { SupplierModule } from './features/supplier/supplier.module';
import { BeneficiaryModule } from './features/beneficiary/beneficiary.module'; */

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
      BeneficiaryModel
    ]),
    PrinterModule
  ],
  providers: [
    PaymentOrderService,
    {
      provide: PAYMENT_ORDER_REPOSITORY,
      useClass: PaymentOrderRepository,
    },
    {
      provide: DESCRIPTIVE_REPOSITORY,
      useClass: DescriptiveRepository,
    },
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: SupplierRepository,
    },
    {
      provide: 'IBeneficiaryRepository',
      useClass: BeneficiaryRepository,
    },
    {
      provide: 'IPdfGenerator',
      useClass: PdfGeneratorAdapter,
    }
  ],
  controllers: [PaymentOrderController]
})
export class AppModule {}