/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '@exceptions/not-found.exception';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';

import { IPayrollReportRepository } from '../../domain/ports/report-payroll.repository';
import { ReportQueryDto } from '../dtos/report-query.dto';
import { ReportSchemeDto } from '../dtos/generalPayrollReport/report-scheme.dto';

@Injectable()
export class GeneralPayrollReportService {
  constructor(
    @Inject('IPayrollReportRepository')
    private readonly payrollReportRepository: IPayrollReportRepository,

    @Inject('IPdfGeneratorFactory')
    private readonly pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(filter: ReportQueryDto): Promise<PDFKit.PDFDocument> {
    if (!filter.payrollType || !filter.companyCode || !filter.periodCode) {
      throw new BadRequestException(
        'Invalid parameters: (payrollType, companyCode, periodCode) are required'
      )
    }

    const payrollReportData: ReportSchemeDto | null = await this.payrollReportRepository.getPayrollReport(filter)

    if (!payrollReportData) {
      throw new NotFoundException('General Payroll Report not found with the provided filters')
    }

    try {
      const pdfGenerator           = this.pdfGeneratorFactory.getGenerator('generalPayrollReports')
      const pdfDocumentDefinitions = await pdfGenerator.createDocumentDefinitions(payrollReportData)
      const pdfDocument            = await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument;
    } catch (error: any) {
      console.error('GeneralPayrollReportService -> generateReport -> error', error);
      throw new ExternalServiceException(
        `Error generating report GeneralPayrollReportService -> ${error.message}`
      )
    }
  }
}