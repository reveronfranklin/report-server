import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ISupplier } from '../../../domain/interfaces/supplier.interface';
import { PaymentOrderModel } from './payment-order.model';
import { BeneficiaryModel } from './beneficiary.model';

@Table({
  schema: 'public',
  tableName: 'ADM_PROVEEDORES',
  timestamps: false // Desactiva los timestamps
})
export class SupplierModel extends Model<SupplierModel> implements ISupplier {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_PROVEEDOR'
  })
  providerCode: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'CEDULA'
  })
  identificationCard: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'NOMBRE_PROVEEDOR'
  })
  providerName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'RIF'
  })
  taxId: string;


  /* Associations */

  @HasMany(() => PaymentOrderModel, {
    foreignKey: 'CODIGO_PROVEEDOR'
  })
  PAYMENT_ORDERS: PaymentOrderModel[];

  @HasMany(() => BeneficiaryModel, {
    foreignKey: 'CODIGO_PROVEEDOR',
    as: 'beneficiaries'
  })
  beneficiaries: BeneficiaryModel[];

  /* Associations */
}