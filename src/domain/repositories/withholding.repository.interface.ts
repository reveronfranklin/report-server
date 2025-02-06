import { WithholdingEntity } from '../entities/withholding.entity';

export interface IWithholdingRepository {
  findAll(): Promise<WithholdingEntity[]>;
  findById(id: string): Promise<WithholdingEntity | null>;
}