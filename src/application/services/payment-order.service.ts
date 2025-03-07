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
    const paymentOrder = await this.paymentOrderRepository.findByIdWithPaymentOrder(id)

    if (!paymentOrder) {
      throw new Error('Payment order not found')
    }

    try {
      const status = (paymentOrder.status === 'AP') ?  'approved' : 'annulled'

      const reportScheme: ReportSchemeDto = {
        name: 'payment-order',
        status: status,
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

  /* Pasar utils */

  public formatRIF(rif: any): any {
    if (!rif) {
      return null
    }
    // Eliminar cualquier guión existente en el RIF
    const cleanRIF = rif.replace(/-/g, '');
    // Obtener el primer carácter
    const firstChar = cleanRIF.charAt(0);
    // Obtener el resto de los caracteres, rellenando con ceros a la izquierda si es necesario
    const restOfRIF = cleanRIF.slice(1).padStart(9, '0');
    return `${firstChar}-${restOfRIF}`;
  }

  private mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
    const paymentOrderType  = order.paymentOrderType ?? null
    const commitment        = order?.commitment ?? null
    const preCommitment     = commitment?.preCommitment ?? null
    const dateOrderPayment  = this.formatDate(order.paymentOrderDate)
    const dateCommitment    = this.formatDate(preCommitment?.commitmentDate)

    return {
      DESCRIPCION: paymentOrderType?.description,
      TITULO: order.reportTitle,
      NUMERO_COMPROMISO: preCommitment?.commitmentNumber,
      NUMERO_ORDEN_PAGO: order.paymentOrderNumber,
      FECHA_ORDEN_PAGO: dateOrderPayment,
      FECHA_COMPROMISO: dateCommitment
    }
  }

  private mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const methodOfPayment   = order.paymentFrequency ?? null
    const supplier          = order.supplier ?? null
    const beneficiary       = supplier?.beneficiaries[0] ?? null

    const dateSince = this.isValidDate(order.deadlineStartDate) ? order.deadlineStartDate : null
    const dateUntil = this.isValidDate(order.deadlineEndDate) ? order.deadlineEndDate : null

    return {
      NOMBRE_PROVEEDOR: supplier?.providerName,
      CEDULA_PROVEEDOR: supplier?.identificationCard,
      RIF_PROVEEDOR: this.formatRIF(supplier?.taxId),
      NOMBRE_BENEFICIARIO: beneficiary?.firstName,
      APELLIDO_BENEFICIARIO: beneficiary?.lastName,
      /* colocar separadores de miles */
      CEDULA_BENEFICIARIO: beneficiary?.identification,
      FECHA_PLAZO_DESDE: dateSince,
      FECHA_PLAZO_HASTA: dateUntil,
      MONTO_LETRAS: order?.amountInWords ?? null,
      FORMA_DE_PAGO: methodOfPayment?.description,
      CANTIDAD_PAGO: order.paymentAmount
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    let total: number = 0
    let totalRetenciones: number = 0
    let titleEspecifica: string = ''

    const listPucOrder: FundsDto[] = [];
    const listWithholding: WithholdingDto[] = [];

    const pucOrders = order?.pucPaymentOrders ?? []
    const withholdings = order?.withholdingOps ?? []

    pucOrders.forEach((pucOrder) => {
      const balance = pucOrder?.balance ?? null
      titleEspecifica= balance?.pucDenomination ?? ''

      const data = {
        ANO: balance?.year,
        DESCRIPCION_FINANCIADO: balance?.financedDescription,
        CODIGO_ICP_CONCAT: balance?.icpCodeConcat,
        CODIGO_PUC_CONCAT: balance?.pucCodeConcat,
        MONTO: pucOrder.amount,
        PERIODICO: (pucOrder.amount / order.paymentAmount)
      }

      total += Number(pucOrder.amount)

      listPucOrder.push(data)
    })

    withholdings.forEach((withholding) => {
      const data = {
        DESCRIPCION:`${withholding.byRetention ?? ''}% ${withholding?.retentionType?.description ?? ''}`,
        MONTO_RETENIDO: withholding.retentionAmount ?? 0
      }

      totalRetenciones += Number(withholding.retentionAmount)

      listWithholding.push(data)
    })

    const body = {
      FUNDS: listPucOrder,
      WITHHOLDING: listWithholding,
      TOTAL_ORDEN_PAGO: total,
      MONTO_PAGAR: (total - totalRetenciones),
      TITULO_ESPECIFICA: titleEspecifica,
      MOTIVO: order.reason.trim()
    }

    return body
  }
}