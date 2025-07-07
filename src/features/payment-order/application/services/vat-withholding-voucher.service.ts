/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { IVatWithholdingVoucherRepository } from '../../domain/repositories/vat-withholding-voucher.repository.interface';
import { IPdfGeneratorFactory } from '../../domain/services/pdf-generator-factory.interface';
import { ReportSchemeDto } from '../dtos/vatWithholdingVoucher/report-scheme.dto';
import { CustomException } from '@exceptions/custom.exception';

@Injectable()
export class VatWithholdingVoucherService {
  constructor(
    @Inject('IVatWithholdingVoucherRepository')
    private vatWithholdingVoucherRepository: IVatWithholdingVoucherRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    /* Para que el tipo de retorno sea el correcto debemos pasar los Dtos al Domain */
    const vatWithholdingVoucherReport: ReportSchemeDto | null = await this.vatWithholdingVoucherRepository.findById(id)

    if (!vatWithholdingVoucherReport) {
      throw new CustomException('Vat Withholding Voucher Report not found')
    }

    try {
      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('vatWithholdingVoucher')

      /* Generar el documento PDF */
      const pdfDocument = pdfGenerator.generatePdf(vatWithholdingVoucherReport)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new CustomException(`Error generating report VatWithholdingVoucherService: ${error.message}`)
    }
  }
}