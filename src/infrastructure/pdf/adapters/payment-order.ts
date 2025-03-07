import { Injectable } from '@nestjs/common';
import { IPdfGenerator } from '../../../domain/repositories/pdf-generator.repository.interface';
import { createPaymentOrderTemplate } from './templates/paymentOrder/payment-order.template';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../../application/dtos/paymentOrder/report-scheme.dto';

@Injectable()
export class PdfGeneratorAdapterPaymentOrder implements IPdfGenerator {
  constructor(private printerService: PrinterService) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    console.log('generating PDF PaymentOrder...')
    const documentDefinition = createPaymentOrderTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition);
  }
}