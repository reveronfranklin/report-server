import { Injectable } from '@nestjs/common';
import { IPdfGenerator } from '../../domain/repositories/pdf-generator.interface';
import { createPaymentOrderTemplate } from './templates/payment-order.template';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../application/dtos/report-scheme.dto';

@Injectable()
export class PdfGeneratorAdapter implements IPdfGenerator {
  constructor(private printerService: PrinterService) {}

  async generatePdf(reportScheme: ReportSchemeDto, data: { logoPath: string }): Promise<PDFKit.PDFDocument> {
    const documentDefinition = createPaymentOrderTemplate(data);
    return this.printerService.createPdf(documentDefinition);
  }
}