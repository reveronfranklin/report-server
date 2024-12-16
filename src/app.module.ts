/* Dependencies */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

/* Config */
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';
import { DatabaseModule } from './shared/modules/db/database.module';

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

/* Module PreCommitmentModel */
import { WithholdingModel } from './infrastructure/persistence/models/withholding.model';
import { WithholdingRepository } from './infrastructure/persistence/repositories/withholding.repository';

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
      PucPaymentOrderModel,
      CommitmentModel,
      PreCommitmentModel,
      WithholdingModel
    ]),
    PrinterModule
  ],
  providers: [
    PaymentOrderService,
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
      provide: 'IWithholdingRepository',
      useClass: WithholdingRepository
    },
    {
      provide: 'IPdfGenerator',
      useClass: PdfGeneratorAdapter
    }
  ],
  controllers: [PaymentOrderController]
})
export class AppModule {}