import { Injectable } from '@nestjs/common';
import { IPdfGenerator } from '../../domain/interfaces/pdf-generator.interface';
import { createPaymentOrderTemplate } from './templates/payment-order.template';
import { PrinterService } from 'src/shared/modules/printer/printer.service';

@Injectable()
export class PdfGeneratorAdapter implements IPdfGenerator {
  constructor(private printerService: PrinterService) {}

  async generatePdf(data: any) {
    const documentDefinition = createPaymentOrderTemplate(data);
    return this.printerService.createPdf(documentDefinition);
  }
}