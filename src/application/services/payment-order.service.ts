/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

/* Repositories */
import { IPaymentOrderRepository } from '../../domain/repositories/report/payment-order.repository.interface';

/* Services Pdf (revisar para que no tenga detalles de implementacion de la capa de infraestructura) */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

/* Dtos */
import { ReportSchemeDto } from '../dtos/paymentOrder/report-scheme.dto';

@Injectable()
export class PaymentOrderService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    /* Para que el tipo de retorno sea el correcto debemos pasar los Dtos al Domain */
    const paymentOrderReport: ReportSchemeDto | null = await this.paymentOrderRepository.findById(id)

    if (!paymentOrderReport) {
      throw new Error('Payment Order Report not found')
    }

    try {
      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('paymentOrder')

      /* Generar el documento PDF */
      const pdfDocument = pdfGenerator.generatePdf(paymentOrderReport)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw error
    }
  }
}