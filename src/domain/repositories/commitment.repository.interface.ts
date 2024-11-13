import { ICommitment } from '../interfaces/commitment.interface';

export interface ICommitmentRepository {
  findById(id: number, options?: any): Promise<ICommitment | null>;
}