import { Injectable } from '@nestjs/common';
import { IPdfGenerator } from '../../../domain/repositories/pdf-generator.interface';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { createVatWithholdingVoucherTemplate } from './templates/vatWithholdingVoucher/vat-withholding-voucher'
import { ReportSchemeDto } from '../../../application/dtos/vatWithholdingVoucher/report-scheme.dto';

@Injectable()
export class PdfGeneratorAdapterVatWithholdingVoucher implements IPdfGenerator {
  constructor(private printerService: PrinterService) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    console.log('generating PDF VatWithholdingVoucher...')
    const documentDefinition = createVatWithholdingVoucherTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition);
  }
}