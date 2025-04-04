import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { IDocument } from '../../../domain/interfaces/document.interface';
import { PaymentOrderModel } from './payment-order.model';
import { TaxDocumentModel } from './tax-document.model';
import { DescriptiveModel } from './descriptive.model';

@Table({
  schema: 'public',
  tableName: 'ADM_DOCUMENTOS_OP',
  timestamps: false // Desactiva los timestamps
})
export class DocumentModel extends Model<DocumentModel> implements IDocument {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    field: 'CODIGO_DOCUMENTO_OP'
  })
  documentOperationCode!: number | null;

  /* Foreing Keys */

  @ForeignKey(() => PaymentOrderModel)
  @Column({
    field: 'CODIGO_ORDEN_PAGO'
  })
  paymentOrderCode!: number | null;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_DOCUMENTO_ID'
  })
  documentTypeId!: string | null;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_OPERACION_ID'
  })
  operationTypeId!: string | null;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_IMPUESTO_ID'
  })
  taxTypeId!: string | null;

  /* Foreing Keys */


  @Column({
    field: 'NUMERO_DOCUMENTO_AFECTADO'
  })
  affectedDocumentNumber!: string | null;

  @Column({
    field: 'MONTO_DOCUMENTO',
    type: DataType.INTEGER
  })
  documentAmount!: number | null;

  @Column({
    field: 'NUMERO_CONTROL_DOCUMENTO'
  })
  documentControlNumber!: string | null;

  @Column({
    field: 'FECHA_DOCUMENTO',
    type: DataType.DATE
  })
  documentDate!: Date | null;

  @Column({
    field: 'NUMERO_DOCUMENTO'
  })
  documentNumber!: string | null;

  @Column({
    field: 'MONTO_IMPUESTO_EXENTO',
    type: DataType.DECIMAL(18, 2)
  })
  exemptTaxAmount!: number | null;

  @Column({
    field: 'BASE_IMPONIBLE',
    type: DataType.DECIMAL(18, 2)
  })
  taxableBase!: number | null;

  @Column({
    field: 'MONTO_IMPUESTO',
    type: DataType.DECIMAL(18, 2)
  })
  taxAmount!: number | null;

  @Column({
    field: 'TIPO_TRANSACCION_ID'
  })
  transactionTypeId!: string | null;

  @Column({
    field: 'MONTO_RETENIDO',
    type: DataType.DECIMAL(18, 2)
  })
  withheldAmount!: number | null;


  /* Associations */

  @BelongsTo(() => PaymentOrderModel, {
    foreignKey: 'CODIGO_ORDEN_PAGO',
    as: 'paymentOrder'
  })
  paymentOrder: PaymentOrderModel;

  @BelongsTo(() => DescriptiveModel, {
    foreignKey: 'TIPO_DOCUMENTO_ID',
    as: 'typeDocument'
  })
  typeDocument: DescriptiveModel;

  @BelongsTo(() => DescriptiveModel, {
    foreignKey: 'TIPO_IMPUESTO_ID',
    as: 'taxType'
  })
  taxType: DescriptiveModel;

  @HasOne(() => TaxDocumentModel, {
    foreignKey: 'CODIGO_DOCUMENTO_OP',
    as: 'taxDocument'
  })
  taxDocument: TaxDocumentModel;

  /* Associations */
}