/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';
import { IPdfGeneratorFactory } from '../../domain/services/pdf-generator-factory.interface';
import { ReportSchemeDto } from '../dtos/paymentOrder/report-scheme.dto';
import { CustomException } from '../../exceptions/custom.exception';

@Injectable()
export class PaymentOrderService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    /* Para que el tipo de retorno sea el correcto debemos pasar los Dtos al Domain */
    const paymentOrderReport: ReportSchemeDto | null = await this.paymentOrderRepository.findById(id)

    if (!paymentOrderReport) {
      throw new CustomException('Payment Order Report not found')
    }

    try {
      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('paymentOrder')

      /* Generar el documento PDF */
      const pdfDocument = pdfGenerator.generatePdf(paymentOrderReport)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new CustomException(`Error generating report PaymentOrderService: ${error.message}`)
    }
  }
}