import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommitmentModel } from '../models/commitment.model';
import { ICommitmentRepository } from '../../../domain/repositories/commitment.repository.interface';
import { ICommitment } from '../../../domain/interfaces/commitment.interface';

@Injectable()
export class CommitmentRepository implements ICommitmentRepository {
  constructor(
    @InjectModel(CommitmentModel)
    private commitmentModel: typeof CommitmentModel
  ) {}

  async findById(id: number, options?: any): Promise<ICommitment | null> {
    const commitment = await this.commitmentModel.findByPk(id, options);
    return commitment;
  }
}