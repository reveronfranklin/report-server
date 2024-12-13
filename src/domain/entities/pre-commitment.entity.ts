import { IPreCommitment } from '../interfaces/pre-commitment.interface';

export class PreCommitmentEntity implements IPreCommitment {
  constructor(
    public CODIGO_COMPROMISO: number,
    public ANO: number,
    public CODIGO_SOLICITUD: number,
    public NUMERO_COMPROMISO: string,
    public FECHA_COMPROMISO: Date,
    public CODIGO_PROVEEDOR: number,
    public FECHA_ENTREGA: Date,
    public CODIGO_DIR_ENTREGA: number,
    public TIPO_PAGO_ID: number,
    public MOTIVO: string,
    public STATUS: string,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: number,
    public FECHA_INS: Date,
    public USUARIO_UPD: number,
    public FECHA_UPD: Date,
    public CODIGO_EMPRESA: number,
    public CODIGO_PRESUPUESTO: number,
    public TIPO_RENGLON_ID: number,
    public NUMERO_ORDEN: string,
    public SEARCH_TEXT: string,
    public MONTO_LETRAS: string,
    public FIRMANTE: string
  ) {}
}