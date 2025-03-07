/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

/* Repositories */
import { IVatWithholdingVoucherRepository } from '../../domain/repositories/report/vat-withholding-voucher.repository.interface';

/* Services Pdf (revisar para que no tenga detalles de implementacion de la capa de infraestructura) */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

/* Dtos */
import { ReportSchemeDto } from '../dtos/vatWithholdingVoucher/report-scheme.dto';

@Injectable()
export class VatWithholdingVoucherService {
  constructor(
    @Inject('IVatWithholdingVoucherRepository')
    private vatWithholdingVoucherRepository: IVatWithholdingVoucherRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    /* Para que el tipo de retorno sea el correcto debemos pasar los Dtos al Domain */
    const vatWithholdingVoucherReport: ReportSchemeDto | null = await this.vatWithholdingVoucherRepository.findById(id)

    if (!vatWithholdingVoucherReport) {
      throw new Error('Vat Withholding Voucher Report not found')
    }

    try {
      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('vatWithholdingVoucher')

      /* Generar el documento PDF */
      const pdfDocument = pdfGenerator.generatePdf(vatWithholdingVoucherReport)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw error
    }
  }
}