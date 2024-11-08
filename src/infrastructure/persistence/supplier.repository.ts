import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SupplierModel } from './supplier.model';
import { ISupplierRepository } from '../../domain/repositories/supplier.repository.interface';
import { SupplierEntity } from '../../domain/entities/supplier.entity';

@Injectable()
export class SupplierRepository implements ISupplierRepository {
  constructor(
    @InjectModel(SupplierModel)
    private supplierModel: typeof SupplierModel,
  ) {}

  async findById(id: number, options?: any): Promise<SupplierEntity | null> {
    const supplier = await this.supplierModel.findByPk(id, options);
    return supplier;
  }
}