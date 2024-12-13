export interface IWithholding {
  codigoRetencionOp: string;
  codigoOrdenPago: string;
  tipoRetencionId: string;
  codigoRetencion: string;
  porRetencion: number;
  montoRetencion: number;
  extra1: string | null;
  extra2: string | null;
  extra3: string | null;
  usuarioIns: string;
  fechaIns: Date;
  usuarioUpd: string | null;
  fechaUpd: Date | null;
  codigoEmpresa: string;
  codigoPresupuesto: string;
  extra4: string | null;
  baseImponible: number;
}