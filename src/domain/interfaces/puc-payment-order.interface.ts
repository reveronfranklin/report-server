export interface IPucPaymentOrder {
  CODIGO_PUC_ORDEN_PAGO: number;
  CODIGO_ORDEN_PAGO: number;
  CODIGO_PUC_COMPROMISO: number | null;
  CODIGO_ICP: string;
  CODIGO_PUC: string;
  FINANCIADO_ID: number;
  CODIGO_FINANCIADO: string;
  CODIGO_SALDO: number;
  MONTO: number;
  MONTO_PAGADO: number;
  MONTO_ANULADO: number;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: number;
  FECHA_INS: Date;
  USUARIO_UPD: number;
  FECHA_UPD: Date;
  CODIGO_EMPRESA: number;
  CODIGO_COMPROMISO_OP: number | null;
  CODIGO_PRESUPUESTO: number;
  MONTO_COMPROMISO: number;
}