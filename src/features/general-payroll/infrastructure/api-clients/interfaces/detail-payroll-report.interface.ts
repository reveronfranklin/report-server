export interface GroupedConcept {
  conceptType: string;
  conceptNumber: string;
  percentage: number | null;
  conceptDenomination: string;
  conceptComplement: string | null;
  assignment: number;
  deduction: number;
  generalAmount: number | null;
}

export interface EmployeeWithConcepts {
  idCard: string;
  name: string;
  jobTitleDenomination: string;
  bank: string;
  hireDate: string;
  personCode: number;
  accountNo: string;
  salary: number | null;
  status: string;
  statusDescription: string;
  concepts: GroupedConcept[];
  totalEmployeeAssignment: number;
  totalEmployeeDeduction: number;
}

export interface OfficeGroup {
  officeCode: string;
  officeDenomination: string;
  employees: EmployeeWithConcepts[];
  totalOfficeAssignment: number;
  totalOfficeDeduction: number;
  activeEmployeesCount: number;
  permissionEmployeesCount: number;
  sickLeaveEmployeesCount: number;
  vacationEmployeesCount: number;
}

export interface PayrollGeneralTotals {
  totalGeneralAssignment: number;
  totalGeneralDeduction: number;
  activeGeneralCount: number;
  permissionGeneralCount: number;
  sickLeaveGeneralCount: number;
  vacationGeneralCount: number;
}

export interface PayrollReportData {
  payrollName: string;
  payrollPeriod: string;
  officeGroups: OfficeGroup[];
  generalTotals: PayrollGeneralTotals;
}