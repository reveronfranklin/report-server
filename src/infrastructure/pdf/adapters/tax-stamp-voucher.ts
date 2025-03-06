import { Injectable } from '@nestjs/common';
import { IPdfGenerator } from '../../../domain/repositories/pdf-generator.interface';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { createTaxStampVoucherTemplate } from './templates/taxStampVoucher/tax-stamp-voucher'
import { ReportSchemeDto } from '../../../application/dtos/taxStampVoucher/report-scheme.dto';

@Injectable()
export class PdfGeneratorAdapterTaxStampVoucher implements IPdfGenerator {
  constructor(private printerService: PrinterService) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    console.log('generating PDF taxStampVoucher...')
    const documentDefinition = createTaxStampVoucherTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition);
  }
}