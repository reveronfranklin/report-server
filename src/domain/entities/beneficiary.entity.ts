import { IBeneficiary } from '../interfaces/beneficiary.interface';

export class BeneficiaryEntity implements IBeneficiary {
  constructor(
    public CODIGO_CONTACTO_PROVEEDOR: number,
    public CODIGO_PROVEEDOR: number,
    public NOMBRE: string,
    public APELLIDO: string,
    public IDENTIFICACION_ID: number,
    public IDENTIFICACION: string,
    public SEXO: string,
    public TIPO_CONTACTO_ID: number,
    public PRINCIPAL: boolean,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: number,
    public FECHA_INS: Date,
    public USUARIO_UPD: number,
    public FECHA_UPD: Date,
    public CODIGO_EMPRESA: number,
    public CODIGO_PRESUPUESTO: number | null
  ) {}
}