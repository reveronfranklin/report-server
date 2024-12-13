export interface IPreCommitment {
  CODIGO_COMPROMISO: number;
  ANO: number;
  CODIGO_SOLICITUD: number;
  NUMERO_COMPROMISO: string;
  FECHA_COMPROMISO: Date;
  CODIGO_PROVEEDOR: number;
  FECHA_ENTREGA: Date;
  CODIGO_DIR_ENTREGA: number;
  TIPO_PAGO_ID: number;
  MOTIVO: string;
  STATUS: string;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: number;
  FECHA_INS: Date;
  USUARIO_UPD: number;
  FECHA_UPD: Date;
  CODIGO_EMPRESA: number;
  CODIGO_PRESUPUESTO: number;
  TIPO_RENGLON_ID: number;
  NUMERO_ORDEN: string;
  SEARCH_TEXT: string;
  MONTO_LETRAS: string;
  FIRMANTE: string;
}