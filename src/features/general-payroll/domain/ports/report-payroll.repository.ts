import { IPayrollFilter } from '../interfaces/payroll-filter.interface';
import { IReportScheme } from '../interfaces/report-scheme.interface';

export interface IPayrollReportRepository {
  getPayrollReport(filter: IPayrollFilter): Promise<IReportScheme | null>;
}