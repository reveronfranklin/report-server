import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DescriptiveModel } from './descriptive.model';
import { IDescriptiveRepository } from '../../domain/repositories/descriptive.repository.interface';

@Injectable()
export class DescriptiveRepository implements IDescriptiveRepository {
  constructor(
    @InjectModel(DescriptiveModel)
    private descriptiveModel: typeof DescriptiveModel,
  ) {}
}