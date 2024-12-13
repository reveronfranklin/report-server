import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WithholdingModel } from '../models/withholding.model';
import { IWithholdingRepository } from '../../../domain/repositories/withholding.repository.interface';
import { IWithholding } from '../../../domain/interfaces/withholding.interface';

@Injectable()
export class WithholdingRepository implements IWithholdingRepository {
  constructor(
    @InjectModel(WithholdingModel)
    private withholdingModel: typeof WithholdingModel
  ) {}

  async findByIdWithRelations(id: number, options?: any): Promise<IWithholding | null> {
    const withholding = await this.withholdingModel.findByPk(id, options);
    return withholding;
  }
}