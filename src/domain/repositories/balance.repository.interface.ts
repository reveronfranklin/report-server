import { IBalance } from '../interfaces/balance.interface';

export interface IBalanceRepository {
  findById(id: number, options?: any): Promise<IBalance | null>;
}