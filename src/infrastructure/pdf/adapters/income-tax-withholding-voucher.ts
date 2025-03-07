import { Injectable } from '@nestjs/common';
import { IPdfGenerator } from '../../../domain/repositories/pdf-generator.repository.interface';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { createIncomeTaxWithholdingVoucherTemplate } from './templates/incomeTaxWithholdingVoucher/income-tax-withholding-voucher'
import { ReportSchemeDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/report-scheme.dto';

@Injectable()
export class PdfGeneratorAdapterIncomeTaxWithholdingVoucher implements IPdfGenerator {
  constructor(private printerService: PrinterService) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    console.log('generating PDF IncomeTaxWithholdingVoucher...')
    const documentDefinition = createIncomeTaxWithholdingVoucherTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition);
  }
}