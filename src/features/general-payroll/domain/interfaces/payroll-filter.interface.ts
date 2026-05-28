export interface IPayrollFilter {
  payrollType: number;
  companyCode: number;
  paymentDate: Date | string;
  generationType: number;
  periodCode: number;
  idCard?: string | null;
}