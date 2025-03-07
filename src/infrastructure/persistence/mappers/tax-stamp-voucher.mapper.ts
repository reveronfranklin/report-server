/* Imports */
import { PaymentOrderModel } from '../models/payment-order.model';
import { PaymentOrderEntity } from '../../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/taxStampVoucher/report-scheme.dto';
import { ReportHeaderDto } from '../../../application/dtos/taxStampVoucher/report-header.dto';
import { ReportSubHeaderDto } from '../../../application/dtos/taxStampVoucher/report-sub-header.dto';
import { ReportBodyDto } from '../../../application/dtos/taxStampVoucher/report-body.dto';
import { WithholdingDto } from '../../../application/dtos/taxStampVoucher/withholding.dto';

/* Utils */
import { formatDate, formatRIF, calculateTaxableIncome } from '../../../shared/utils';

export class TaxStampVoucherMapper {
  static toDomain(paymentOrderModel: PaymentOrderModel): ReportSchemeDto {
    const status = (paymentOrderModel.status === 'AP') ?  'approved' : 'annulled'

    const reportScheme: ReportSchemeDto = {
      name: 'tax-stamp-voucher-report',
      status: status,
      header: this.mapToReportHeader(paymentOrderModel?.paymentOrderNumber),
      subHeader: this.mapToReportSubHeader(paymentOrderModel),
      body: this.mapToReportBody(paymentOrderModel)
    }

    return reportScheme
  }

  private static mapToReportHeader(paymentOrderNumber: string): ReportHeaderDto {
    const title = `
      FORMATO N° 2
      PLANILLA PARA EL CÁLCULO DEL IMPUESTO 1x1000
      AGENTES DE RETENCIÓN
      ENTES PÚBLICOS
    `.trim()

    return {
      title,
      dateElaboration:formatDate(new Date(Date.now())),
      paymentOrderNumber
    }
  }

  private static mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const supplier = order?.supplier ?? null

    return {
      nameWithholdingAgent: order?.withholdingAgentName.trim() ?? null,
      withholdingAgentRif:formatRIF(order.withholdingAgentRIF),
      taxpayerName: supplier?.providerName.trim() ?? null,
      taxpayerRifNumber:formatRIF(supplier?.taxId),
      reason: order?.reason.trim() ?? null
    }
  }

  private static mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    const documents    = order?.documents ?? []
    const withHoldings = order?.withholdingOps ?? []

    let totalGrossAmount: number      = 0
    let totalAmountVat: number        = 0
    let totalNetTaxableIncome: number = 0
    let totalTaxExempt: number        = 0

    let taxBase                         = withHoldings[0]?.taxableBase ? Number(withHoldings[0].taxableBase) : 0
    let withholdingPercentage: number   = withHoldings[0]?.retentionAmount ? Number(withHoldings[0].retentionAmount) : 0

    const listWithholding: WithholdingDto[] = []

    documents.forEach((document) => {
      const data = {
        invoiceControlNumber: document.documentControlNumber ?? '00-00000000',
        invoiceNumber: document.documentNumber,
        documentAmount: document.documentAmount
      }

      totalGrossAmount      += Number(document.documentAmount)
      totalAmountVat        += Number(document.taxAmount)
      totalTaxExempt        += Number(document.exemptTaxAmount)

      listWithholding.push(data)
    })

    totalNetTaxableIncome = calculateTaxableIncome(taxBase, totalGrossAmount, totalTaxExempt, totalAmountVat)

    return {
      withHolding: listWithholding,
      totalGrossAmount,
      totalAmountVat,
      totalNetTaxableIncome,
      withholdingPercentage
    }
  }
}