/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '@exceptions/not-found.exception';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IReportBatchesRepository } from '../../domain/ports/report-batches.repository';
import { ReportQueryDto } from '../dtos/report-query.dto';
import { ReportSchemeDto } from '../dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class ElectronicPaymentService {
  constructor(
    @Inject('IReportBatchesRepository')
    private reportBatchesRepository: IReportBatchesRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport({ paymentBatchCode }: ReportQueryDto): Promise<PDFKit.PDFDocument> {
    if (!paymentBatchCode) {
      throw new BadRequestException('Invalid parameters: (paymentBatchCode) is required and greater than 0')
    }

    const electronicPaymentData: ReportSchemeDto | null = await this.reportBatchesRepository.getBatch(paymentBatchCode, false);

    if (!electronicPaymentData) {
      throw new NotFoundException('Electronic Payment not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('reportBatches')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(electronicPaymentData)
      const pdfDocument 			= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new ExternalServiceException(`Error generating report ElectronicPaymentService -> ${error.message}`)
    }
  }
}
