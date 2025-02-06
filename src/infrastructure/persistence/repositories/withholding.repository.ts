import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WithholdingModel } from '../models/withholding.model';
import { IWithholdingRepository } from '../../../domain/repositories/withholding.repository.interface';
import { WithholdingEntity } from '../../../domain/entities/withholding.entity';

@Injectable()
export class WithholdingRepository implements IWithholdingRepository {
  constructor(
    @InjectModel(WithholdingModel)
    private withholdingModel: typeof WithholdingModel,
  ) {}

  async findAll(): Promise<WithholdingEntity[]> {
    const withholdings = await this.withholdingModel.findAll();
    return withholdings;
  }

  async findById(id: string): Promise<WithholdingEntity | null> {
    const withholding = await this.withholdingModel.findByPk(id);
    return withholding;
  }
}