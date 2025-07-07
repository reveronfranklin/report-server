import { Injectable, Logger } from '@nestjs/common';
import { IPdfGenerator } from '../../../domain/services/pdf-generator.interface';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { createVatWithholdingVoucherTemplate } from './templates/vatWithholdingVoucher/vat-withholding-voucher'
import { ReportSchemeDto } from '../../../application/dtos/vatWithholdingVoucher/report-scheme.dto';

@Injectable()
export class VatWithholdingVoucherPdf implements IPdfGenerator {
  private readonly logger = new Logger(VatWithholdingVoucherPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    this.logger.log(`generating PDF ${reportScheme.name}...`)
    const documentDefinition = createVatWithholdingVoucherTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition)
  }
}