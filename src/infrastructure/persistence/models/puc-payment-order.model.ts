import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { IPucPaymentOrder } from '../../../domain/interfaces/puc-payment-order.interface';
import { PaymentOrderModel } from './payment-order.model';
import { BalanceModel } from './balance.model';

@Table({
  schema: 'public',
  tableName: 'ADM_PUC_ORDEN_PAGO',
  timestamps: false
})
export class PucPaymentOrderModel extends Model<PucPaymentOrderModel> implements IPucPaymentOrder {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_PUC_ORDEN_PAGO'
  })
  CODIGO_PUC_ORDEN_PAGO: number;

  /* Foreing Keys */

  @ForeignKey(() => PaymentOrderModel)
  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_ORDEN_PAGO'
  })
  CODIGO_ORDEN_PAGO: number;

  @ForeignKey(() => BalanceModel)
  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_SALDO'
  })
  CODIGO_SALDO: number;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => PaymentOrderModel, { foreignKey: 'CODIGO_ORDEN_PAGO', as: 'ORDEN_PAGO' })
  ORDEN_PAGO: PaymentOrderModel;

  @BelongsTo(() => BalanceModel, { foreignKey: 'CODIGO_SALDO', as: 'BALANCE' })
  BALANCE: BalanceModel;

  /* Associations */

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_PUC_COMPROMISO',
    allowNull: true
  })
  CODIGO_PUC_COMPROMISO: number | null;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_ICP'
  })
  CODIGO_ICP: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_PUC'
  })
  CODIGO_PUC: string;

  @Column({
    type: DataType.INTEGER,
    field: 'FINANCIADO_ID'
  })
  FINANCIADO_ID: number;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_FINANCIADO'
  })
  CODIGO_FINANCIADO: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'MONTO'
  })
  MONTO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'MONTO_PAGADO'
  })
  MONTO_PAGADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'MONTO_ANULADO'
  })
  MONTO_ANULADO: number;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA1',
    allowNull: true
  })
  EXTRA1: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA2',
    allowNull: true
  })
  EXTRA2: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA3',
    allowNull: true
  })
  EXTRA3: string | null;

  @Column({
    type: DataType.INTEGER,
    field: 'USUARIO_INS'
  })
  USUARIO_INS: number;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_INS'
  })
  FECHA_INS: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'USUARIO_UPD'
  })
  USUARIO_UPD: number;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_UPD'
  })
  FECHA_UPD: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_EMPRESA'
  })
  CODIGO_EMPRESA: number;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_COMPROMISO_OP',
    allowNull: true
  })
  CODIGO_COMPROMISO_OP: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_PRESUPUESTO'
  })
  CODIGO_PRESUPUESTO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'MONTO_COMPROMISO'
  })
  MONTO_COMPROMISO: number;
}