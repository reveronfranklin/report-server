import { IWithholding } from '../interfaces/withholding.interface';

export class WithholdingEntity implements IWithholding {
  constructor(
    public CODIGO_RETENCION: string,
    public TIPO_RETENCION_ID: string,
    public CONCEPTO_PAGO: string,
    public TIPO_PERSONA_ID: string,
    public BASE_IMPONIBLE: number,
    public POR_RETENCION: number,
    public MONTO_RETENCION: number,
    public FECHA_INI: Date,
    public FECHA_FIN: Date,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: string,
    public FECHA_INS: Date,
    public USUARIO_UPD: string | null,
    public FECHA_UPD: Date | null,
    public CODIGO_EMPRESA: string
  ) {}
}