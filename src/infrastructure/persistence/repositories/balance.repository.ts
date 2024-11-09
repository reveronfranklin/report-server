import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BalanceModel } from '../models/balance.model';
import { IBalanceRepository } from '../../../domain/repositories/balance.repository.interface';
import { IBalance } from '../../../domain/interfaces/balance.interface';

@Injectable()
export class BalanceRepository implements IBalanceRepository {
  constructor(
    @InjectModel(BalanceModel)
    private balanceModel: typeof BalanceModel
  ) {}

  async findById(id: number, options?: any): Promise<IBalance | null> {
    const balance = await this.balanceModel.findByPk(id, options);
    return balance;
  }
}