/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '@exceptions/not-found.exception';
import { BadRequestException } from '@exceptions/bad-request.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IDebitNoteThirdPartiesRepository } from '../../domain/ports/debit-note-third-parties.repository';
import { PaymentBatchReportQueryDto } from '../dtos/payment-batch-report-query.dto';
import { ReportSchemeDto } from '../dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class DebitNoteThirdPartiesService {
  constructor(
    @Inject('IDebitNoteThirdPartiesRepository')
    private debitNoteThirdPartiesRepository: IDebitNoteThirdPartiesRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport({ paymentBatchCode, paymentCode }: PaymentBatchReportQueryDto): Promise<PDFKit.PDFDocument> {
    if (!paymentBatchCode) {
      throw new BadRequestException('Invalid parameters: paymentBatchCode is required')
    }

    let debitNoteThirdPartiesData: ReportSchemeDto | null

    if (paymentCode === undefined || paymentCode === 0) {
      debitNoteThirdPartiesData = await this.debitNoteThirdPartiesRepository.getPaymentBatches(paymentBatchCode)
    } else {
      debitNoteThirdPartiesData = await this.debitNoteThirdPartiesRepository.getPaymentBatchByPaymentCode(paymentBatchCode, paymentCode)
    }

    if (!debitNoteThirdPartiesData) {
      throw new NotFoundException('Debit Note Third Parties Report not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('debitNoteThridParties')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(debitNoteThirdPartiesData)
      const pdfDocument 			= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new ExternalServiceException(`Error generating report DebitNoteThirdPartiesService -> ${error.message}`)
    }
  }
}
