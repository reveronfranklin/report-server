/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import { CustomException } from '@exceptions/custom.exception';
import { GenerateReportDto } from '../dtos/generate-report.dto';

@Injectable()
export class DebitNoteThirdPartiesService {
  constructor() {}

  async generateReport({ codigoLotePago, codigoPago }: GenerateReportDto)/* : Promise<PDFKit.PDFDocument> */ {

    console.log('test', codigoLotePago, codigoPago)

    /* const incomeTaxWithholdingVoucherReport: ReportSchemeDto | null = await this.incomeTaxWithholdingVoucherRepository.findById(id)

    if (!incomeTaxWithholdingVoucherReport) {
      throw new CustomException('Income Tax Withholding Voucher Report not found')
    } */

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
