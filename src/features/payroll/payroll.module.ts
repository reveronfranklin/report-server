/* Dependencies */
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';

/* Services */
import { GeneralPayrollReportService } from './application/services/general-payroll.service';

/* Controllers */
import { GeneralPayrollReportController } from './infrastructure/http/controllers/general-payroll-report.controller';

/* Api-clients (adapters) */
import { PayrollReportAdapter } from './infrastructure/api-clients/adapters/general-payroll-report.adapter';

/* Generators */
import { GeneralPayrollReportPdf } from './infrastructure/pdf/generators/templates/generalPayrollReport';

/* Factories */
import { PdfGeneratorFactory } from './infrastructure/pdf/pdf-generator.factory';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [
    GeneralPayrollReportController
  ],
  providers: [
    GeneralPayrollReportService,
    GeneralPayrollReportPdf,
    {
      provide: 'IPayrollReportRepository',
      useClass: PayrollReportAdapter
    },
    {
      provide: 'IPdfGeneratorFactory',
      useClass: PdfGeneratorFactory
    }
  ]
})
export class PayrollModule {}