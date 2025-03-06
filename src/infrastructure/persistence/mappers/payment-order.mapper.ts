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
        document?.CODIGO_DOCUMENTO_OP,
        document?.CODIGO_ORDEN_PAGO,
        document?.FECHA_COMPROBANTE,
        document?.PERIODO_IMPOSITIVO,
        document?.TIPO_OPERACION_ID,
        document?.TIPO_DOCUMENTO_ID,
        document?.FECHA_DOCUMENTO,
        document?.NUMERO_DOCUMENTO,
        document?.NUMERO_CONTROL_DOCUMENTO,
        document?.MONTO_DOCUMENTO,
        document?.BASE_IMPONIBLE,
        document?.MONTO_IMPUESTO,
        document?.NUMERO_DOCUMENTO_AFECTADO,
        document?.TIPO_TRANSACCION_ID,
        document?.TIPO_IMPUESTO_ID,
        document?.MONTO_IMPUESTO_EXENTO,
        document?.MONTO_RETENIDO,
        document?.EXTRA1,
        document?.EXTRA2,
        document?.EXTRA3,
        document?.USUARIO_INS,
        document?.FECHA_INS,
        document?.USUARIO_UPD,
        document?.FECHA_UPD,
        document?.CODIGO_EMPRESA,
        document?.CODIGO_PRESUPUESTO,
        document?.NUMERO_EXPEDIENTE,
        document?.ESTATUS_FISCO_ID,
        document?.TAX_DOCUMENT?.get({ plain: true }),
        document?.TYPE_DOCUMENT?.get({ plain: true }),
        document?.TAX_TYPE?.get({ plain: true })
      )) || []
    )
  }
}