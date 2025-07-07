import { Injectable, Logger } from '@nestjs/common';
import { IPdfGenerator } from '../../../domain/services/pdf-generator.interface';
import { createPaymentOrderTemplate } from './templates/paymentOrder/payment-order.template';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { ReportSchemeDto } from '../../../application/dtos/paymentOrder/report-scheme.dto';

@Injectable()
export class PaymentOrderPdf implements IPdfGenerator {
  private readonly logger = new Logger(PaymentOrderPdf.name)

  constructor(
    private printerService: PrinterService
  ) {}

  async generatePdf(reportScheme: ReportSchemeDto): Promise<PDFKit.PDFDocument> {
    this.logger.log(`generating PDF ${reportScheme.name}...`)
    const documentDefinition = createPaymentOrderTemplate(reportScheme)
    return this.printerService.createPdf(documentDefinition)
  }
}