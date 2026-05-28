import { IPayrollReport } from '../interfaces/payroll-report.interface';
import { DetailEntity } from './detail.entity';
import { GeneralEntity } from './general.entity';
import { SignatureEntity } from './signature.entity';

export class PayrollReportEntity implements IPayrollReport {
  public general: GeneralEntity[]       = [];
  public details: DetailEntity[]        = [];
  public signatures: SignatureEntity[]  = [];

  constructor(data: IPayrollReport) {
    Object.assign(this, data);
  }
}