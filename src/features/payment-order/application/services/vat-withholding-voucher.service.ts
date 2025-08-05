/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '@exceptions/not-found.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
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
    const vatWithholdingVoucherData: ReportSchemeDto | null = await this.vatWithholdingVoucherRepository.findById(id)

    if (!vatWithholdingVoucherData) {
      throw new NotFoundException('Vat Withholding Voucher Report not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('vatWithholdingVoucher')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(vatWithholdingVoucherData)
      const pdfDocument 						= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new ExternalServiceException(`Error generating report VatWithholdingVoucherService: ${error.message}`)
    }
  }
}