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
  CODIGO_DOCUMENTO_OP!: number | null;

  /* Foreing Keys */

  @ForeignKey(() => PaymentOrderModel)
  @Column({ field: 'CODIGO_ORDEN_PAGO' })
  CODIGO_ORDEN_PAGO!: number | null;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_DOCUMENTO_ID'
  })
  TIPO_DOCUMENTO_ID!: string | null;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_OPERACION_ID'
  })
  TIPO_OPERACION_ID!: string | null;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_IMPUESTO_ID'
  })
  TIPO_IMPUESTO_ID!: string | null;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => PaymentOrderModel, { foreignKey: 'CODIGO_ORDEN_PAGO', as: 'PAYMENT_ORDER' })
  PAYMENT_ORDER: PaymentOrderModel;

  @BelongsTo(() => DescriptiveModel, { foreignKey: 'TIPO_DOCUMENTO_ID', as: 'TYPE_DOCUMENT' })
  TYPE_DOCUMENT: DescriptiveModel;

  @BelongsTo(() => DescriptiveModel, { foreignKey: 'TIPO_IMPUESTO_ID', as: 'TAX_TYPE' })
  TAX_TYPE: DescriptiveModel;

  @HasOne(() => TaxDocumentModel, { foreignKey: 'CODIGO_DOCUMENTO_OP', as: 'TAX_DOCUMENT' })
  TAX_DOCUMENT: TaxDocumentModel;

  /* Associations */

  @Column({
    field: 'FECHA_COMPROBANTE',
    type: DataType.DATE
  })
  FECHA_COMPROBANTE!: Date | null;

  @Column({
    field: 'PERIODO_IMPOSITIVO'
  })
  PERIODO_IMPOSITIVO!: string | null;

  @Column({
    field: 'FECHA_DOCUMENTO',
    type: DataType.DATE
  })
  FECHA_DOCUMENTO!: Date | null;

  @Column({
    field: 'NUMERO_DOCUMENTO'
  })
  NUMERO_DOCUMENTO!: string | null;

  @Column({
    field: 'NUMERO_CONTROL_DOCUMENTO'
  })
  NUMERO_CONTROL_DOCUMENTO!: string | null;

  @Column({
    field: 'MONTO_DOCUMENTO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_DOCUMENTO!: number | null;

  @Column({
    field: 'BASE_IMPONIBLE',
    type: DataType.DECIMAL(18, 2)
  })
  BASE_IMPONIBLE!: number | null;

  @Column({
    field: 'MONTO_IMPUESTO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_IMPUESTO!: number | null;

  @Column({
    field: 'NUMERO_DOCUMENTO_AFECTADO'
  })
  NUMERO_DOCUMENTO_AFECTADO!: string | null;

  @Column({
    field: 'TIPO_TRANSACCION_ID'
  })
  TIPO_TRANSACCION_ID!: string | null;

  @Column({
    field: 'MONTO_IMPUESTO_EXENTO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_IMPUESTO_EXENTO!: number | null;

  @Column({
    field: 'MONTO_RETENIDO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_RETENIDO!: number | null;

  @Column({
    field: 'EXTRA1'
  })
  EXTRA1!: string | null;

  @Column({
    field: 'EXTRA2'
  })
  EXTRA2!: string | null;

  @Column({
    field: 'EXTRA3'
  })
  EXTRA3!: string | null;

  @Column({
    field: 'USUARIO_INS'
  })
  USUARIO_INS!: string | null;

  @Column({
    field: 'FECHA_INS',
    type: DataType.DATE
  })
  FECHA_INS!: Date | null;

  @Column({
    field: 'USUARIO_UPD'
  })
  USUARIO_UPD!: string | null;

  @Column({
    field: 'FECHA_UPD',
    type: DataType.DATE
  })
  FECHA_UPD!: Date | null;

  @Column({
    field: 'CODIGO_EMPRESA'
  })
  CODIGO_EMPRESA!: string | null;

  @Column({
    field: 'CODIGO_PRESUPUESTO'
  })
  CODIGO_PRESUPUESTO!: string | null;

  @Column({
    field: 'NUMERO_EXPEDIENTE'
  })
  NUMERO_EXPEDIENTE!: string | null;

  @Column({
    field: 'ESTATUS_FISCO_ID'
  })
  ESTATUS_FISCO_ID!: string | null;
}