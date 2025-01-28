export interface TaxesDocumentInterface {
  CODIGO_IMPUESTO_DOCUMENTO_OP: string;
  CODIGO_DOCUMENTO_OP: string;
  CODIGO_RETENCION: string;
  TIPO_RETENCION_ID: string;
  TIPO_IMPUESTO_ID: string;
  PERIODO_IMPOSITIVO: string;
  BASE_IMPONIBLE: number;
  MONTO_IMPUESTO: number;
  MONTO_IMPUESTO_EXENTO: number;
  MONTO_RETENIDO: number;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: string;
  FECHA_INS: Date;
  USUARIO_UPD: string | null;
  FECHA_UPD: Date | null;
  CODIGO_EMPRESA: string;
}