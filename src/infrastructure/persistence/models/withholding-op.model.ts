import { Model, Column, ForeignKey, BelongsTo, Table, Scopes, DataType } from 'sequelize-typescript';
import { IWithholdingOp } from '../../../domain/interfaces/withholding-op.interface';
import { DescriptiveModel } from './descriptive.model';
import { PaymentOrderModel } from './payment-order.model';
import { WithholdingModel } from './withholding.model';

@Scopes(() => ({
  withLT: {
    include: [{
      model: DescriptiveModel,
      as: 'DESCRIPCION',
      where: {
        CODIGO: 'LT'
      },
      attributes: [
        'CODIGO'
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
  @Column({ primaryKey: true, field: 'CODIGO_RETENCION_OP' })
  codigoRetencionOp!: string;

  /* Foreing Keys */
  @ForeignKey(() => PaymentOrderModel)
  @Column({ field: 'CODIGO_ORDEN_PAGO' })
  codigoOrdenPago!: number;


  @ForeignKey(() => DescriptiveModel)
  @Column({ field: 'TIPO_RETENCION_ID' })
  tipoRetencionId!: string;

  @ForeignKey(() => WithholdingModel)
  @Column({ field: 'CODIGO_RETENCION' })
  codigoRetencion!: string;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => DescriptiveModel, { foreignKey: 'TIPO_RETENCION_ID', as: 'DESCRIPCION' })
  DESCRIPCION: DescriptiveModel;

  /* pasar description a tipo de Retención */
  /*  @BelongsTo(() => DescriptiveModel, 'TIPO_RETENCION_ID')
  TIPO_RETENCION: DescriptiveModel; */

  @BelongsTo(() => PaymentOrderModel, { foreignKey: 'CODIGO_ORDEN_PAGO', as: 'PAYMENT_ORDER' })
  PAYMENT_ORDER: PaymentOrderModel;

  @BelongsTo(() => WithholdingModel, { foreignKey: 'CODIGO_RETENCION', as: 'WITHHOLDING' })
  WITHHOLDING: WithholdingModel;

  /* Associations */

  @Column({ field: 'POR_RETENCION', type: DataType.INTEGER })
  porRetencion!: number;

  @Column({ field: 'MONTO_RETENCION', type: DataType.INTEGER })
  montoRetencion!: number;

  @Column({ field: 'EXTRA1' })
  extra1!: string;

  @Column({ field: 'EXTRA2' })
  extra2!: string;

  @Column({ field: 'EXTRA3' })
  extra3!: string;

  @Column({ field: 'USUARIO_INS' })
  usuarioIns!: string;

  @Column({ field: 'FECHA_INS' })
  fechaIns!: Date;

  @Column({ field: 'USUARIO_UPD' })
  usuarioUpd!: string;

  @Column({ field: 'FECHA_UPD' })
  fechaUpd!: Date;

  @Column({ field: 'CODIGO_EMPRESA' })
  codigoEmpresa!: string;

  @Column({ field: 'CODIGO_PRESUPUESTO' })
  codigoPresupuesto!: string;

  @Column({ field: 'EXTRA4' })
  extra4!: string;

  @Column({ field: 'BASE_IMPONIBLE', type: DataType.INTEGER })
  baseImponible!: number;
}