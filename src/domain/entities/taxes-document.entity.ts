import { TaxesDocumentInterface } from '../interfaces/taxes-document.interface';

export class TaxesDocumentEntity implements TaxesDocumentInterface {
  constructor(
    public CODIGO_IMPUESTO_DOCUMENTO_OP: string,
    public CODIGO_DOCUMENTO_OP: string,
    public CODIGO_RETENCION: string,
    public TIPO_RETENCION_ID: string,
    public TIPO_IMPUESTO_ID: string,
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
    public CODIGO_EMPRESA: string
  ) {}
}