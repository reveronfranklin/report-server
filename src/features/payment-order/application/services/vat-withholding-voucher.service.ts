/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { CustomException } from '@exceptions/custom.exception';
import { IVatWithholdingVoucherRepository } from '../../domain/repositories/vat-withholding-voucher.repository.interface';
import { ReportSchemeDto } from '../dtos/vatWithholdingVoucher/report-scheme.dto';

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