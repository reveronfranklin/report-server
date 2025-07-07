import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ICommitment } from '../../../domain/interfaces/commitment.interface';
import { PaymentOrderModel } from './payment-order.model';
import { PreCommitmentModel } from './pre-commitment.model';

@Table({
  schema: 'public',
  tableName: 'ADM_COMPROMISO_OP',
  timestamps: false
})
export class CommitmentModel extends Model<CommitmentModel> implements ICommitment {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_COMPROMISO_OP'
  })
  commitmentCodeOp: number;

  /* Foreing Keys */

  @ForeignKey(() => PreCommitmentModel)
  @Column({
    type: DataType.STRING,
    field: 'CODIGO_IDENTIFICADOR'
  })
  identifierCode: string;

  @ForeignKey(() => PaymentOrderModel)
  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_ORDEN_PAGO'
  })
  paymentOrderCode: number;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => PaymentOrderModel, { foreignKey: 'CODIGO_ORDEN_PAGO', as: 'ORDEN_PAGO' })
  ORDEN_PAGO: PaymentOrderModel;

  @BelongsTo(() => PreCommitmentModel, {
    foreignKey: 'CODIGO_IDENTIFICADOR',
    as: 'preCommitment'
  })
  preCommitment: PreCommitmentModel;

  /* Associations */
}