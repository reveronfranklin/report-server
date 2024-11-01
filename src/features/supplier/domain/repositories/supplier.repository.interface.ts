import { SupplierEntity } from '../entities/supplier.entity';

export const SUPPLIER_REPOSITORY = 'SUPPLIER_REPOSITORY';

export interface ISupplierRepository {
  findById(id: number, options?: any): Promise<SupplierEntity | null>;
}