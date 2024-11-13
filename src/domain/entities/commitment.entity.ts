import { ICommitment } from '../interfaces/commitment.interface';

export class Commitment implements ICommitment {
  constructor(
    public CODIGO_COMPROMISO_OP: number,
    public ORIGEN_COMPROMISO_ID: number,
    public CODIGO_IDENTIFICADOR: string,
    public CODIGO_ORDEN_PAGO: number | null,
    public CODIGO_PROVEEDOR: number,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: number,
    public FECHA_INS: Date,
    public USUARIO_UPD: number,
    public FECHA_UPD: Date,
    public CODIGO_EMPRESA: number,
    public CODIGO_PRESUPUESTO: number,
    public CODIGO_VAL_CONTRATO: number | null
  ) {}
}