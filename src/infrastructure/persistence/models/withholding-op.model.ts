import { Model, Column, ForeignKey, BelongsTo, Table, Scopes, DataType } from 'sequelize-typescript';
import { IWithholdingOp } from '../../../domain/interfaces/withholding-op.interface';
import { DescriptiveModel } from './descriptive.model';
import { PaymentOrderModel } from './payment-order.model';
import { WithholdingModel } from './withholding.model';

@Scopes(() => ({
  withLT: {
    include: [{
      model: DescriptiveModel,
      as: 'retentionType',
      where: {
        code: 'LT'
      },
      attributes: [
        'code'
      ]
    }]
  }
}))

@Table({
  schema: 'public',
  tableName: 'ADM_RETENCIONES_OP',
  timestamps: false // Desactiva los timestamps
})
export class WithholdingOpModel extends Model<WithholdingOpModel> implements IWithholdingOp {
  @Column({
    primaryKey: true,
    field: 'CODIGO_RETENCION_OP'
  })
  opRetentionCode!: string;

  /* Foreing Keys */

  @ForeignKey(() => PaymentOrderModel)
  @Column({
    field: 'CODIGO_ORDEN_PAGO'
  })
  paymentOrderCode!: number;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_RETENCION_ID'
  })
  withholdingTypeId!: string;

  @ForeignKey(() => WithholdingModel)
  @Column({
    field: 'CODIGO_RETENCION'
  })
  retentionCode!: string;

  /* Foreing Keys */


  @Column({
    field: 'POR_RETENCION',
    type: DataType.INTEGER
  })
  byRetention!: number;

  @Column({
    field: 'MONTO_RETENCION',
    type: DataType.INTEGER
  })
  retentionAmount!: number;

  @Column({
    field: 'BASE_IMPONIBLE',
    type: DataType.INTEGER
  })
  taxableBase!: number;


  /* Associations */

  @BelongsTo(() => DescriptiveModel, {
    foreignKey: 'TIPO_RETENCION_ID',
    as: 'retentionType',
  })
  retentionType: DescriptiveModel;

  @BelongsTo(() => PaymentOrderModel, {
    foreignKey: 'CODIGO_ORDEN_PAGO',
    as: 'paymentOrder'
  })
  paymentOrder: PaymentOrderModel;

  @BelongsTo(() => WithholdingModel, {
    foreignKey: 'CODIGO_RETENCION',
    as: 'withholding'
  })
  withholding: WithholdingModel;

  /* Associations */
}