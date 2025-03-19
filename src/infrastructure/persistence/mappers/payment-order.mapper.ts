/* Imports */
import { PaymentOrderModel } from '../models/payment-order.model';
import { PaymentOrderEntity } from '../../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/paymentOrder/report-scheme.dto';
import { ReportHeaderDto } from '../../../application/dtos/paymentOrder/report-header.dto';
import { ReportSubHeaderDto } from '../../../application/dtos/paymentOrder/report-sub-header.dto';
import { ReportBodyDto } from '../../../application/dtos/paymentOrder/report-body.dto';
import { FundsDto } from '../../../application/dtos/paymentOrder/funds.dto';
import { WithholdingDto } from '../../../application/dtos/paymentOrder/withholding.dto';

/* Utils */
import { isValidDate, formatDate, formatRIF } from '../../../shared/utils';

export class PaymentOrderMapper {
  static toDomain(paymentOrderModel: PaymentOrderModel): ReportSchemeDto {
    const status = (paymentOrderModel.status === 'AP') ?  'approved' : 'annulled'

    const reportScheme: ReportSchemeDto = {
      name: 'payment-order-report',
      status: status,
      header: this.mapToReportHeader(paymentOrderModel),
      subHeader: this.mapToReportSubHeader(paymentOrderModel),
      body: this.mapToReportBody(paymentOrderModel)
    }

    return reportScheme
  }

  private static mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
    const paymentOrderType  = order.paymentOrderType ?? null
    const commitment        = order?.commitment ?? null
    const preCommitment     = commitment?.preCommitment ?? null
    const dateOrderPayment  = formatDate(order.paymentOrderDate)
    const dateCommitment    = formatDate(preCommitment?.commitmentDate)

    return {
      description: paymentOrderType?.description,
      commitmentNumber: preCommitment?.commitmentNumber ?? order?.commitmentNumber,
      title: order.reportTitle,
      paymentOrderNumber: order.paymentOrderNumber,
      paymentOrderDate: dateOrderPayment,
      commitmentDate: dateCommitment
    }
  }

  private static mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const methodOfPayment   = order.paymentFrequency ?? null
    const supplier          = order.supplier ?? null
    const beneficiary       = supplier?.beneficiaries[0] ?? null

    const dateSince = isValidDate(order.deadlineStartDate) ? order.deadlineStartDate : null
    const dateUntil = isValidDate(order.deadlineEndDate) ? order.deadlineEndDate : null

    return {
      supplierName: supplier?.providerName,
      supplierIdCard: supplier?.identificationCard,
      supplierRIF: formatRIF(supplier?.taxId),
      beneficiaryName: beneficiary?.firstName,
      beneficiaryLastName: beneficiary?.lastName,
      beneficiaryIdCard: beneficiary?.identification,
      deadlineStartDate: dateSince,
      deadlineEndDate: dateUntil,
      amountInWords: order?.amountInWords ?? null,
      paymentMethod: methodOfPayment?.description,
      paymentAmount: order.paymentAmount
    }
  }

  private static mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    let total: number             = 0
    let totalRetenciones: number  = 0
    let specificTitle: string     = ''

    const listPucOrder: FundsDto[]          = []
    const listWithholding: WithholdingDto[] = []

    const pucOrders     = order?.pucPaymentOrders ?? []
    const withholdings  = order?.withholdingOps ?? []

    pucOrders.forEach((pucOrder) => {
      const balance = pucOrder?.balance ?? null
      specificTitle = balance?.pucDenomination ?? ''

      const data = {
        year: balance?.year,
        financedDescription: balance?.financedDescription,
        icpCodeConcat: balance?.icpCodeConcat,
        pucCodeConcat: balance?.pucCodeConcat,
        amount: pucOrder.amount,
        periodic: (pucOrder.amount / order.paymentAmount)
      }

      total += Number(pucOrder.amount)

      listPucOrder.push(data)
    })

    withholdings.forEach((withholding) => {
      const data = {
        description:`${withholding.byRetention ?? ''}% ${withholding?.retentionType?.description ?? ''}`,
        withheldAmount: withholding.retentionAmount ?? 0
      }

      totalRetenciones += Number(withholding.retentionAmount)

      listWithholding.push(data)
    })

    const body = {
      funds: listPucOrder,
      withholding: listWithholding,
      totalPaymentOrder: total,
      amountToPay: (total - totalRetenciones),
      specificTitle: specificTitle,
      reason: order.reason.trim()
    }

    return body
  }
}