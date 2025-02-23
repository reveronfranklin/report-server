import { PaymentOrderModel } from '../models/payment-order.model';
import { PaymentOrderEntity } from '../../../domain/entities/payment-order.entity';
import { PucPaymentOrderEntity } from '../../../domain/entities/puc-payment-order.entity';
import { BalanceEntity } from '../../../domain/entities/balance.entity';
import { WithholdingOpEntity } from '../../../domain/entities/withholding-op.entity';
import { DocumentEntity } from '../../../domain/entities/document.entity';

export class PaymentOrderMapper {
  static toDomain(paymentOrderModel: PaymentOrderModel): PaymentOrderEntity {
    return new PaymentOrderEntity(
      paymentOrderModel?.CODIGO_ORDEN_PAGO,
      paymentOrderModel?.ANO,
      paymentOrderModel?.CODIGO_COMPROMISO,
      paymentOrderModel?.CODIGO_ORDEN_COMPRA,
      paymentOrderModel?.CODIGO_CONTRATO,
      paymentOrderModel?.CODIGO_PROVEEDOR,
      paymentOrderModel?.NUMERO_ORDEN_PAGO,
      paymentOrderModel?.REFERENCIA_ORDEN_PAGO,
      paymentOrderModel?.FECHA_ORDEN_PAGO,
      paymentOrderModel?.TIPO_ORDEN_PAGO_ID,
      paymentOrderModel?.FECHA_PLAZO_DESDE,
      paymentOrderModel?.FECHA_PLAZO_HASTA,
      paymentOrderModel?.CANTIDAD_PAGO,
      paymentOrderModel?.NUMERO_PAGO,
      paymentOrderModel?.FRECUENCIA_PAGO_ID,
      paymentOrderModel?.TIPO_PAGO_ID,
      paymentOrderModel?.NUMERO_VALUACION,
      paymentOrderModel?.STATUS,
      paymentOrderModel?.MOTIVO,
      paymentOrderModel?.EXTRA1,
      paymentOrderModel?.EXTRA2,
      paymentOrderModel?.EXTRA3,
      paymentOrderModel?.USUARIO_INS,
      paymentOrderModel?.FECHA_INS,
      paymentOrderModel?.USUARIO_UPD,
      paymentOrderModel?.FECHA_UPD,
      paymentOrderModel?.CODIGO_EMPRESA,
      paymentOrderModel?.CODIGO_PRESUPUESTO,
      paymentOrderModel?.EXTRA4,
      paymentOrderModel?.EXTRA5,
      paymentOrderModel?.EXTRA6,
      paymentOrderModel?.EXTRA7,
      paymentOrderModel?.EXTRA8,
      paymentOrderModel?.EXTRA9,
      paymentOrderModel?.EXTRA10,
      paymentOrderModel?.EXTRA11,
      paymentOrderModel?.EXTRA12,
      paymentOrderModel?.EXTRA13,
      paymentOrderModel?.EXTRA14,
      paymentOrderModel?.EXTRA15,
      paymentOrderModel?.NUMERO_COMPROBANTE,
      paymentOrderModel?.FECHA_COMPROBANTE,
      paymentOrderModel?.NUMERO_COMPROBANTE2,
      paymentOrderModel?.NUMERO_COMPROBANTE3,
      paymentOrderModel?.NUMERO_COMPROBANTE4,
      paymentOrderModel?.SEARCH_TEXT,
      paymentOrderModel?.MONTO_LETRAS,
      paymentOrderModel?.TITULO_REPORTE,
      paymentOrderModel?.NOMBRE_AGENTE_RETENCION,
      paymentOrderModel?.TELEFONO_AGENTE_RETENCION,
      paymentOrderModel?.RIF_AGENTE_RETENCION,
      paymentOrderModel?.DIRECCION_AGENTE_RETENCION,

      /* Relations */
      paymentOrderModel?.TIPO_ORDEN_PAGO?.get({ plain: true }),
      paymentOrderModel?.FRECUENCIA_PAGO?.get({ plain: true }),
      paymentOrderModel?.PROVEEDOR?.get({ plain: true }),
      paymentOrderModel?.COMMITMENT?.get({ plain: true }),

      paymentOrderModel?.PUC_PAYMENT_ORDERS?.map(pucOrder => new PucPaymentOrderEntity(
        pucOrder.CODIGO_PUC_ORDEN_PAGO,
        pucOrder.CODIGO_ORDEN_PAGO,
        pucOrder.CODIGO_PUC_COMPROMISO,
        pucOrder.CODIGO_ICP,
        pucOrder.CODIGO_PUC,
        pucOrder.FINANCIADO_ID,
        pucOrder.CODIGO_FINANCIADO,
        pucOrder.CODIGO_SALDO,
        pucOrder.MONTO,
        pucOrder.MONTO_PAGADO,
        pucOrder.MONTO_ANULADO,
        pucOrder.EXTRA1,
        pucOrder.EXTRA2,
        pucOrder.EXTRA3,
        pucOrder.USUARIO_INS,
        pucOrder.FECHA_INS,
        pucOrder.USUARIO_UPD,
        pucOrder.FECHA_UPD,
        pucOrder.CODIGO_EMPRESA,
        pucOrder.CODIGO_COMPROMISO_OP,
        pucOrder.CODIGO_PRESUPUESTO,
        pucOrder.MONTO_COMPROMISO,
        pucOrder.BALANCE ? new BalanceEntity(
          pucOrder.BALANCE.CODIGO_SALDO,
          pucOrder.BALANCE.ANO,
          pucOrder.BALANCE.FINANCIADO_ID,
          pucOrder.BALANCE.CODIGO_FINANCIADO,
          pucOrder.BALANCE.DESCRIPCION_FINANCIADO,
          pucOrder.BALANCE.CODIGO_ICP,
          pucOrder.BALANCE.CODIGO_SECTOR,
          pucOrder.BALANCE.CODIGO_PROGRAMA,
          pucOrder.BALANCE.CODIGO_SUBPROGRAMA,
          pucOrder.BALANCE.CODIGO_PROYECTO,
          pucOrder.BALANCE.CODIGO_ACTIVIDAD,
          pucOrder.BALANCE.CODIGO_OFICINA,
          pucOrder.BALANCE.CODIGO_ICP_CONCAT,
          pucOrder.BALANCE.DENOMINACION_ICP,
          pucOrder.BALANCE.UNIDAD_EJECUTORA,
          pucOrder.BALANCE.CODIGO_PUC,
          pucOrder.BALANCE.CODIGO_GRUPO,
          pucOrder.BALANCE.CODIGO_PARTIDA,
          pucOrder.BALANCE.CODIGO_GENERICA,
          pucOrder.BALANCE.CODIGO_ESPECIFICA,
          pucOrder.BALANCE.CODIGO_SUBESPECIFICA,
          pucOrder.BALANCE.CODIGO_NIVEL5,
          pucOrder.BALANCE.CODIGO_PUC_CONCAT,
          pucOrder.BALANCE.DENOMINACION_PUC,
          pucOrder.BALANCE.PRESUPUESTADO,
          pucOrder.BALANCE.ASIGNACION,
          pucOrder.BALANCE.BLOQUEADO,
          pucOrder.BALANCE.MODIFICADO,
          pucOrder.BALANCE.AJUSTADO,
          pucOrder.BALANCE.VIGENTE,
          pucOrder.BALANCE.COMPROMETIDO,
          pucOrder.BALANCE.POR_COMPROMETIDO,
          pucOrder.BALANCE.DISPONIBLE,
          pucOrder.BALANCE.CAUSADO,
          pucOrder.BALANCE.POR_CAUSADO,
          pucOrder.BALANCE.PAGADO,
          pucOrder.BALANCE.POR_PAGADO,
          pucOrder.BALANCE.CODIGO_EMPRESA,
          pucOrder.BALANCE.CODIGO_PRESUPUESTO,
          pucOrder.BALANCE.FECHA_SOLICITUD,
          pucOrder.BALANCE.DESCRIPTIVA_FINANCIADO,
          pucOrder.BALANCE.SEARCH_TEXT
        ) : null
      )) || [],

      paymentOrderModel?.WITHHOLDINGS?.map(withholding => new WithholdingOpEntity(
        withholding.codigoRetencionOp,
        withholding.codigoOrdenPago,
        withholding.tipoRetencionId,
        withholding.codigoRetencion,
        withholding.porRetencion,
        withholding.montoRetencion,
        withholding.extra1,
        withholding.extra2,
        withholding.extra3,
        withholding.usuarioIns,
        withholding.fechaIns,
        withholding.usuarioUpd,
        withholding.fechaUpd,
        withholding.codigoEmpresa,
        withholding.codigoPresupuesto,
        withholding.extra4,
        withholding.baseImponible,
        withholding?.DESCRIPCION?.get({ plain: true })
      )) || [],

      paymentOrderModel?.DOCUMENTS?.map(document => new DocumentEntity(
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