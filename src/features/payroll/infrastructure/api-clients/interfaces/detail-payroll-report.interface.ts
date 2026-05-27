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
}