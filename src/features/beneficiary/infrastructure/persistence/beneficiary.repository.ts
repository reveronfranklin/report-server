import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BeneficiaryModel } from './beneficiary.model';
import { IBeneficiaryRepository } from '../../domain/repositories/beneficiary.repository.interface';
import { BeneficiaryEntity } from '../../domain/entities/beneficiary.entity';

@Injectable()
export class BeneficiaryRepository implements IBeneficiaryRepository {
  constructor(
    @InjectModel(BeneficiaryModel)
    private beneficiaryModel: typeof BeneficiaryModel,
  ) {}

  async findById(id: number, options?: any): Promise<BeneficiaryEntity | null> {
    const beneficiary = await this.beneficiaryModel.findByPk(id, options);
    return beneficiary;
  }
}