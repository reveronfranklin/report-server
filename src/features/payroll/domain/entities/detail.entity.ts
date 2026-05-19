import { IDetail } from '../interfaces/detail.interface';

export class DetailEntity implements IDetail {
  constructor(
    public payrollPeriodDate: Date,
    public payrollIssueDate: Date,
    public periodCode: number,
    public payrollTypeCode: number,
    public officeCode: string,
    public icpCode: number,
    public denomination: string,
    public jobTitleDenomination: string,
    public idCard: string,
    public name: string,
    public accountNo: string,
    public conceptNumber: string,
    public conceptTransactionType: string,
    public conceptDenomination: string,
    public conceptComplement: string,
    public percentage: number,
    public conceptType: string,
    public amount: number,
    public assignment: number,
    public deduction: number,
    public status: string,
    public statusDescription: string,
    public personCode: number,
    public hireDate: Date,
    public jobCode: string,
    public bank: string,
    public conceptCode: number,
    public module: string,
    public identifierCode: string,

    /* Relations */
  ) {}
}