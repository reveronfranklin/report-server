import { IPreCommitment } from '../interfaces/pre-commitment.interface';

export class PreCommitmentEntity implements IPreCommitment {
  constructor(
    public commitmentCode: number,
    public commitmentDate: Date,
    public commitmentNumber: string
  ) {}
}