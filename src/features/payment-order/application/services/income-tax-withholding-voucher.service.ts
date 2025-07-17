/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { CustomException } from '@exceptions/custom.exception';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IIncomeTaxWithholdingVoucherRepository } from '../../domain/repositories/income-tax-withholding-voucher.repository.interface';
import { ReportSchemeDto } from '../dtos/incomeTaxWithholdingVoucher/report-scheme.dto';

@Injectable()
export class IncomeTaxWithholdingVoucherService {
  constructor(
    @Inject('IIncomeTaxWithholdingVoucherRepository')
    private incomeTaxWithholdingVoucherRepository: IIncomeTaxWithholdingVoucherRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    const incomeTaxWithholdingVoucherData: ReportSchemeDto | null = await this.incomeTaxWithholdingVoucherRepository.findById(id)

    if (!incomeTaxWithholdingVoucherData) {
      throw new CustomException('Income Tax Withholding Voucher Report not found')
    }

    try {
      const pdfGenerator            = this.pdfGeneratorFactory.getGenerator('incomeTaxWithholdingVoucher')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(incomeTaxWithholdingVoucherData)
      const pdfDocument 						= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new CustomException(`Error generating report incomeTaxWithholdingVoucherService: ${error.message}`)
    }
  }
}