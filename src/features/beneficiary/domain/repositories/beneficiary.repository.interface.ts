import { BeneficiaryEntity } from '../entities/beneficiary.entity';

export interface IBeneficiaryRepository {
  findById(id: number, options?: any): Promise<BeneficiaryEntity | null>;
}