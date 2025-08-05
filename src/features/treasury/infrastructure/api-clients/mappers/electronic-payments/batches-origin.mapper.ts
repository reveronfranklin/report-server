import { PaymentBatchEntity } from '../../../../domain/entities/payment-batches.entity';
import { IBatchesOriginRaw } from '../interfaces/batches-origin-raw.interface';

export class BatchesOriginMapper {
  public static toDomainEntity(raw: IBatchesOriginRaw): PaymentBatchEntity {
    return new PaymentBatchEntity({
      accountNumber: raw.NO_CUENTA,
      amount: raw.MONTO,
      checkCode: raw.CODIGO_PAGO,
      checkDate: new Date(raw.FECHA_PAGO),
      checkNumber: raw.NUMERO_PAGO,
      name: raw.NOMBRE,
      opIcpPucAmount: raw.MONTO_OP_ICP_PUC,
      opIcpPucDetail: raw.DETALLE_OP_ICP_PUC,
      paymentBatchCode: raw.CODIGO_LOTE_PAGO,
      payToTheOrderOf: raw.PAGAR_A_LA_ORDEN_DE,
      reason: raw.MOTIVO,
      reportTitle: raw.TITULO_REPORTE || null,
      taxWithholdingAmount: raw.MONTO_IMP_RET
    })
  }
}