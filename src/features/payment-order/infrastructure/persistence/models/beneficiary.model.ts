import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IBeneficiary } from '../../../domain/interfaces/beneficiary.interface';
import { SupplierModel } from './supplier.model';

@Table({
  schema: 'public',
  tableName: 'ADM_CONTACTO_PROVEEDOR',
  timestamps: false // Desactiva los timestamps
})
export class BeneficiaryModel extends Model<BeneficiaryModel> implements IBeneficiary {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_CONTACTO_PROVEEDOR'
  })
  providerContactCode: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'NOMBRE'
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'IDENTIFICACION'
  })
  identification: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'IDENTIFICACION_ID'
  })
  identificationId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'APELLIDO'
  })
  lastName: string;

  /* Foreing Keys */

  @ForeignKey(() => SupplierModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'CODIGO_PROVEEDOR'
  })
  providerCode: number;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => SupplierModel, {
    foreignKey: 'CODIGO_PROVEEDOR',
    as: 'supplier'
  })
  supplier: SupplierModel;

  /* Associations */
}