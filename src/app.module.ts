/* Dependencies */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

/* Config */
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';
import { DatabaseModule } from './shared/modules/db/database.module';

/* Middleware Auth */
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthAdapter } from './infrastructure/http/adapters/auth.adapter';
import { AuthMiddleware } from './infrastructure/http/middleware/auth.middleware';

/* Middleware Replicate Payment Order */
import { ReplicatePaymentOrderRepository } from './domain/repositories/replicate-payment-order.repository';
import { ReplicatePaymentOrderAdapter } from './infrastructure/http/adapters/replicate-payment-order.adapter';
import { ReplicatePaymentOrderMiddleware } from './infrastructure/http/middleware/replicate-payment-order.middleware';

/* Module Payment Order */
import { PaymentOrderModel } from './infrastructure/persistence/models/payment-order.model';
import { PaymentOrderRepository } from './infrastructure/persistence/repositories/payment-order.repository';
import { PaymentOrderService } from './application/services/payment-order.service';
import { PaymentOrderController } from './infrastructure/http/controllers/payment-order.controller';

/* Module Descriptive */
import { DescriptiveModel } from './infrastructure/persistence/models/descriptive.model';
import { DescriptiveRepository } from './infrastructure/persistence/repositories/descriptive.repository';

/* Module Supplier */
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

/* Module CommitmentModel */
import { CommitmentModel } from './infrastructure/persistence/models/commitment.model';
import { CommitmentRepository } from './infrastructure/persistence/repositories/commitment.repository';

/* Module PreCommitmentModel */
import { PreCommitmentModel } from './infrastructure/persistence/models/pre-commitment.model';
import { PreCommitmentRepository } from './infrastructure/persistence/repositories/pre-commitment.repository';

/* Module WithholdingOpModel */
import { WithholdingOpModel } from './infrastructure/persistence/models/withholding-op.model';
import { WithholdingOpRepository } from './infrastructure/persistence/repositories/withholding-op.repository';

/* Module WithholdingModel */
import { WithholdingModel } from './infrastructure/persistence/models/withholding.model';
import { WithholdingRepository } from './infrastructure/persistence/repositories/withholding.repository';

/* Module DocumentModel */
import { DocumentModel } from './infrastructure/persistence/models/document.model';
import { DocumentRepository } from './infrastructure/persistence/repositories/document.repository';

/* Module TaxDocumentModel */
import { TaxDocumentModel } from './infrastructure/persistence/models/tax-document.model';
import { TaxDocumentRepository } from './infrastructure/persistence/repositories/tax-document.repository';

/* Module IncomeTaxWithholdingVoucher */
import { IncomeTaxWithholdingVoucherController} from './infrastructure/http/controllers/income-tax-withholding-voucher.controller';
import { IncomeTaxWithholdingVoucherService } from './application/services/income-tax-withholding-voucher.service';

/* Module VatWithholdingVoucher */
import { VatWithholdingVoucherController} from './infrastructure/http/controllers/vat-withholding-voucher.controller';
import { VatWithholdingVoucherService } from './application/services/vat-withholding-voucher.service';

/* Module TaxStampVoucher */
import { TaxStampVoucherController} from './infrastructure/http/controllers/tax-stamp-voucher.controller';
import { TaxStampVoucherService } from './application/services/tax-stamp-voucher.service';

/* Resources */
import { PdfGeneratorAdapterPaymentOrder } from './infrastructure/pdf/pdf-generator-payment-order.adapter';
import { PdfGeneratorAdapterIncomeTaxWithholdingVoucher } from './infrastructure/pdf/pdf-generator-income-tax-withholding-voucher';
import { PdfGeneratorAdapterVatWithholdingVoucher } from './infrastructure/pdf/pdf-generator-vat-withholding-voucher';
import { PdfGeneratorAdapterTaxStampVoucher } from './infrastructure/pdf/pdf-generator-tax-stamp-voucher';
import { PrinterModule } from 'src/shared/modules/printer/printer.module';

/* Factories */
import { PdfGeneratorFactory } from './infrastructure/pdf/pdf-generator.factory';

@Module({
  imports: [
    /* Configs */
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigService esté disponible globalmente
      load: [configLoader],
      validationSchema: envSchema
    }),
    DatabaseModule,
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
    ]),
    PrinterModule
  ],
  providers: [
    PaymentOrderService,
    IncomeTaxWithholdingVoucherService,
    VatWithholdingVoucherService,
    TaxStampVoucherService,
    PdfGeneratorAdapterPaymentOrder,
    PdfGeneratorAdapterIncomeTaxWithholdingVoucher,
    PdfGeneratorAdapterVatWithholdingVoucher,
    PdfGeneratorAdapterTaxStampVoucher,
    PdfGeneratorFactory,
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
      provide: 'IDescriptiveRepository',
      useClass: DescriptiveRepository
    },
    {
      provide: 'ISupplierRepository',
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
      provide: 'ICommitmentRepository',
      useClass: CommitmentRepository
    },
    {
      provide: 'IPreCommitmentRepository',
      useClass: PreCommitmentRepository
    },
    {
      provide: 'IWithholdingOpRepository',
      useClass: WithholdingOpRepository
    },
    {
      provide: 'IWithholdingRepository',
      useClass: WithholdingRepository,
    },
    {
      provide: 'IDocumentRepository',
      useClass: DocumentRepository
    },
    {
      provide: 'ITaxDocumentRepository',
      useClass: TaxDocumentRepository,
    },
    {
      provide: 'IPdfGenerator',
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, ReplicatePaymentOrderMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}