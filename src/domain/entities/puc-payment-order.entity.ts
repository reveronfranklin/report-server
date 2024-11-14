import { IPucPaymentOrder } from '../interfaces/puc-payment-order.interface';

export class PucPaymentOrderEntity implements IPucPaymentOrder {
  constructor(
    public CODIGO_PUC_ORDEN_PAGO: number,
    public CODIGO_ORDEN_PAGO: number,
    public CODIGO_PUC_COMPROMISO: number | null,
    public CODIGO_ICP: string,
    public CODIGO_PUC: string,
    public FINANCIADO_ID: number,
    public CODIGO_FINANCIADO: string,
    public CODIGO_SALDO: number,
    public MONTO: number,
    public MONTO_PAGADO: number,
    public MONTO_ANULADO: number,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: number,
    public FECHA_INS: Date,
    public USUARIO_UPD: number,
    public FECHA_UPD: Date,
    public CODIGO_EMPRESA: number,
    public CODIGO_COMPROMISO_OP: number | null,
    public CODIGO_PRESUPUESTO: number,
    public MONTO_COMPROMISO: number
  ) {}
}