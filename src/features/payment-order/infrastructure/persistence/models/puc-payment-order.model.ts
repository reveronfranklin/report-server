import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
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
  pucPaymentOrderCode: number;

  /* Foreing Keys */

  @ForeignKey(() => BalanceModel)
  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_SALDO'
  })
  balanceCode: number;

  @ForeignKey(() => PaymentOrderModel)
  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_ORDEN_PAGO'
  })
  paymentOrderCode: number;

  /* Foreing Keys */


  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'MONTO'
  })
  amount: number;


  /* Associations */

  @BelongsTo(() => PaymentOrderModel, {
    foreignKey: 'CODIGO_ORDEN_PAGO',
    as: 'ORDEN_PAGO'
  })
  ORDEN_PAGO: PaymentOrderModel;

  @BelongsTo(() => BalanceModel, {
    foreignKey: 'CODIGO_SALDO',
    as: 'balance'
  })
  balance: BalanceModel;

  /* Associations */
}