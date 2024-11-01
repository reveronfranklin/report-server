import { DescriptiveEntity } from '../entities/descriptive.entity';

export const DESCRIPTIVE_REPOSITORY = 'DESCRIPTIVE_REPOSITORY';

export interface IDescriptiveRepository {
  findById(id: number, options?: any): Promise<DescriptiveEntity | null>;
}