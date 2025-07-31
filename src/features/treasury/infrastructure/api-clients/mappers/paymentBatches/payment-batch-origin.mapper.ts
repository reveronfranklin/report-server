import { PaymentBatchEntity } from '../../../../domain/entities/payment-batches.entity';
import { IPaymentBatchOriginRaw } from '../interfaces/payment-batch-origin-raw.interface';

export class PaymentBatchOriginMapper {
  public static toDomainEntity(raw: IPaymentBatchOriginRaw): PaymentBatchEntity {
    return new PaymentBatchEntity({
      accountNumber: raw.noCuenta,
      amount: raw.monto,
      checkCode: raw.codigoCheque,
      checkDate: new Date(raw.fechaCheque),
      checkNumber: raw.numeroCheque,
      name: raw.nombre,
      opIcpPucAmount: raw.montoOpIcpPuc,
      opIcpPucDetail: raw.detalleOpIcpPuc,
      paymentBatchCode: raw.codigoLotePago,
      payToTheOrderOf: raw.pagarALaOrdenDe,
      reason: raw.motivo,
      reportTitle: raw.tituloReporte || null,
      taxWithholdingAmount: raw.montoImpRet
    })
  }
}