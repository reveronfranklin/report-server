/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { IIncomeTaxWithholdingVoucherRepository } from '../../domain/repositories/income-tax-withholding-voucher.repository.interface';
import { IPdfGeneratorFactory } from '../../domain/services/pdf-generator-factory.interface';
import { ReportSchemeDto } from '../dtos/incomeTaxWithholdingVoucher/report-scheme.dto';
import { CustomException } from '../../exceptions/custom.exception';

@Injectable()
export class IncomeTaxWithholdingVoucherService {
  constructor(
    @Inject('IIncomeTaxWithholdingVoucherRepository')
    private incomeTaxWithholdingVoucherRepository: IIncomeTaxWithholdingVoucherRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    /* Para que el tipo de retorno sea el correcto debemos pasar los Dtos al Domain */
    const incomeTaxWithholdingVoucherReport: ReportSchemeDto | null = await this.incomeTaxWithholdingVoucherRepository.findById(id)

    if (!incomeTaxWithholdingVoucherReport) {
      throw new CustomException('Income Tax Withholding Voucher Report not found')
    }

    try {
      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('incomeTaxWithholdingVoucher')

      /* Generar el documento PDF */
      const pdfDocument = pdfGenerator.generatePdf(incomeTaxWithholdingVoucherReport)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new CustomException(`Error generating report incomeTaxWithholdingVoucherService: ${error.message}`)
    }
  }
}