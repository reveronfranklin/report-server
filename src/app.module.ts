/* Dependencies */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

/* Domain */
import { AuthRepository } from './domain/services/auth.interface';
import { ReplicatePaymentOrderRepository } from './domain/services/replicate-payment-order.interface';

/* Application */
import { PaymentOrderService } from './application/services/payment-order.service';
import { IncomeTaxWithholdingVoucherService } from './application/services/income-tax-withholding-voucher.service';
import { VatWithholdingVoucherService } from './application/services/vat-withholding-voucher.service';
import { TaxStampVoucherService } from './application/services/tax-stamp-voucher.service';

/* Models */
import { BalanceModel } from './infrastructure/persistence/models/balance.model';
import { BeneficiaryModel } from './infrastructure/persistence/models/beneficiary.model';
import { CommitmentModel } from './infrastructure/persistence/models/commitment.model';
import { DescriptiveModel } from './infrastructure/persistence/models/descriptive.model';
import { DocumentModel } from './infrastructure/persistence/models/document.model';
import { PaymentOrderModel } from './infrastructure/persistence/models/payment-order.model';
import { PreCommitmentModel } from './infrastructure/persistence/models/pre-commitment.model';
import { PucPaymentOrderModel } from './infrastructure/persistence/models/puc-payment-order.model';
import { SupplierModel } from './infrastructure/persistence/models/supplier.model';
import { TaxDocumentModel } from './infrastructure/persistence/models/tax-document.model';
import { WithholdingModel } from './infrastructure/persistence/models/withholding.model';
import { WithholdingOpModel } from './infrastructure/persistence/models/withholding-op.model';

/* Middlewares */
import { AuthAdapter } from './infrastructure/http/adapters/auth.adapter';
import { AuthMiddleware } from './infrastructure/http/middleware/auth.middleware';
import { ReplicatePaymentOrderAdapter } from './infrastructure/http/adapters/replicate-payment-order.adapter';
import { ReplicatePaymentOrderMiddleware } from './infrastructure/http/middleware/replicate-payment-order.middleware';

/* Controllers */
import { PaymentOrderController } from './infrastructure/http/controllers/payment-order.controller';
import { IncomeTaxWithholdingVoucherController} from './infrastructure/http/controllers/income-tax-withholding-voucher.controller';
import { VatWithholdingVoucherController} from './infrastructure/http/controllers/vat-withholding-voucher.controller';
import { TaxStampVoucherController} from './infrastructure/http/controllers/tax-stamp-voucher.controller';

/* Generators */
import { PaymentOrderPdf } from './infrastructure/pdf/generators/payment-order';
import { IncomeTaxWithholdingVoucherPdf } from './infrastructure/pdf/generators/income-tax-withholding-voucher';
import { VatWithholdingVoucherPdf } from './infrastructure/pdf/generators/vat-withholding-voucher';
import { TaxStampVoucherPdf } from './infrastructure/pdf/generators/tax-stamp-voucher';

/* Repositories */
import { PaymentOrderRepository } from './infrastructure/persistence/repositories/payment-order.repository';
import { VatWithholdingVoucherRepository } from './infrastructure/persistence/repositories/vat-withholding-voucher.repository';
import { TaxStampVoucherRepository } from './infrastructure/persistence/repositories/tax-stamp-voucher.repository';
import { IncomeTaxWithholdingVoucherRepository } from './infrastructure/persistence/repositories/income-tax-withholding-voucher.repository';

/* Factories */
import { PdfGeneratorFactory } from './infrastructure/pdf/pdf-generator.factory';

/* Config */
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';

/* Shared Modules */
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    /* Configs */
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigService esté disponible globalmente
      load: [configLoader],
      validationSchema: envSchema
    }),
    SharedModule,
    HttpModule,
    SequelizeModule.forFeature([
      PaymentOrderModel,
      DescriptiveModel,
      SupplierModel,
      BeneficiaryModel,
      BalanceModel,
      PucPaymentOrderModel,
      CommitmentModel,
      PreCommitmentModel,
      WithholdingOpModel,
      WithholdingModel,
      DocumentModel,
      TaxDocumentModel
    ])
  ],
  providers: [
    PaymentOrderService,
    IncomeTaxWithholdingVoucherService,
    VatWithholdingVoucherService,
    TaxStampVoucherService,
    PaymentOrderPdf,
    IncomeTaxWithholdingVoucherPdf,
    VatWithholdingVoucherPdf,
    TaxStampVoucherPdf,
    {
      provide: AuthRepository,
      useClass: AuthAdapter
    },
    {
      provide: ReplicatePaymentOrderRepository,
      useClass: ReplicatePaymentOrderAdapter
    },
    {
      provide: 'IPaymentOrderRepository',
      useClass: PaymentOrderRepository
    },
    {
      provide: 'IVatWithholdingVoucherRepository',
      useClass: VatWithholdingVoucherRepository
    },
    {
      provide: 'ITaxStampVoucherRepository',
      useClass: TaxStampVoucherRepository
    },
    {
      provide: 'IIncomeTaxWithholdingVoucherRepository',
      useClass: IncomeTaxWithholdingVoucherRepository
    },
    {
      provide: 'IPdfGeneratorFactory',
      useClass: PdfGeneratorFactory
    }
  ],
  controllers: [
    PaymentOrderController,
    IncomeTaxWithholdingVoucherController,
    VatWithholdingVoucherController,
    TaxStampVoucherController
  ]
})
export class AppModule /* implements NestModule */ {
  /* configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, ReplicatePaymentOrderMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  } */
}