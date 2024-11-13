import { DescriptiveEntity } from '../entities/descriptive.entity';

export interface IDescriptiveRepository {
  findById(id: number, options?: any): Promise<DescriptiveEntity | null>;
}