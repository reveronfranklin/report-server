import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { IDescriptive } from '../../../domain/interfaces/descriptive.interface';
import { PaymentOrderModel } from './payment-order.model';
import { WithholdingOpModel } from './withholding-op.model';

@Table({
  schema: 'public',
  tableName: 'ADM_DESCRIPTIVAS',
  timestamps: false // Desactiva los timestamps
})
export class DescriptiveModel extends Model<DescriptiveModel> implements IDescriptive {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'DESCRIPCION_ID'
  })
  descriptionId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'CODIGO'
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'DESCRIPCION'
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA1'
  })
  extra1: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA2'
  })
  extra2: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA3'
  })
  extra3: string | null;

  /* Associations */

  @HasMany(() => PaymentOrderModel, {
    foreignKey: 'TIPO_ORDEN_PAGO_ID'
  })
  paymentOrders: PaymentOrderModel[];

  @HasMany(() => WithholdingOpModel, {
    foreignKey: 'TIPO_RETENCION_ID'
  })
  withholdingOps: WithholdingOpModel[];

  /* Associations */
}