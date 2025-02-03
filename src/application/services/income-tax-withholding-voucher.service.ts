/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';
import moment from 'moment-timezone';

/* Entities */
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../dtos/incomeTaxWithholdingVoucher/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/incomeTaxWithholdingVoucher/report-header.dto';
import { ReportBodyDto } from '../dtos/incomeTaxWithholdingVoucher/report-body.dto';

/* Services Pdf */
import { IPdfGenerator } from '../../domain/repositories/pdf-generator.interface';

@Injectable()
export class IncomeTaxWithholdingVoucherService {
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
      /* const reportScheme: ReportSchemeDto = {
        name: 'payment-order',
        header: this.mapToReportHeader(paymentOrder),
        body: this.mapToReportBody(paymentOrder)
      } */

        const reportScheme = {}

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

/*   private mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
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
  } */

  /* private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    let total: number = 0
    let totalRetenciones: number = 0

    const listPucOrder: FundsDto[] = [];
    const listWithholding: WithholdingDto[] = [];

    const pucOrders = order?.PUC_PAYMENT_ORDERS ?? []
    const withholdings = order?.WITHHOLDINGS ?? []

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
      MONTO_PAGAR: (total - totalRetenciones)
    }

    return body
  } */
}