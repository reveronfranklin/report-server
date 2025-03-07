/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

/* Repositories */
import { IIncomeTaxWithholdingVoucherRepository } from '../../domain/repositories/report/income-tax-withholding-voucher.repository.interface';

/* Services Pdf (revisar para que no tenga detalles de implementacion de la capa de infraestructura) */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

/* Dtos */
import { ReportSchemeDto } from '../dtos/incomeTaxWithholdingVoucher/report-scheme.dto';

@Injectable()
export class IncomeTaxWithholdingVoucherService {
  constructor(
    @Inject('IIncomeTaxWithholdingVoucherRepository')
    private incomeTaxWithholdingVoucherRepository: IIncomeTaxWithholdingVoucherRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    /* Para que el tipo de retorno sea el correcto debemos pasar los Dtos al Domain */
    const incomeTaxWithholdingVoucherReport: ReportSchemeDto | null = await this.incomeTaxWithholdingVoucherRepository.findById(id)

    if (!incomeTaxWithholdingVoucherReport) {
      throw new Error('Income Tax Withholding Voucher Report not found')
    }

    try {
      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('incomeTaxWithholdingVoucher')

      /* Generar el documento PDF */
      const pdfDocument = pdfGenerator.generatePdf(incomeTaxWithholdingVoucherReport)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw error
    }
  }
}