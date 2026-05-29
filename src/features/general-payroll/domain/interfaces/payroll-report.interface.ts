import { IGeneral } from './general.interface';
import { IDetail } from './detail.interface';
import { ISignature } from './signature.interface';
import { IPeriod } from './period.interface';

export interface IPayrollReport {
  period: IPeriod;
  general: IGeneral[];
  details: IDetail[];
  signatures: ISignature[];
}