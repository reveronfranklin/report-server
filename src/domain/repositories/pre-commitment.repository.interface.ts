import { IPreCommitment } from '../interfaces/pre-commitment.interface';

export interface IPreCommitmentRepository {
  findById(id: number, options?: any): Promise<IPreCommitment | null>;
}

export const PRE_COMMITMENT_REPOSITORY = 'IPreCommitmentRepository';