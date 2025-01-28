import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'ADM_IMPUESTOS_DOCUMENTOS_OP', schema: 'public' })
export class TaxesDocumentModel extends Model<TaxesDocumentModel> {
  @Column({ primaryKey: true, field: 'CODIGO_IMPUESTO_DOCUMENTO_OP' })
  CODIGO_IMPUESTO_DOCUMENTO_OP!: string;

  @Column({ field: 'CODIGO_DOCUMENTO_OP' })
  CODIGO_DOCUMENTO_OP!: string;

  @Column({ field: 'CODIGO_RETENCION' })
  CODIGO_RETENCION!: string;

  @Column({ field: 'TIPO_RETENCION_ID' })
  TIPO_RETENCION_ID!: string;

  @Column({ field: 'TIPO_IMPUESTO_ID' })
  TIPO_IMPUESTO_ID!: string;

  @Column({ field: 'PERIODO_IMPOSITIVO' })
  PERIODO_IMPOSITIVO!: string;

  @Column({ field: 'BASE_IMPONIBLE', type: DataType.DECIMAL(18, 2) })
  BASE_IMPONIBLE!: number;

  @Column({ field: 'MONTO_IMPUESTO', type: DataType.DECIMAL(18, 2) })
  MONTO_IMPUESTO!: number;

  @Column({ field: 'MONTO_IMPUESTO_EXENTO', type: DataType.DECIMAL(18, 2) })
  MONTO_IMPUESTO_EXENTO!: number;

  @Column({ field: 'MONTO_RETENIDO', type: DataType.DECIMAL(18, 2) })
  MONTO_RETENIDO!: number;

  @Column({ field: 'EXTRA1' })
  EXTRA1!: string;

  @Column({ field: 'EXTRA2' })
  EXTRA2!: string;

  @Column({ field: 'EXTRA3' })
  EXTRA3!: string;

  @Column({ field: 'USUARIO_INS' })
  USUARIO_INS!: string;

  @Column({ field: 'FECHA_INS', type: DataType.DATE })
  FECHA_INS!: Date;

  @Column({ field: 'USUARIO_UPD' })
  USUARIO_UPD!: string;

  @Column({ field: 'FECHA_UPD', type: DataType.DATE })
  FECHA_UPD!: Date;

  @Column({ field: 'CODIGO_EMPRESA' })
  CODIGO_EMPRESA!: string;
}