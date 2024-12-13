import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DescriptiveModel } from '../models/descriptive.model';
import { IDescriptiveRepository } from '../../../domain/repositories/descriptive.repository.interface';

@Injectable()
export class DescriptiveRepository implements IDescriptiveRepository {
  constructor(
    @InjectModel(DescriptiveModel)
    private descriptiveModel: typeof DescriptiveModel,
  ) {}

  async findById(id: number, options?: any): Promise<DescriptiveModel | null> {
    const order = await this.descriptiveModel.findByPk(id, options);
    return order;
  }
}