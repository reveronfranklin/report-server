import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { IDescriptive } from '../../domain/interfaces/descriptive.interface';
import { PaymentOrderModel } from './payment-order.model';

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
  DESCRIPCION_ID: number;

  /* Associations */

  @HasMany(() => PaymentOrderModel, { foreignKey: 'TIPO_ORDEN_PAGO_ID' })
  PAYMENT_ORDERS: PaymentOrderModel[];

  /* Associations */

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'DESCRIPCION_FK_ID'
  })
  DESCRIPCION_FK_ID: number | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'TITULO_ID'
  })
  TITULO_ID: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'DESCRIPCION'
  })
  DESCRIPCION: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'CODIGO'
  })
  CODIGO: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA1'
  })
  EXTRA1: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA2'
  })
  EXTRA2: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA3'
  })
  EXTRA3: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'USUARIO_INS'
  })
  USUARIO_INS: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'FECHA_INS'
  })
  FECHA_INS: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'USUARIO_UPD'
  })
  USUARIO_UPD: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'FECHA_UPD'
  })
  FECHA_UPD: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'CODIGO_EMPRESA'
  })
  CODIGO_EMPRESA: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA4'
  })
  EXTRA4: string | null;
}