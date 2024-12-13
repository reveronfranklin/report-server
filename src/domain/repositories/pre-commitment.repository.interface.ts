import { IPreCommitment } from '../interfaces/pre-commitment.interface';

export interface IPreCommitmentRepository {
  findById(id: number, options?: any): Promise<IPreCommitment | null>;
}