import { Injectable, Logger } from '@nestjs/common';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';
import { PrinterService } from '@shared/modules/printer/printer.service';
import { createTaxStampVoucherTemplate } from './templates/taxStampVoucher/tax-stamp-voucher'
import { ReportSchemeDto } from '../../../application/dtos/taxStampVoucher/report-scheme.dto';

@Injectable()
export class TaxStampVoucherPdf implements IPdfGenerator {
  private readonly logger = new Logger(TaxStampVoucherPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    this.logger.log(`generating PDF ${reportScheme.name}...`)
    const documentDefinition = createTaxStampVoucherTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition)
  }
}