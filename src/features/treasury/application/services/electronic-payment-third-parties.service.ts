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
export class ElectronicPaymentThirdPartiesService {
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

    const electronicPaymentThirdPartiesData: ReportSchemeDto | null = await this.reportBatchesRepository.getBatch(paymentBatchCode, true)

    if (!electronicPaymentThirdPartiesData) {
      throw new NotFoundException('Electronic Payment Third Parties not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('reportBatches')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(electronicPaymentThirdPartiesData)
      const pdfDocument 			= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new ExternalServiceException(`Error generating report ElectronicPaymentThirdPartiesService -> ${error.message}`)
    }
  }
}
