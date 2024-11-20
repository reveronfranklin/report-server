import { Injectable } from '@nestjs/common';
import { IPdfGenerator } from '../../domain/repositories/pdf-generator.interface';
import { createPaymentOrderTemplate } from './templates/payment-order.template';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../application/dtos/report-scheme.dto';

@Injectable()
export class PdfGeneratorAdapter implements IPdfGenerator {
  constructor(private printerService: PrinterService) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {

    console.log('generating PDF...')

    console.log('reportScheme -> headers', reportScheme.headers)
    console.log('reportScheme -> body', reportScheme.body)


    const documentDefinition = createPaymentOrderTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition);
  }
}