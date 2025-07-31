/* Dependencies */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '@shared/shared.module';

/* Services */
import { DebitNoteThirdPartiesService } from './application/services/debit-note-third-parties.service';
import { ReportBatchesService } from './application/services/report-batches.service';

/* Controllers */
import { DebitNoteThirdPartiesController } from './infrastructure/http/controllers/debit-note-third-parties.controller';
import { ReportBatchesController } from './infrastructure/http/controllers/report-batches.controller';

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
    ReportBatchesController
  ],
  providers: [
    DebitNoteThirdPartiesService,
    ReportBatchesService,
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