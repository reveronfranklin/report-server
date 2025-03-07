import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';
import { IPaymentOrder } from '../../../domain/interfaces/payment-order.interface';
import { DescriptiveModel } from './descriptive.model';
import { SupplierModel } from './supplier.model';
import { PucPaymentOrderModel } from './puc-payment-order.model';
import { CommitmentModel } from './commitment.model';
import { WithholdingOpModel } from './withholding-op.model';
import { DocumentModel } from './document.model';

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
  paymentOrderCode: number;

  /* Foreing Keys */

  @ForeignKey(() => DescriptiveModel)
  @Column({
    type: DataType.INTEGER,
    field: 'TIPO_ORDEN_PAGO_ID'
  })
  paymentOrderTypeId: number;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    type: DataType.INTEGER,
    field: 'FRECUENCIA_PAGO_ID'
  })
  paymentFrequencyId: number;

  @ForeignKey(() => SupplierModel)
  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_PROVEEDOR'
  })
  supplierCode: number;

  /* Foreing Keys */

  @Column({
    type: DataType.STRING,
    field: 'MONTO_LETRAS'
  })
  amountInWords: string;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_PLAZO_HASTA'
  })
  deadlineEndDate: Date;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_PLAZO_DESDE'
  })
  deadlineStartDate: Date;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_INS'
  })
  insertionDate: Date;

  @Column({
    type: DataType.FLOAT,
    field: 'CANTIDAD_PAGO',
    allowNull: true
  })
  paymentAmount: number | null;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_ORDEN_PAGO'
  })
  paymentOrderDate: Date;

  @Column({
    type: DataType.STRING,
    field: 'NUMERO_ORDEN_PAGO'
  })
  paymentOrderNumber: string;

  @Column({
    type: DataType.STRING,
    field: 'MOTIVO',
    allowNull: true
  })
  reason: string | null;

  @Column({
    type: DataType.INTEGER,
    field: 'NUMERO_COMPROBANTE',
    allowNull: true
  })
  receiptNumber: number | null;

  @Column({
    type: DataType.STRING,
    field: 'TITULO_REPORTE'
  })
  reportTitle: string;

  @Column({
    type: DataType.STRING,
    field: 'STATUS',
    allowNull: true
  })
  status: string | null;

  @Column({
    type: DataType.STRING,
    field: 'DIRECCION_AGENTE_RETENCION',
    allowNull: true
  })
  withholdingAgentAddress: string | null;

  @Column({
    type: DataType.STRING,
    field: 'NOMBRE_AGENTE_RETENCION',
    allowNull: true
  })
  withholdingAgentName: string | null;

  @Column({
    type: DataType.STRING,
    field: 'TELEFONO_AGENTE_RETENCION',
    allowNull: true
  })
  withholdingAgentPhone: string | null;

  @Column({
    type: DataType.STRING,
    field: 'RIF_AGENTE_RETENCION',
    allowNull: true
  })
  withholdingAgentRIF: string | null;


  /* Associations */

  @BelongsTo(() => DescriptiveModel, {
    foreignKey: 'TIPO_ORDEN_PAGO_ID',
    as: 'paymentOrderType'
  })
  paymentOrderType: DescriptiveModel;

  @BelongsTo(() => DescriptiveModel, {
    foreignKey: 'FRECUENCIA_PAGO_ID',
    as: 'paymentFrequency'
  })
  paymentFrequency: DescriptiveModel;

  @BelongsTo(() => SupplierModel, {
    foreignKey: 'CODIGO_PROVEEDOR',
    as: 'supplier'
  })
  supplier: SupplierModel;

  @HasMany(() => PucPaymentOrderModel, {
    foreignKey: 'CODIGO_ORDEN_PAGO'
  })
  pucPaymentOrders: PucPaymentOrderModel[];

  @HasMany(() => WithholdingOpModel, {
    foreignKey: 'CODIGO_ORDEN_PAGO'
  })
  withholdingOps: WithholdingOpModel[];

  @HasMany(() => DocumentModel, {
    foreignKey: 'CODIGO_ORDEN_PAGO'
  })
  documents: DocumentModel[];

  @HasOne(() => CommitmentModel, {
    foreignKey: 'CODIGO_ORDEN_PAGO'
  })
  commitment: CommitmentModel;

  /* Associations */
}