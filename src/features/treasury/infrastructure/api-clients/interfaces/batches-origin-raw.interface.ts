export interface IBatchesOriginRaw {
  CODIGO_LOTE_PAGO:     number;
  CODIGO_PAGO:          number;
  DETALLE_OP_ICP_PUC:   string;
  FECHA_PAGO:           Date | string;
  MONTO_IMP_RET:        number;
  MONTO_OP_ICP_PUC:     number;
  MONTO:                number;
  MOTIVO:               string;
  NO_CUENTA:            string;
  NOMBRE:               string;
  NUMERO_PAGO:          number;
  PAGAR_A_LA_ORDEN_DE:  string;
  TITULO_REPORTE:       string;
}