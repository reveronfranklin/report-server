import { ISupplier } from '../interfaces/supplier.interface';
import { BeneficiaryEntity } from './beneficiary.entity';

export class SupplierEntity implements ISupplier {
  constructor(
    public CODIGO_PROVEEDOR: number,
    public NOMBRE_PROVEEDOR: string,
    public TIPO_PROVEEDOR_ID: number,
    public NACIONALIDAD: string,
    public CEDULA: string,
    public RIF: string,
    public FECHA_RIF: Date | null,
    public NIT: string | null,
    public FECHA_NIT: Date | null,
    public NUMERO_REGISTRO_CONTRALORIA: string | null,
    public FECHA_REGISTRO_CONTRALORIA: Date | null,
    public CAPITAL_PAGADO: number | null,
    public CAPITAL_SUSCRITO: number | null,
    public TIPO_IMPUESTO_ID: number | null,
    public STATUS: string,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: number,
    public FECHA_INS: Date,
    public USUARIO_UPD: number,
    public FECHA_UPD: Date,
    public CODIGO_EMPRESA: number,
    public CODIGO_PERSONA: number | null,
    public CODIGO_AUXILIAR_GASTO_X_PAGAR: string | null,
    public CODIGO_AUXILIAR_ORDEN_PAGO: string | null,
    public ESTATUS_FISCO_ID: number | null,
    public NUMERO_CUENTA: string | null,
    public BENEFICIARIES?: BeneficiaryEntity[]
  ) {}
}