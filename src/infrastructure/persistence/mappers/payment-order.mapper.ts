import { PaymentOrderModel } from '../models/payment-order.model';
import { PaymentOrderEntity } from '../../../domain/entities/payment-order.entity';
import { PucPaymentOrderEntity } from '../../../domain/entities/puc-payment-order.entity';
import { BalanceEntity } from '../../../domain/entities/balance.entity';
import { WithholdingOpEntity } from '../../../domain/entities/withholding-op.entity';
import { DocumentEntity } from '../../../domain/entities/document.entity';

export class PaymentOrderMapper {
  static toDomain(paymentOrderModel: PaymentOrderModel): PaymentOrderEntity {
    return new PaymentOrderEntity(
      paymentOrderModel?.amountInWords,
      paymentOrderModel?.deadlineEndDate,
      paymentOrderModel?.deadlineStartDate,
      paymentOrderModel?.insertionDate,
      paymentOrderModel?.paymentAmount,
      paymentOrderModel?.paymentFrequencyId,
      paymentOrderModel?.paymentOrderCode,
      paymentOrderModel?.paymentOrderDate,
      paymentOrderModel?.paymentOrderNumber,
      paymentOrderModel?.paymentOrderTypeId,
      paymentOrderModel?.reason,
      paymentOrderModel?.receiptNumber,
      paymentOrderModel?.reportTitle,
      paymentOrderModel?.status,
      paymentOrderModel?.supplierCode,
      paymentOrderModel?.withholdingAgentAddress,
      paymentOrderModel?.withholdingAgentName,
      paymentOrderModel?.withholdingAgentPhone,
      paymentOrderModel?.withholdingAgentRIF,

      /* Relations */
      paymentOrderModel?.paymentOrderType?.get({ plain: true }),
      paymentOrderModel?.paymentFrequency?.get({ plain: true }),
      paymentOrderModel?.supplier?.get({ plain: true }),
      paymentOrderModel?.commitment?.get({ plain: true }),

      paymentOrderModel?.pucPaymentOrders?.map(pucOrder => new PucPaymentOrderEntity(
        pucOrder.amount,
        pucOrder.balanceCode,
        pucOrder.paymentOrderCode,
        pucOrder.pucPaymentOrderCode,
        pucOrder.balance ? new BalanceEntity(
          pucOrder.balance.balanceCode,
          pucOrder.balance.financedDescription,
          pucOrder.balance.icpCodeConcat,
          pucOrder.balance.pucCodeConcat,
          pucOrder.balance.pucDenomination,
          pucOrder.balance.year
        ) : null
      )) || [],

      paymentOrderModel?.withholdingOps?.map(withholding => new WithholdingOpEntity(
        withholding.byRetention,
        withholding.opRetentionCode,
        withholding.paymentOrderCode,
        withholding.retentionAmount,
        withholding.retentionCode,
        withholding.taxableBase,
        withholding.withholdingTypeId,
        withholding?.retentionType?.get({ plain: true })
      )) || [],

      paymentOrderModel?.documents?.map(document => new DocumentEntity(
        document?.affectedDocumentNumber,
        document?.documentAmount,
        document?.documentControlNumber,
        document?.documentDate,
        document?.documentNumber,
        document?.documentOperationCode,
        document?.documentTypeId,
        document?.exemptTaxAmount,
        document?.operationTypeId,
        document?.paymentOrderCode,
        document?.taxableBase,
        document?.taxAmount,
        document?.taxTypeId,
        document?.transactionTypeId,
        document?.withheldAmount,
        document?.taxDocument?.get({ plain: true }),
        document?.typeDocument?.get({ plain: true }),
        document?.taxType?.get({ plain: true })
      )) || []
    )
  }
}