/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { CustomException } from '@exceptions/custom.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IDebitNoteThirdPartiesRepository } from '../../domain/ports/debit-note-third-parties.repository';
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { ReportSchemeDto } from '../dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class DebitNoteThirdPartiesService {
  constructor(
    @Inject('IDebitNoteThirdPartiesRepository')
    private debitNoteThirdPartiesRepository: IDebitNoteThirdPartiesRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport({ codigoLotePago, codigoPago }: GenerateReportDto): Promise<PDFKit.PDFDocument> {
    if (!codigoLotePago) {
      throw new CustomException('Invalid parameters: codigoLotePago is required')
    }

    let debitNoteThirdPartiesData: ReportSchemeDto | null

    if (codigoPago === undefined || codigoPago === 0) {
      debitNoteThirdPartiesData = await this.debitNoteThirdPartiesRepository.getPaymentBatches(codigoLotePago)
    } else {
      debitNoteThirdPartiesData = await this.debitNoteThirdPartiesRepository.getPaymentBatchByPaymentCode(codigoLotePago, codigoPago)
    }

    if (!debitNoteThirdPartiesData) {
      throw new CustomException('Debit Note Third Parties Report not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('debitNoteThridParties')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(debitNoteThirdPartiesData)
      const pdfDocument 						= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new CustomException(`Error generating report DebitNoteThirdPartiesService: ${error.message}`)
    }
  }
}
