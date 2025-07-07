/* Imports */
import { PaymentOrderModel } from '../models/payment-order.model';
import { PaymentOrderEntity } from '../../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/vatWithholdingVoucher/report-scheme.dto';
import { ReportHeaderDto } from '../../../application/dtos/vatWithholdingVoucher/report-header.dto';
import { ReportSubHeaderDto } from '../../../application/dtos/vatWithholdingVoucher/report-sub-header.dto';
import { ReportBodyDto } from '../../../application/dtos/vatWithholdingVoucher/report-body.dto';
import { WithholdingDto } from '../../../application/dtos/vatWithholdingVoucher/withholding.dto';

/* Utils */
import { formatDate, formatFiscalPeriod, formatRIF, rpad } from '@shared/utils';

export class VatWithholdingVoucherMapper {
  static toDomain(paymentOrderModel: PaymentOrderModel): ReportSchemeDto {
    const status = (paymentOrderModel.status === 'AN') ?  'annulled' : 'approved'

    const reportScheme: ReportSchemeDto = {
      name: 'vat-withholding-voucher-report',
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
      date: formatDate(order.insertionDate),
      voucherNumber: order.receiptNumber,
      nameWithholdingAgent:  order.withholdingAgentName,
      withholdingAgentRif: formatRIF(order.withholdingAgentRIF),
      withholdingAgentAddress: order.withholdingAgentAddress,
      fiscalPeriod: formatFiscalPeriod(order.insertionDate),
      subjectNameWithheld: supplier.providerName,
      subjectNameWithheldRif: formatRIF(supplier?.taxId),
      paymentOrderNumber: order.paymentOrderNumber
    }
  }

  private static mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    const documents = order?.documents ?? []

    let totalPurchasesVat: number     = 0
    let totalPurchasesCredit: number  = 0
    let totalTaxableBase: number      = 0
    let totalVatTax: number           = 0
    let totalVatWithheld: number      = 0

    const listWithholding: WithholdingDto[] = []

    documents.forEach((document, index) => {
      const operationNumber   = index + 1
      const transactionType   = document.typeDocument?.extra1
      const debitNoteNumber   = null //document.typeDocument?.extra2
      const creditNoteNumber  = null //document.typeDocument?.extra3
      const taxType           = document.taxType?.extra1

      const data = {
        operationNumber,
        invoiceDate: formatDate(document.documentDate),
        invoiceNumber: document.documentNumber,
        invoiceControlNumber: document.documentControlNumber ?? '00-00000000',
        debitNoteNumber,
        creditNoteNumber,
        transactionType,
        affectedInvoiceNumber: rpad(document.affectedDocumentNumber, 20),
        totalPurchasesIncludingVat: document.documentAmount,
        purchasesWithoutVatCredit: document.exemptTaxAmount,
        taxableIncome: document.taxableBase,
        alicuota: `${taxType}%`,
        vatTax: document.taxAmount,
        vatWithheld: document.withheldAmount
      }

      totalPurchasesVat     += Number(data.totalPurchasesIncludingVat)
      totalPurchasesCredit  += Number(data.purchasesWithoutVatCredit)
      totalTaxableBase      += Number(data.taxableIncome)
      totalVatTax           += Number(data.vatTax)
      totalVatWithheld      += Number(data.vatWithheld)

      listWithholding.push(data)
    })

    return {
      withHolding: listWithholding,
      totalPurchasesVat,
      totalPurchasesCredit,
      totalTaxableBase,
      totalVatTax,
      totalVatWithheld
    }
  }
}