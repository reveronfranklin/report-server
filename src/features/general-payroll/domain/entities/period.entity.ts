import { IPeriod } from '../interfaces/period.interface';

export class PeriodEntity implements IPeriod {
  public periodCode: number                 = null;
  public description: string                = null;
  public payrollTypeCode: number            = null;
  public payrollTypeDescription: string     = null;
  public payrollDate: string                = null;
  public periodNumber: number               = null;
  public periodDescription: string          = null;
  public payrollCategory: string            = null;
  public payrollCategoryDescription: string = null;

  constructor(data: IPeriod) {
    Object.assign(this, data);
  }
}