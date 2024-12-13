import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PreCommitmentModel } from '../models/pre-commitment.model';
import { IPreCommitmentRepository } from '../../../domain/repositories/pre-commitment.repository.interface';
import { IPreCommitment } from '../../../domain/interfaces/pre-commitment.interface';

@Injectable()
export class PreCommitmentRepository implements IPreCommitmentRepository {
  constructor(
    @InjectModel(PreCommitmentModel)
    private preCommitmentModel: typeof PreCommitmentModel
  ) {}

  async findById(id: number, options?: any): Promise<IPreCommitment | null> {
    const preCommitment = await this.preCommitmentModel.findByPk(id, options);
    return preCommitment;
  }
}