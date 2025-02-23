import { IPaymentOrder } from '../interfaces/payment-order.interface';
import { DescriptiveEntity } from './descriptive.entity'
import { SupplierEntity } from './supplier.entity'
import { PucPaymentOrderEntity } from './puc-payment-order.entity';
import { CommitmentEntity} from './commitment.entity';
import { WithholdingOpEntity } from './withholding-op.entity';
import { DocumentEntity } from './document.entity';

export class PaymentOrderEntity implements IPaymentOrder {
  constructor(
    public CODIGO_ORDEN_PAGO: number,
    public ANO: number | null,
    public CODIGO_COMPROMISO: number | null,
    public CODIGO_ORDEN_COMPRA: number | null,
    public CODIGO_CONTRATO: number | null,
    public CODIGO_PROVEEDOR: number,
    public NUMERO_ORDEN_PAGO: string,
    public REFERENCIA_ORDEN_PAGO: string,
    public FECHA_ORDEN_PAGO: Date,
    public TIPO_ORDEN_PAGO_ID: number,
    public FECHA_PLAZO_DESDE: Date,
    public FECHA_PLAZO_HASTA: Date,
    public CANTIDAD_PAGO: number | null,
    public NUMERO_PAGO: number | null,
    public FRECUENCIA_PAGO_ID: number | null,
    public TIPO_PAGO_ID: number | null,
    public NUMERO_VALUACION: number | null,
    public STATUS: string | null,
    public MOTIVO: string | null,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: number,
    public FECHA_INS: Date,
    public USUARIO_UPD: number,
    public FECHA_UPD: Date,
    public CODIGO_EMPRESA: number,
    public CODIGO_PRESUPUESTO: number,
    public EXTRA4: string | null,
    public EXTRA5: string | null,
    public EXTRA6: string | null,
    public EXTRA7: string | null,
    public EXTRA8: string | null,
    public EXTRA9: string | null,
    public EXTRA10: string | null,
    public EXTRA11: string | null,
    public EXTRA12: string | null,
    public EXTRA13: string | null,
    public EXTRA14: string | null,
    public EXTRA15: string | null,
    public NUMERO_COMPROBANTE: number | null,
    public FECHA_COMPROBANTE: Date | null,
    public NUMERO_COMPROBANTE2: number | null,
    public NUMERO_COMPROBANTE3: number | null,
    public NUMERO_COMPROBANTE4: number | null,
    public SEARCH_TEXT: string | null,
    public MONTO_LETRAS: string | null,
    public TITULO_REPORTE: string | null,
    public NOMBRE_AGENTE_RETENCION: string | null,
    public TELEFONO_AGENTE_RETENCION: string | null,
    public RIF_AGENTE_RETENCION: string | null,
    public DIRECCION_AGENTE_RETENCION: string | null,

    /* Por ahora se agregaran aqui, buscar una merjor manera */
    public TIPO_ORDEN_PAGO?: DescriptiveEntity,
    public FRECUENCIA_PAGO?: DescriptiveEntity,
    public PROVEEDOR?: SupplierEntity,
    public COMMITMENT?: CommitmentEntity,
    public PUC_PAYMENT_ORDERS?: PucPaymentOrderEntity[],
    public WITHHOLDINGS?: WithholdingOpEntity[],
    public DOCUMENTS?: DocumentEntity[]
  ) {}
}