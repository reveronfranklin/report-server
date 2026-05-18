/* Dependencies */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    SharedModule,
    HttpModule
  ],
  controllers: [
    /* DebitNoteThirdPartiesController,
    ElectronicPaymentController,
    ElectronicPaymentThirdPartiesController */
  ],
  providers: [
/*     DebitNoteThirdPartiesService,
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
    } */
  ]
})
export class PayrollModule {}