import { WithholdingEntity } from '../entities/withholding.entity';

export interface IWithholdingRepository {
  findByIdWithRelations(id: number): Promise<WithholdingEntity | null>;
}