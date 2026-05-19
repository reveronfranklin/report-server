import { IGeneral } from '../interfaces/general.interface';

export class GeneralEntity implements IGeneral {
  constructor(
    public conceptType: string,
    public conceptNumber: string,
    public conceptDenomination: string,
    public assignment: number,
    public deduction: number,
    public visibleAmount: number,
    public amount: number,
    public deductible: number,

    /* Relations */
    // Añade aquí tus relaciones si las tiene en un futuro, ej:
    // public detail?: DetailEntity
  ) {}
}