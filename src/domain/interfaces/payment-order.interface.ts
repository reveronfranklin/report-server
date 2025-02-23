export interface IPaymentOrder {
  CODIGO_ORDEN_PAGO: number;
  ANO: number | null;
  CODIGO_COMPROMISO: number | null;
  CODIGO_ORDEN_COMPRA: number | null;
  CODIGO_CONTRATO: number | null;
  CODIGO_PROVEEDOR: number;
  NUMERO_ORDEN_PAGO: string;
  REFERENCIA_ORDEN_PAGO: string;
  FECHA_ORDEN_PAGO: Date;
  TIPO_ORDEN_PAGO_ID: number;
  FECHA_PLAZO_DESDE: Date;
  FECHA_PLAZO_HASTA: Date;
  CANTIDAD_PAGO: number | null;
  NUMERO_PAGO: number | null;
  FRECUENCIA_PAGO_ID: number | null;
  TIPO_PAGO_ID: number | null;
  NUMERO_VALUACION: number | null;
  STATUS: string | null;
  MOTIVO: string | null;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: number;
  FECHA_INS: Date;
  USUARIO_UPD: number;
  FECHA_UPD: Date;
  CODIGO_EMPRESA: number;
  CODIGO_PRESUPUESTO: number;
  EXTRA4: string | null;
  EXTRA5: string | null;
  EXTRA6: string | null;
  EXTRA7: string | null;
  EXTRA8: string | null;
  EXTRA9: string | null;
  EXTRA10: string | null;
  EXTRA11: string | null;
  EXTRA12: string | null;
  EXTRA13: string | null;
  EXTRA14: string | null;
  EXTRA15: string | null;
  NUMERO_COMPROBANTE: number | null;
  FECHA_COMPROBANTE: Date | null;
  NUMERO_COMPROBANTE2: number | null;
  NUMERO_COMPROBANTE3: number | null;
  NUMERO_COMPROBANTE4: number | null;
  SEARCH_TEXT: string | null;
  MONTO_LETRAS: string | null;
  TITULO_REPORTE: string | null;
  NOMBRE_AGENTE_RETENCION: string | null;
  TELEFONO_AGENTE_RETENCION: string | null;
  RIF_AGENTE_RETENCION: string | null;
  DIRECCION_AGENTE_RETENCION: string | null;
}