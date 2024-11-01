import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SUPPLIER_REPOSITORY } from './domain/repositories/supplier.repository.interface';
import { SupplierRepository } from './infrastructure/persistence/supplier.repository';
import { SupplierModel } from './infrastructure/persistence/supplier.model';

@Module({
  imports: [
    SequelizeModule.forFeature([SupplierModel]),
  ],
  providers: [{
    provide: SUPPLIER_REPOSITORY,
    useClass: SupplierRepository,
  }],
})
export class SupplierModule {}