import { IGeneral } from './general.interface';
import { IDetail } from './detail.interface';
import { ISignature } from './signature.interface';
import { IPeriod } from './period.interface';
export interface IReportScheme {
  name: string;
  staticHeader: IPeriod;
  header: IGeneral[];
  body: IDetail[];
  footer: ISignature[];
}