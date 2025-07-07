import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { IBalance } from '../../../domain/interfaces/balance.interface';
import { PucPaymentOrderModel } from './puc-payment-order.model';

@Table({
  schema: 'public',
  tableName: 'PRE_V_SALDOS',
  timestamps: false
})
export class BalanceModel extends Model<BalanceModel> implements IBalance {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_SALDO'
  })
  balanceCode: number;

  @Column({
    type: DataType.INTEGER,
    field: 'ANO'
  })
  year: number;

  @Column({
    type: DataType.STRING,
    field: 'DESCRIPCION_FINANCIADO'
  })
  financedDescription: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_ICP_CONCAT'
  })
  icpCodeConcat: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_PUC_CONCAT'
  })
  pucCodeConcat: string;

  @Column({
    type: DataType.STRING,
    field: 'DENOMINACION_PUC'
  })
  pucDenomination: string;

  /* Associations */

  @HasOne(() => PucPaymentOrderModel, {
    foreignKey: 'CODIGO_SALDO',
    as: 'pucPaymentOrder'
  })
  pucPaymentOrder: PucPaymentOrderModel;

  /* Associations */
}