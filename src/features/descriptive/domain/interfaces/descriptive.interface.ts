export interface IDescriptive {
  DESCRIPCION_ID: number;
  DESCRIPCION_FK_ID: number | null;
  TITULO_ID: number;
  DESCRIPCION: string;
  CODIGO: string;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: number;
  FECHA_INS: Date;
  USUARIO_UPD: number;
  FECHA_UPD: Date;
  CODIGO_EMPRESA: number;
  EXTRA4: string | null;
}