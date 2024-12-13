import { IWithholding } from '../interfaces/withholding.interface';
import { DescriptiveEntity } from './descriptive.entity'


export class WithholdingEntity implements IWithholding {
  constructor(
    public codigoRetencionOp: string,
    public codigoOrdenPago: string,
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