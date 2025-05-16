import { Injectable, Logger } from '@nestjs/common';
import { IPdfGenerator } from '../../../domain/services/pdf-generator.interface';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { createIncomeTaxWithholdingVoucherTemplate } from './templates/incomeTaxWithholdingVoucher/income-tax-withholding-voucher'
import { ReportSchemeDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/report-scheme.dto';

@Injectable()
export class IncomeTaxWithholdingVoucherPdf implements IPdfGenerator {
  private readonly logger = new Logger(IncomeTaxWithholdingVoucherPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    this.logger.log(`generating PDF ${reportScheme.name}...`)
    const documentDefinition = createIncomeTaxWithholdingVoucherTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition)
  }
}