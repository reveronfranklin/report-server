import { IGeneral } from '../interfaces/general.interface';

export class GeneralEntity implements IGeneral {
  public conceptType: string         = null;
  public conceptNumber: string       = null;
  public conceptDenomination: string = null;
  public assignment: number          = null;
  public deduction: number           = null;
  public visibleAmount: number       = null;
  public amount: number              = null;
  public deductible: number          = null;

  constructor(data: IGeneral) {
    Object.assign(this, data);
  }
}