export interface IBeneficiary {
  CODIGO_CONTACTO_PROVEEDOR: number;
  CODIGO_PROVEEDOR: number;
  NOMBRE: string;
  APELLIDO: string;
  IDENTIFICACION_ID: number;
  IDENTIFICACION: string;
  SEXO: string;
  TIPO_CONTACTO_ID: number;
  PRINCIPAL: boolean;
  EXTRA1: string | null;
  EXTRA2: string | null;
  EXTRA3: string | null;
  USUARIO_INS: number;
  FECHA_INS: Date;
  USUARIO_UPD: number;
  FECHA_UPD: Date;
  CODIGO_EMPRESA: number;
  CODIGO_PRESUPUESTO: number | null;
}