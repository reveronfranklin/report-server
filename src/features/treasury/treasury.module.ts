/* Dependencies */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '@shared/shared.module';

/* Services */
import { DebitNoteThirdPartiesService } from './application/services/debit-note-third-parties.service';

/* Models */

/* Controllers */
import { DebitNoteThirdPartiesController } from './infrastructure/http/controllers/debit-note-third-parties.controller';

/* Generators */

/* Factories */
/* import { PdfGeneratorFactory } from './infrastructure/pdf/pdf-generator.factory'; */

@Module({
  imports: [
    SharedModule,
    HttpModule
  ],
  controllers: [
    DebitNoteThirdPartiesController
  ],
  providers: [
    DebitNoteThirdPartiesService
  ]
})
export class TreasuryModule {}