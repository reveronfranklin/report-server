export interface ICommitment {
  CODIGO_COMPROMISO_OP: number;
  ORIGEN_COMPROMISO_ID: number;
  CODIGO_IDENTIFICADOR: string;
  CODIGO_ORDEN_PAGO: number | null;
  CODIGO_PROVEEDOR: number;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: number;
  FECHA_INS: Date;
  USUARIO_UPD: number;
  FECHA_UPD: Date;
  CODIGO_EMPRESA: number;
  CODIGO_PRESUPUESTO: number;
  CODIGO_VAL_CONTRATO: number | null;
}