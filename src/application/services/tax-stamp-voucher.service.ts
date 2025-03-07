/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

/* Repositories */
import { ITaxStampVoucherRepository } from '../../domain/repositories/report/tax-stamp-voucher.repository.interface';

/* Services Pdf (revisar para que no tenga detalles de implementacion de la capa de infraestructura) */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

/* Dtos */
import { ReportSchemeDto } from '../dtos/taxStampVoucher/report-scheme.dto';

@Injectable()
export class TaxStampVoucherService {
  constructor(
    @Inject('ITaxStampVoucherRepository')
    private taxStampVoucherRepository: ITaxStampVoucherRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    /* Para que el tipo de retorno sea el correcto debemos pasar los Dtos al Domain */
    const taxStampVoucherReport: ReportSchemeDto | null = await this.taxStampVoucherRepository.findById(id)

    if (!taxStampVoucherReport) {
      throw new Error('Tax Stamp Voucher Report not found')
    }

    try {
      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('taxStampVoucher')

      /* Generar el documento PDF */
      const pdfDocument = pdfGenerator.generatePdf(taxStampVoucherReport)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw error
    }
  }
}