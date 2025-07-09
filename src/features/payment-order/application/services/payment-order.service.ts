/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';

import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { CustomException } from '@exceptions/custom.exception';
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';
import { ReportSchemeDto } from '../dtos/paymentOrder/report-scheme.dto';

@Injectable()
export class PaymentOrderService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGeneratorFactory')
    private pdfGeneratorFactory: IPdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    const paymentOrderData: ReportSchemeDto | null = await this.paymentOrderRepository.findById(id)

    if (!paymentOrderData) {
      throw new CustomException('Payment Order Report not found')
    }

    try {
      const pdfGenerator						= this.pdfGeneratorFactory.getGenerator('paymentOrder')
      const pdfDocumentDefinitions	= await pdfGenerator.createDocumentDefinitions(paymentOrderData)
      const pdfDocument 						= await pdfGenerator.generatePdf(pdfDocumentDefinitions)

      return pdfDocument
    } catch (error) {
      console.error('generateReport -> error', error)
      throw new CustomException(`Error generating report PaymentOrderService: ${error.message}`)
    }
  }
}