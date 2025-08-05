/* Dependencies */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '@shared/shared.module';

/* Services */
import { DebitNoteThirdPartiesService } from './application/services/debit-note-third-parties.service';
import { ElectronicPaymentService } from './application/services/electronic-payment.service';
import { ElectronicPaymentThirdPartiesService } from './application/services/electronic-payment-third-parties.service';

/* Controllers */
import { DebitNoteThirdPartiesController } from './infrastructure/http/controllers/debit-note-third-parties.controller';
import { ElectronicPaymentController } from './infrastructure/http/controllers/electronic-payment.controller';
import { ElectronicPaymentThirdPartiesController } from './infrastructure/http/controllers/electronic-payment-third-parties.controller';

/* Api-clients (adapters) */
import { DebitNoteThirdPartiesAdapter } from './infrastructure/api-clients/adapters/debit-note-third-parties.adapter';
import { ReportBatchesAdapter } from './infrastructure/api-clients/adapters/report-batches.adapter';

/* Generators */
import { DebitNoteThridPartiesPdf } from './infrastructure/pdf/generators/templates/debitNoteThridParties';
import { ReportBatchesPdf } from './infrastructure/pdf/generators/templates/reportBatches';

/* Factories */
import { PdfGeneratorFactory } from './infrastructure/pdf/pdf-generator.factory';

@Module({
  imports: [
    SharedModule,
    HttpModule
  ],
  controllers: [
    DebitNoteThirdPartiesController,
    ElectronicPaymentController,
    ElectronicPaymentThirdPartiesController
  ],
  providers: [
    DebitNoteThirdPartiesService,
    ElectronicPaymentService,
    ElectronicPaymentThirdPartiesService,
    DebitNoteThridPartiesPdf,
    ReportBatchesPdf,
    {
      provide: 'IDebitNoteThirdPartiesRepository',
      useClass: DebitNoteThirdPartiesAdapter
    },
    {
      provide: 'IReportBatchesRepository',
      useClass: ReportBatchesAdapter
    },
    {
      provide: 'IPdfGeneratorFactory',
      useClass: PdfGeneratorFactory
    }
  ]
})
export class TreasuryModule {}