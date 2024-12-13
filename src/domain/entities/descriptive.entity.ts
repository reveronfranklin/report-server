import { IDescriptive } from '../interfaces/descriptive.interface';

export class DescriptiveEntity implements IDescriptive {
  constructor(
    public DESCRIPCION_ID: number,
    public DESCRIPCION_FK_ID: number | null,
    public TITULO_ID: number,
    public DESCRIPCION: string,
    public CODIGO: string,
    public EXTRA1: string | null,
    public EXTRA2: string | null,
    public EXTRA3: string | null,
    public USUARIO_INS: number,
    public FECHA_INS: Date,
    public USUARIO_UPD: number,
    public FECHA_UPD: Date,
    public CODIGO_EMPRESA: number,
    public EXTRA4: string | null
  ) {}
}