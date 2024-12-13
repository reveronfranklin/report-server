import { SupplierEntity } from '../entities/supplier.entity';

export interface ISupplierRepository {
  findById(id: number, options?: any): Promise<SupplierEntity | null>;
}