import { IWithholdingOp } from '../interfaces/withholding-op.interface';
import { DescriptiveEntity } from './descriptive.entity';

export class WithholdingOpEntity implements IWithholdingOp {
  constructor(
    public codigoRetencionOp: string,
    public codigoOrdenPago: number,
    public tipoRetencionId: string,
    public codigoRetencion: string,
    public porRetencion: number,
    public montoRetencion: number,
    public extra1: string | null,
    public extra2: string | null,
    public extra3: string | null,
    public usuarioIns: string,
    public fechaIns: Date,
    public usuarioUpd: string | null,
    public fechaUpd: Date | null,
    public codigoEmpresa: string,
    public codigoPresupuesto: string,
    public extra4: string | null,
    public baseImponible: number,

    public descripcion?: DescriptiveEntity
  ) {}
}