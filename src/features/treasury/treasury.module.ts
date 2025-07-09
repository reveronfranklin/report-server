/* Dependencies */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '@shared/shared.module';

/* Services */
import { DebitNoteThirdPartiesService } from './application/services/debit-note-third-parties.service';

/* Controllers */
import { DebitNoteThirdPartiesController } from './infrastructure/http/controllers/debit-note-third-parties.controller';

/* Api-clients (adapters) */
import { DebitNoteThirdPartiesAdapter } from './infrastructure/api-clients/adapters/debit-note-third-parties.adapter';

/* Generators */
import { DebitNoteThridPartiesPdf } from './infrastructure/pdf/generators/templates/DebitNoteThridParties';

/* Factories */
import { PdfGeneratorFactory } from './infrastructure/pdf/pdf-generator.factory';

@Module({
  imports: [
    SharedModule,
    HttpModule
  ],
  controllers: [
    DebitNoteThirdPartiesController
  ],
  providers: [
    DebitNoteThirdPartiesService,
    DebitNoteThridPartiesPdf,
    {
      provide: 'IDebitNoteThirdPartiesRepository',
      useClass: DebitNoteThirdPartiesAdapter
    },
    {
      provide: 'IPdfGeneratorFactory',
      useClass: PdfGeneratorFactory
    }
  ]
})
export class TreasuryModule {}