import { IPaymentBatches } from '../interfaces/payment-batches.interface';

export class PaymentBatchEntity implements IPaymentBatches {
  public accountNumber: string        = null;
  public amount: number               = null;
  public checkCode: number            = null;
  public checkDate: Date              = null;
  public checkNumber: number          = null;
  public name: string                 = null;
  public opIcpPucAmount: number       = null;
  public opIcpPucDetail: string       = null;
  public paymentBatchCode: number     = null;
  public payToTheOrderOf: string      = null;
  public reason: string               = null;
  public taxWithholdingAmount: number = null;

  constructor(paymentBatchOrigin: any) {
    this.accountNumber        = paymentBatchOrigin.noCuenta;
    this.amount               = paymentBatchOrigin.monto;
    this.checkCode            = paymentBatchOrigin.codigoCheque;
    this.checkDate            = paymentBatchOrigin.fechaCheque;
    this.checkNumber          = paymentBatchOrigin.numeroCheque;
    this.name                 = paymentBatchOrigin.nombre;
    this.opIcpPucAmount       = paymentBatchOrigin.montoOpIcpPuc;
    this.opIcpPucDetail       = paymentBatchOrigin.detalleOpIcpPuc;
    this.paymentBatchCode     = paymentBatchOrigin.codigoLotePago;
    this.payToTheOrderOf      = paymentBatchOrigin.pagarALaOrdenDe;
    this.reason               = paymentBatchOrigin.motivo;
    this.taxWithholdingAmount = paymentBatchOrigin.montoImpRet;
  }
}