import { IGeneral } from './general.interface';
import { IDetail } from './detail.interface';
import { ISignature } from './signature.interface';

export interface IPayrollReport {
  general: IGeneral[];
  details: IDetail[];
  signatures: ISignature[];
}