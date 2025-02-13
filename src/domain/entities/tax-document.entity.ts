import { ITaxDocument } from '../interfaces/tax-document.interface';
import { WithholdingEntity } from './withholding.entity';

export class TaxDocumentEntity implements ITaxDocument {
  constructor(
    public CODIGO_IMPUESTO_DOCUMENTO_OP: number,
    public CODIGO_DOCUMENTO_OP: number,
    public CODIGO_RETENCION: number,
    public TIPO_RETENCION_ID: number,
    public TIPO_IMPUESTO_ID: number,
    public PERIODO_IMPOSITIVO: string,
    public BASE_IMPONIBLE: number,
    public MONTO_IMPUESTO: number,
    public MONTO_IMPUESTO_EXENTO: number,
    public MONTO_RETENIDO: number,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: string,
    public FECHA_INS: Date,
    public USUARIO_UPD: string | null,
    public FECHA_UPD: Date | null,
    public CODIGO_EMPRESA: number,

    public WITHHOLDING?: WithholdingEntity
  ) {}
}