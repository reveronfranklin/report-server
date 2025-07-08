/* Dependencies */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '@shared/shared.module';

/* Services */
import { PaymentOrderService } from './application/services/payment-order.service';
import { IncomeTaxWithholdingVoucherService } from './application/services/income-tax-withholding-voucher.service';
import { VatWithholdingVoucherService } from './application/services/vat-withholding-voucher.service';
import { TaxStampVoucherService } from './application/services/tax-stamp-voucher.service';

/* Models */
import { PaymentOrderModel } from './infrastructure/persistence/models/payment-order.model';
import { DescriptiveModel } from './infrastructure/persistence/models/descriptive.model';
import { SupplierModel } from './infrastructure/persistence/models/supplier.model';
import { BeneficiaryModel } from './infrastructure/persistence/models/beneficiary.model';
import { BalanceModel } from './infrastructure/persistence/models/balance.model';
import { PucPaymentOrderModel } from './infrastructure/persistence/models/puc-payment-order.model';
import { CommitmentModel } from './infrastructure/persistence/models/commitment.model';
import { PreCommitmentModel } from './infrastructure/persistence/models/pre-commitment.model';
import { WithholdingOpModel } from './infrastructure/persistence/models/withholding-op.model';
import { WithholdingModel } from './infrastructure/persistence/models/withholding.model';
import { DocumentModel } from './infrastructure/persistence/models/document.model';
import { TaxDocumentModel } from './infrastructure/persistence/models/tax-document.model';

/* Middlewares */
import { ReplicatePaymentOrderPort } from './infrastructure/http/middleware/ports/replicate-payment-order.port';
import { ReplicatePaymentOrderAdapter } from './infrastructure/http/middleware/adapters/replicate-payment-order.adapter';
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

@Module({
  imports: [
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
  controllers: [
    PaymentOrderController,
    IncomeTaxWithholdingVoucherController,
    VatWithholdingVoucherController,
    TaxStampVoucherController
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
      provide: ReplicatePaymentOrderPort,
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
  ]
})
export class PaymentOrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReplicatePaymentOrderMiddleware)
      .forRoutes(
        { path: 'payment-orders/pdf/report', method: RequestMethod.POST },
        { path: 'tax-stamp-voucher/pdf/report', method: RequestMethod.POST },
        { path: 'income-tax-withholding-voucher/pdf/report', method: RequestMethod.POST },
        { path: 'vat-withholding-voucher/pdf/report', method: RequestMethod.POST }
      );
  }
}