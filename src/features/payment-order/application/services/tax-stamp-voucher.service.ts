/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '@exceptions/not-found.exception';
import { ExternalServiceException } from '@exceptions/external-service.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { ITaxStampVoucherRepository } from '../../domain/repositories/tax-stamp-voucher.repository.interface';
import { ReportSchemeDto } from '../dtos/taxStampVoucher/report-scheme.dto';

@Injectable()
export class TaxStampVoucherService {
  constructor(
    @Inject('ITaxStampVoucherRepository')
    private taxStampVoucherRepository: ITaxStampVoucherRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    const taxStampVoucherData: ReportSchemeDto | null = await this.taxStampVoucherRepository.findById(id)

    if (!taxStampVoucherData) {
      throw new NotFoundException('Tax Stamp Voucher Report not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('taxStampVoucher')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(taxStampVoucherData)
      const pdfDocument 						= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new ExternalServiceException(`Error generating report TaxStampVoucherService: ${error.message}`)
    }
  }
}