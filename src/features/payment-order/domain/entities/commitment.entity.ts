import { ICommitment } from '../interfaces/commitment.interface';
import { PreCommitmentEntity } from './pre-commitment.entity';

export class CommitmentEntity implements ICommitment {
  constructor(
    public commitmentCodeOp: number,
    public identifierCode: string,
    public paymentOrderCode: number | null,

    /* Relations */
    public preCommitment?: PreCommitmentEntity
  ) {}
}