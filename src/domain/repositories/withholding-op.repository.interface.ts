import { WithholdingOpEntity } from '../entities/withholding-op.entity';

export interface IWithholdingOpRepository {
  findByIdWithRelations(id: number): Promise<WithholdingOpEntity | null>;
}