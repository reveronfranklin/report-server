import { IWithholdingOp } from '../interfaces/withholding-op.interface';
import { DescriptiveEntity } from './descriptive.entity';

export class WithholdingOpEntity implements IWithholdingOp {
  constructor(
    public byRetention: number,
    public opRetentionCode: string,
    public paymentOrderCode: number,
    public retentionAmount: number,
    public retentionCode: string,
    public taxableBase: number,
    public withholdingTypeId: string,

    /* Relations */
    public retentionType?: DescriptiveEntity
  ) {}
}