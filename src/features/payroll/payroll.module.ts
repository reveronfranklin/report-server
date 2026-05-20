/* Dependencies */
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    SharedModule,
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