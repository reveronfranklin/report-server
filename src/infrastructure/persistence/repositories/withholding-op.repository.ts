import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WithholdingOpModel } from '../models/withholding-op.model';
import { IWithholdingOpRepository } from '../../../domain/repositories/withholding-op.repository.interface';
import { IWithholdingOp } from '../../../domain/interfaces/withholding-op.interface';

@Injectable()
export class WithholdingOpRepository implements IWithholdingOpRepository {
  constructor(
    @InjectModel(WithholdingOpModel)
    private withholdingOpModel: typeof WithholdingOpModel
  ) {}

  async findByIdWithRelations(id: number, options?: any): Promise<IWithholdingOp | null> {
    const withholding = await this.withholdingOpModel.findByPk(id, options);
    return withholding;
  }
}