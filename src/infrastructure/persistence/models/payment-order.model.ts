import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';
import { IPaymentOrder } from '../../../domain/interfaces/payment-order.interface';
import { DescriptiveModel } from './descriptive.model';
import { SupplierModel } from './supplier.model';
import { PucPaymentOrderModel } from './puc-payment-order.model';
import { CommitmentModel } from './commitment.model';
import { WithholdingModel } from './withholding.model';

@Table({
  schema: 'public',
  tableName: 'ADM_ORDEN_PAGO',
  timestamps: false // Desactiva los timestamps
})
export class PaymentOrderModel extends Model<PaymentOrderModel> implements IPaymentOrder {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_ORDEN_PAGO'
  })
  CODIGO_ORDEN_PAGO: number;

  /* Foreing Keys */

  @ForeignKey(() => DescriptiveModel)
  @Column({
    type: DataType.INTEGER,
    field: 'TIPO_ORDEN_PAGO_ID'
  })
  TIPO_ORDEN_PAGO_ID: number;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    type: DataType.INTEGER,
    field: 'FRECUENCIA_PAGO_ID'
  })
  FRECUENCIA_PAGO_ID: number;

  @ForeignKey(() => SupplierModel)
  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_PROVEEDOR'
  })
  CODIGO_PROVEEDOR: number;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => DescriptiveModel, { foreignKey: 'TIPO_ORDEN_PAGO_ID', as: 'TIPO_ORDEN_PAGO' })
  TIPO_ORDEN_PAGO: DescriptiveModel;

  @BelongsTo(() => DescriptiveModel, { foreignKey: 'FRECUENCIA_PAGO_ID', as: 'FRECUENCIA_PAGO' })
  FRECUENCIA_PAGO: DescriptiveModel;

  @BelongsTo(() => SupplierModel, { foreignKey: 'CODIGO_PROVEEDOR', as: 'PROVEEDOR' })
  PROVEEDOR: SupplierModel;

  @HasMany(() => PucPaymentOrderModel, { foreignKey: 'CODIGO_ORDEN_PAGO' })
  PUC_PAYMENT_ORDERS: PucPaymentOrderModel[];

  @HasMany(() => WithholdingModel, { foreignKey: 'CODIGO_ORDEN_PAGO' })
  WITHHOLDINGS: WithholdingModel[];

  @HasOne(() => CommitmentModel, { foreignKey: 'CODIGO_ORDEN_PAGO' })
  COMMITMENT: CommitmentModel;

  /* Associations */

  @Column({
    type: DataType.STRING,
    field: 'MONTO_LETRAS'
  })
  MONTO_LETRAS: string;

  @Column({
    type: DataType.STRING,
    field: 'TITULO_REPORTE'
  })
  TITULO_REPORTE: string;

  @Column({
    type: DataType.INTEGER,
    field: 'ANO',
    allowNull: true
  })
  ANO: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_COMPROMISO',
    allowNull: true
  })
  CODIGO_COMPROMISO: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_ORDEN_COMPRA',
    allowNull: true
  })
  CODIGO_ORDEN_COMPRA: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_CONTRATO',
    allowNull: true
  })
  CODIGO_CONTRATO: number | null;

  @Column({
    type: DataType.STRING,
    field: 'NUMERO_ORDEN_PAGO'
  })
  NUMERO_ORDEN_PAGO: string;

  @Column({
    type: DataType.STRING,
    field: 'REFERENCIA_ORDEN_PAGO'
  })
  REFERENCIA_ORDEN_PAGO: string;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_ORDEN_PAGO'
  })
  FECHA_ORDEN_PAGO: Date;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_PLAZO_DESDE'
  })
  FECHA_PLAZO_DESDE: Date;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_PLAZO_HASTA'
  })
  FECHA_PLAZO_HASTA: Date;

  @Column({
    type: DataType.FLOAT,
    field: 'CANTIDAD_PAGO',
    allowNull: true
  })
  CANTIDAD_PAGO: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'NUMERO_PAGO',
    allowNull: true
  })
  NUMERO_PAGO: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'TIPO_PAGO_ID',
    allowNull: true
  })
  TIPO_PAGO_ID: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'NUMERO_VALUACION',
    allowNull: true
  })
  NUMERO_VALUACION: number | null;

  @Column({
    type: DataType.STRING,
    field: 'STATUS',
    allowNull: true
  })
  STATUS: string | null;

  @Column({
    type: DataType.STRING,
    field: 'MOTIVO',
    allowNull: true
  })
  MOTIVO: string | null;

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
    field: 'CODIGO_PRESUPUESTO'
  })
  CODIGO_PRESUPUESTO: number;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA4',
    allowNull: true
  })
  EXTRA4: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA5',
    allowNull: true
  })
  EXTRA5: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA6',
    allowNull: true
  })
  EXTRA6: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA7',
    allowNull: true
  })
  EXTRA7: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA8',
    allowNull: true
  })
  EXTRA8: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA9',
    allowNull: true
  })
  EXTRA9: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA10',
    allowNull: true
  })
  EXTRA10: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA11',
    allowNull: true
  })
  EXTRA11: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA12',
    allowNull: true
  })
  EXTRA12: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA13',
    allowNull: true
  })
  EXTRA13: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA14',
    allowNull: true
  })
  EXTRA14: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA15',
    allowNull: true
  })
  EXTRA15: string | null;

  @Column({
    type: DataType.INTEGER,
    field: 'NUMERO_COMPROBANTE',
    allowNull: true
  })
  NUMERO_COMPROBANTE: number | null;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_COMPROBANTE',
    allowNull: true
  })
  FECHA_COMPROBANTE: Date | null;

  @Column({
    type: DataType.INTEGER,
    field: 'NUMERO_COMPROBANTE2',
    allowNull: true
  })
  NUMERO_COMPROBANTE2: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'NUMERO_COMPROBANTE3',
    allowNull: true
  })
  NUMERO_COMPROBANTE3: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'NUMERO_COMPROBANTE4',
    allowNull: true
  })
  NUMERO_COMPROBANTE4: number | null;

  @Column({
    type: DataType.STRING,
    field: 'SEARCH_TEXT',
    allowNull: true
  })
  SEARCH_TEXT: string | null;
}