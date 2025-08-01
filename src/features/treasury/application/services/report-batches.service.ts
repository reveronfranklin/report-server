/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '@exceptions/not-found.exception';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IReportBatchesRepository } from '../../domain/ports/report-batches.repository';
import { BatchReportQueryDto } from '../dtos/batch-report-query.dto';
import { ReportSchemeDto } from '../dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class ReportBatchesService {
  constructor(
    @Inject('IReportBatchesRepository')
    private reportBatchesRepository: IReportBatchesRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport({ batchCode }: BatchReportQueryDto): Promise<PDFKit.PDFDocument> {
    if (!batchCode) {
      throw new BadRequestException('Invalid parameters: (batchCode) is required')
    }

    const reportBatches: ReportSchemeDto | null = await this.reportBatchesRepository.getBatch(batchCode)

    if (!reportBatches) {
      throw new NotFoundException('Report Batches not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('reportBatches')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(reportBatches)
      const pdfDocument 			= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new ExternalServiceException(`Error generating report ReportBatches: ${error.message}`)
    }
  }
}
