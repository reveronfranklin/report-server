/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';
import moment from 'moment-timezone';

/* Entities */
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../dtos/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/report-header.dto';
import { ReportSubHeaderDto } from '../dtos/report-sub-header.dto';
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
    const paymentOrder = await this.paymentOrderRepository.findByIdWithRelations(id)

    if (!paymentOrder) {
      throw new Error('Payment order not found')
    }

    try {
      const reportScheme: ReportSchemeDto = {
        name: 'payment-order',
        header: this.mapToReportHeader(paymentOrder),
        subHeader: this.mapToReportSubHeader(paymentOrder),
        body: this.mapToReportBody(paymentOrder)
      }

      // Generar el documento PDF
      const pdfDocument = this.pdfGenerator.generatePdf(reportScheme);

      return pdfDocument;
    } catch (error) {
      console.error('generateReport -> error', error)
      throw error;
    }
  }
  public isValidDate(date: any): date is Date {
    return date instanceof Date && !isNaN(date.getTime())
  }

  public formatDate(date: any): any {
    const formattedDate = moment(date)
    return formattedDate.tz('UTC').format('DD/MM/YYYY')
  }

  private mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
    const paymentOrderType  = order.TIPO_ORDEN_PAGO ?? null
    const commitment        = order?.COMMITMENT ?? null
    const preCommitment     = commitment?.PRE_COMMITMENT ?? null
    const dateOrderPayment  = this.formatDate(order.FECHA_ORDEN_PAGO)
    const dateCommitment    = this.formatDate(preCommitment?.FECHA_COMPROMISO)

    return {
      DESCRIPCION: paymentOrderType?.DESCRIPCION,
      TITULO: 'ORDEN DE PAGO',
      NUMERO_COMPROMISO: preCommitment?.NUMERO_COMPROMISO,
      NUMERO_ORDEN_PAGO: order.NUMERO_ORDEN_PAGO,
      FECHA_ORDEN_PAGO: dateOrderPayment,
      FECHA_COMPROMISO: dateCommitment
    }
  }

  private mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const methodOfPayment   = order.FRECUENCIA_PAGO ?? null
    const supplier          = order.PROVEEDOR ?? null
    const beneficiary       = supplier?.BENEFICIARIES[0] ?? null

    const dateSince = this.isValidDate(order.FECHA_PLAZO_DESDE) ? order.FECHA_PLAZO_DESDE : null
    const dateUntil = this.isValidDate(order.FECHA_PLAZO_HASTA) ? order.FECHA_PLAZO_HASTA : null

    return {
      NOMBRE_PROVEEDOR: supplier?.NOMBRE_PROVEEDOR,
      CEDULA_PROVEEDOR: supplier?.CEDULA,
      RIF_PROVEEDOR: supplier?.RIF,
      NOMBRE_BENEFICIARIO: beneficiary?.NOMBRE,
      APELLIDO_BENEFICIARIO: beneficiary?.APELLIDO,
      CEDULA_BENEFICIARIO: beneficiary?.IDENTIFICACION,
      FECHA_PLAZO_DESDE: dateSince,
      FECHA_PLAZO_HASTA: dateUntil,
      MONTO_LETRAS: order.MONTO_LETRAS,
      FORMA_DE_PAGO: methodOfPayment?.DESCRIPCION,
      CANTIDAD_PAGO: order.CANTIDAD_PAGO
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