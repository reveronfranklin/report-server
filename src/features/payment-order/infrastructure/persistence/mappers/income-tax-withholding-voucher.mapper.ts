/* Imports */
import { PaymentOrderModel } from '../models/payment-order.model';
import { PaymentOrderEntity } from '../../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/report-scheme.dto';
import { ReportHeaderDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/report-header.dto';
import { ReportSubHeaderDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/report-sub-header.dto';
import { ReportBodyDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/report-body.dto';
import { WithholdingDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/withholding.dto';

/* Utils */
import { formatDate, formatRIF, formatFiscalPeriod, formatPercentageRetention } from '@shared/utils';

export class IncomeTaxWithholdingVoucherMapper {
  static toDomain(paymentOrderModel: PaymentOrderModel): ReportSchemeDto {
    const status = (paymentOrderModel.status === 'AN') ?  'annulled' : 'approved'

    const reportScheme: ReportSchemeDto = {
      name: 'income-tax-withholding-voucher-report',
      status: status,
      header: this.mapToReportHeader(),
      subHeader: this.mapToReportSubHeader(paymentOrderModel),
      body: this.mapToReportBody(paymentOrderModel)
    }

    return reportScheme
  }

  private static mapToReportHeader(): ReportHeaderDto {
    const subTitle = 'CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO'

    return {
      subTitle
    }
  }

  private static mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const supplier = order?.supplier ?? null

    return {
      retentionAgentName: order.withholdingAgentName,
      retentionAgentPhone: order.withholdingAgentPhone,
      retentionAgentRif: formatRIF(order.withholdingAgentRIF),
      retentionAgentAddress: order.withholdingAgentAddress,
      date: formatDate(order.insertionDate),
      fiscalPeriod: formatFiscalPeriod(order.insertionDate),
      retainedSubjectName: supplier.providerName,
      retainedSubjectRif: formatRIF(supplier?.taxId),
      paymentOrderNumber: order.paymentOrderNumber
    }
  }

  private static mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    const documents = order?.documents ?? []

    let totalTaxableIncome: number     = 0
    let totalIncomeTaxWithheld: number = 0

    const listWithholding: WithholdingDto[] = []

    documents.forEach((document) => {
      const taxDocument = document.taxDocument
      const withholding = taxDocument?.withholding

      const data = {
        invoiceNumber: document.documentNumber,
        invoiceDate: formatDate(document.documentDate),
        conceptPayment: withholding?.paymentConcept,
        extensiveTax: taxDocument?.exemptTaxAmount,
        taxableIncome: taxDocument?.taxableBase,
        alicuota: formatPercentageRetention(withholding?.byRetention ?? 0),
        incomeTaxWithheld: taxDocument?.taxAmount,
        subtrahend: null
      }

      totalTaxableIncome      += Number(taxDocument?.taxableBase)
      totalIncomeTaxWithheld  += Number(taxDocument?.taxAmount)

      listWithholding.push(data)
    })

    return {
      withHolding: listWithholding,
      totalTaxableIncome: totalTaxableIncome,
      totalIncomeTaxWithheld: totalIncomeTaxWithheld
    }
  }
}