/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import { CustomException } from '@exceptions/custom.exception';
import { IDebitNoteThirdPartiesRepository } from '../../domain/ports/debit-note-third-parties.repository';
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { ReportSchemeDto } from '../dtos/debitNoteThirdParties/report-scheme.dto';

@Injectable()
export class DebitNoteThirdPartiesService {
  constructor(
    @Inject('IDebitNoteThirdPartiesRepository')
    private debitNoteThirdPartiesRepository: IDebitNoteThirdPartiesRepository,
   /*  @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory */
  ) {}

  async generateReport({ codigoLotePago, codigoPago }: GenerateReportDto)/* : Promise<PDFKit.PDFDocument> */ {
    if (!codigoLotePago) {
      throw new CustomException('Invalid parameters: codigoLotePago is required')
    }

    let debitNoteThirdPartiesReport: ReportSchemeDto | null

    if (!codigoPago) {
      debitNoteThirdPartiesReport = await this.debitNoteThirdPartiesRepository.getPaymentBatches(codigoLotePago)
    } else {
      debitNoteThirdPartiesReport = await this.debitNoteThirdPartiesRepository.getPaymentBatchByPaymentCode(codigoLotePago, codigoPago)
    }

    console.log('debitNoteThirdPartiesReport', debitNoteThirdPartiesReport)

    if (!debitNoteThirdPartiesReport) {
      throw new CustomException('Debit Note Third Parties Report not found')
    }

    try {
      /* const pdfGenerator  = this.pdfGeneratorFactory.getGenerator('incomeTaxWithholdingVoucher')
      const pdfDocument   = pdfGenerator.generatePdf(incomeTaxWithholdingVoucherReport)

      return pdfDocument */
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new CustomException(`Error generating report DebitNoteThirdPartiesService: ${error.message}`)
    }
  }
}
