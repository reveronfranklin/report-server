export interface IWithholding {
  CODIGO_RETENCION: number;
  TIPO_RETENCION_ID: number;
  CONCEPTO_PAGO: string;
  TIPO_PERSONA_ID: number;
  BASE_IMPONIBLE: number;
  POR_RETENCION: number;
  MONTO_RETENCION: number;
  FECHA_INI: Date;
  FECHA_FIN: Date;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: string;
  FECHA_INS: Date;
  USUARIO_UPD: string | null;
  FECHA_UPD: Date | null;
  CODIGO_EMPRESA: string;
}