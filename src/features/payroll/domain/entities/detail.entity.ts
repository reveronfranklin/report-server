import { IDetail } from '../interfaces/detail.interface';

export class DetailEntity implements IDetail {
  public payrollPeriodDate: string | null      = null;
  public payrollIssueDate: string | null       = null;
  public periodCode: number                    = null;
  public payrollTypeCode: number               = null;
  public officeCode: string                    = null;
  public icpCode: number                       = null;
  public denomination: string                  = null;
  public jobTitleDenomination: string          = null;
  public idCard: string                        = null;
  public name: string                          = null;
  public accountNo: string                     = null;
  public conceptNumber: string                 = null;
  public conceptTransactionType: string        = null;
  public conceptDenomination: string           = null;
  public conceptComplement: string             = null;
  public percentage: number                    = null;
  public conceptType: string                   = null;
  public amount: number                        = null;
  public assignment: number                    = null;
  public deduction: number                     = null;
  public status: string                        = null;
  public statusDescription: string             = null;
  public personCode: number                    = null;
  public hireDate: string | null               = null;
  public jobCode: string                       = null;
  public bank: string                          = null;
  public conceptCode: number                   = null;
  public module: string | null                 = null;
  public identifierCode: string | null         = null;

  constructor(data: IDetail) {
    Object.assign(this, data);
  }
}