import { IDocument } from '../interfaces/document.interface';

export class DocumentEntity implements IDocument {
  constructor(
    public CODIGO_DOCUMENTO_OP: number,
    public CODIGO_ORDEN_PAGO: number,
    public FECHA_COMPROBANTE: Date,
    public PERIODO_IMPOSITIVO: string,
    public TIPO_OPERACION_ID: string,
    public TIPO_DOCUMENTO_ID: string,
    public FECHA_DOCUMENTO: Date,
    public NUMERO_DOCUMENTO: string,
    public NUMERO_CONTROL_DOCUMENTO: string,
    public MONTO_DOCUMENTO: number,
    public BASE_IMPONIBLE: number,
    public MONTO_IMPUESTO: number,
    public NUMERO_DOCUMENTO_AFECTADO: string,
    public TIPO_TRANSACCION_ID: string,
    public TIPO_IMPUESTO_ID: string,
    public MONTO_IMPUESTO_EXENTO: number,
    public MONTO_RETENIDO: number,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: string,
    public FECHA_INS: Date,
    public USUARIO_UPD: string | null,
    public FECHA_UPD: Date | null,
    public CODIGO_EMPRESA: string,
    public CODIGO_PRESUPUESTO: string,
    public NUMERO_EXPEDIENTE: string,
    public ESTATUS_FISCO_ID: string
  ) {}
}