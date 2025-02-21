import { WithholdingEntity } from '../entities/withholding.entity';

export interface IWithholdingRepository {
  findAll(): Promise<WithholdingEntity[]>;
  findById(id: number): Promise<WithholdingEntity | null>;
}