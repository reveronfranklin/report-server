import { IPayrollFilter } from '../interfaces/payroll-filter.interface';
import { IPayrollReport } from '../interfaces/payroll-report.interface';

export interface IPayrollReportRepository {
  getPayrollReport(filter: IPayrollFilter): Promise<IPayrollReport | null>;
}