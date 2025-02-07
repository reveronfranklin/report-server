import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { IDocument } from '../../../domain/interfaces/document.interface';
import { PaymentOrderModel } from './payment-order.model';
import { TaxDocumentModel } from './tax-document.model';

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
  CODIGO_DOCUMENTO_OP!: number;

  /* Foreing Keys */

  @ForeignKey(() => PaymentOrderModel)
  @Column({ field: 'CODIGO_ORDEN_PAGO' })
  CODIGO_ORDEN_PAGO!: number;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => PaymentOrderModel, { foreignKey: 'CODIGO_ORDEN_PAGO', as: 'PAYMENT_ORDER' })
  PAYMENT_ORDER: PaymentOrderModel;

  @HasOne(() => TaxDocumentModel, { foreignKey: 'CODIGO_DOCUMENTO_OP', as: 'TAX_DOCUMENT' })
  TAX_DOCUMENT: TaxDocumentModel;

  /* Associations */

  @Column({
    field: 'FECHA_COMPROBANTE',
    type: DataType.DATE
  })
  FECHA_COMPROBANTE!: Date;

  @Column({
    field: 'PERIODO_IMPOSITIVO'
  })
  PERIODO_IMPOSITIVO!: string;

  @Column({
    field: 'TIPO_OPERACION_ID'
  })
  TIPO_OPERACION_ID!: string;

  @Column({
    field: 'TIPO_DOCUMENTO_ID'
  })
  TIPO_DOCUMENTO_ID!: string;

  @Column({
    field: 'FECHA_DOCUMENTO',
    type: DataType.DATE
  })
  FECHA_DOCUMENTO!: Date;

  @Column({
    field: 'NUMERO_DOCUMENTO'
  })
  NUMERO_DOCUMENTO!: string;

  @Column({
    field: 'NUMERO_CONTROL_DOCUMENTO'
  })
  NUMERO_CONTROL_DOCUMENTO!: string;

  @Column({
    field: 'MONTO_DOCUMENTO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_DOCUMENTO!: number;

  @Column({
    field: 'BASE_IMPONIBLE',
    type: DataType.DECIMAL(18, 2)
  })
  BASE_IMPONIBLE!: number;

  @Column({
    field: 'MONTO_IMPUESTO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_IMPUESTO!: number;

  @Column({
    field: 'NUMERO_DOCUMENTO_AFECTADO'
  })
  NUMERO_DOCUMENTO_AFECTADO!: string;

  @Column({
    field: 'TIPO_TRANSACCION_ID'
  })
  TIPO_TRANSACCION_ID!: string;

  @Column({
    field: 'TIPO_IMPUESTO_ID'
  })
  TIPO_IMPUESTO_ID!: string;

  @Column({
    field: 'MONTO_IMPUESTO_EXENTO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_IMPUESTO_EXENTO!: number;

  @Column({
    field: 'MONTO_RETENIDO',
    type: DataType.DECIMAL(18, 2)
  })
  MONTO_RETENIDO!: number;

  @Column({
    field: 'EXTRA1'
  })
  EXTRA1!: string;

  @Column({
    field: 'EXTRA2'
  })
  EXTRA2!: string;

  @Column({
    field: 'EXTRA3'
  })
  EXTRA3!: string;

  @Column({
    field: 'USUARIO_INS'
  })
  USUARIO_INS!: string;

  @Column({
    field: 'FECHA_INS',
    type: DataType.DATE
  })
  FECHA_INS!: Date;

  @Column({
    field: 'USUARIO_UPD'
  })
  USUARIO_UPD!: string;

  @Column({
    field: 'FECHA_UPD',
    type: DataType.DATE
  })
  FECHA_UPD!: Date;

  @Column({
    field: 'CODIGO_EMPRESA'
  })
  CODIGO_EMPRESA!: string;

  @Column({
    field: 'CODIGO_PRESUPUESTO'
  })
  CODIGO_PRESUPUESTO!: string;

  @Column({
    field: 'NUMERO_EXPEDIENTE'
  })
  NUMERO_EXPEDIENTE!: string;

  @Column({
    field: 'ESTATUS_FISCO_ID'
  })
  ESTATUS_FISCO_ID!: string;
}