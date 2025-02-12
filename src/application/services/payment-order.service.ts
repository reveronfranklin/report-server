/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import moment from 'moment-timezone';

/* Repositories */
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';

/* Entities */
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../dtos/paymentOrder/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/paymentOrder/report-header.dto';
import { ReportSubHeaderDto } from '../dtos/paymentOrder/report-sub-header.dto';
import { ReportBodyDto } from '../dtos/paymentOrder/report-body.dto';
import { FundsDto } from '../dtos/paymentOrder/funds.dto';
import { WithholdingDto } from '../dtos/paymentOrder/withholding.dto';

/* Services Pdf */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

@Injectable()
export class PaymentOrderService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
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

      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('paymentOrder');

      // Generar el documento PDF
      const pdfDocument = pdfGenerator.generatePdf(reportScheme);

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
      TITULO: order.TITULO_REPORTE,
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

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    let total: number = 0
    let totalRetenciones: number = 0
    let titleEspecifica: string = ''

    const listPucOrder: FundsDto[] = [];
    const listWithholding: WithholdingDto[] = [];

    const pucOrders = order?.PUC_PAYMENT_ORDERS ?? []
    const withholdings = order?.WITHHOLDINGS ?? []

    pucOrders.forEach((pucOrder) => {
      const balance = pucOrder?.BALANCE ?? null
      titleEspecifica= balance?.DENOMINACION_PUC ?? ''

      const data = {
        ANO: balance?.ANO,
        DESCRIPCION_FINANCIADO: balance?.DESCRIPCION_FINANCIADO,
        CODIGO_ICP_CONCAT: balance?.CODIGO_ICP_CONCAT,
        CODIGO_PUC_CONCAT: balance.CODIGO_PUC_CONCAT,
        MONTO: pucOrder.MONTO,
        PERIODICO: (pucOrder.MONTO / order.CANTIDAD_PAGO)
      }

      total += Number(pucOrder.MONTO)

      listPucOrder.push(data)
    })

    withholdings.forEach((withholding) => {
      const data = {
        DESCRIPCION:`${withholding.porRetencion ?? ''}% ${withholding?.descripcion?.DESCRIPCION ?? ''}`,
        MONTO_RETENIDO: withholding.montoRetencion ?? 0
      }

      totalRetenciones += Number(withholding.montoRetencion)

      listWithholding.push(data)
    })

    const body = {
      FUNDS: listPucOrder,
      WITHHOLDING: listWithholding,
      TOTAL_ORDEN_PAGO: total,
      MONTO_PAGAR: (total - totalRetenciones),
      TITULO_ESPECIFICA: titleEspecifica,
      MOTIVO: order.MOTIVO
    }

    return body
  }
}