/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';

/* Entities */
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../dtos/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/report-header.dto';
import { ReportBodyDto } from '../dtos/report-body.dto';

/* Services Pdf */
import { IPdfGenerator } from '../../domain/repositories/pdf-generator.interface';

@Injectable()
export class PaymentOrderService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGenerator')
    private pdfGenerator: IPdfGenerator
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    const paymentOrder = await this.paymentOrderRepository.findByIdWithRelations(id);

    if (!paymentOrder) {
      throw new Error('Payment order not found');
    }

    try {
      const reportScheme: ReportSchemeDto = {
        name: 'payment-order',
        logoPath: 'src/shared/utils/images/LogoIzquierda.jpeg',
        headers: this.mapToReportHeader(paymentOrder),
        body: this.mapToReportBody(paymentOrder)
      };

      // Generar el documento PDF
      const pdfDocument = this.pdfGenerator.generatePdf(reportScheme);

      return pdfDocument;
    } catch (error) {
      console.error('generateReport -> error', error)
      throw error;
    }
  }

  private mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
    const paymentOrderType  = order.TIPO_ORDEN_PAGO ?? null
    const methodOfPayment   = order.FRECUENCIA_PAGO ?? null
    const supplier          = order.PROVEEDOR ?? null
    const beneficiary       = supplier?.BENEFICIARIES[0] ?? null
    const commitment        = order?.COMMITMENT ?? null
    const preCommitment     = commitment?.PRE_COMMITMENT ?? null

    return {
      DESCRIPCION: paymentOrderType?.DESCRIPCION,
      NUMERO_COMPROMISO: preCommitment?.NUMERO_COMPROMISO,
      NUMERO_ORDEN_PAGO: order.NUMERO_ORDEN_PAGO,
      FECHA_ORDEN_PAGO: order.FECHA_ORDEN_PAGO,
      FECHA_COMPROMISO: preCommitment?.FECHA_COMPROMISO,
      NOMBRE_PROVEEDOR: supplier?.NOMBRE_PROVEEDOR,
      CEDULA_PROVEEDOR: supplier?.CEDULA,
      RIF_PROVEEDOR: supplier?.RIF,
      NOMBRE_BENEFICIARIO: beneficiary?.NOMBRE,
      APELLIDO_BENEFICIARIO: beneficiary?.APELLIDO,
      CEDULA_BENEFICIARIO: beneficiary?.IDENTIFICACION,
      FECHA_PLAZO_DESDE: order.FECHA_PLAZO_DESDE,
      FECHA_PLAZO_HASTA: order.FECHA_PLAZO_HASTA,
      MONTO_LETRAS: order.MONTO_LETRAS,
      FORMA_DE_PAGO: methodOfPayment?.DESCRIPCION
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto[] {
    const body = []
    const pucOrders = order?.PUC_PAYMENT_ORDERS ?? []

    pucOrders.forEach((pucOrder) => {
      const balance = pucOrder?.BALANCE ?? null

      const data = {
        ANO: balance?.ANO,
        DESCRIPCION_FINANCIADO: balance?.DESCRIPCION_FINANCIADO,
        CODIGO_ICP_CONCAT: balance?.CODIGO_ICP_CONCAT,
        CODIGO_PUC_CONCAT: balance.CODIGO_PUC_CONCAT,
        MONTO: pucOrder.MONTO,
        PERIODICO: (pucOrder.MONTO / order.CANTIDAD_PAGO)
      }
      body.push(data)
    })

    return body
  }
}