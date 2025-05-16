import { IWithholding } from '../interfaces/withholding.interface';

export class WithholdingEntity implements IWithholding {
  constructor(
    public retentionCode: number,
    public paymentConcept: string,
    public byRetention: number
  ) {}
}