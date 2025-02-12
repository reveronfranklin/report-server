import { Model, Table, Column, ForeignKey, BelongsTo, Scopes, DataType } from 'sequelize-typescript';
import { DocumentModel } from './document.model';
import { WithholdingModel } from './withholding.model';
import { DescriptiveModel } from './descriptive.model';

@Scopes(() => ({
  withISLR: {
    include: [{
      model: DescriptiveModel,
      as: 'TIPO_RETENCION',
      where: {
        CODIGO: 'ISLR'
      },
      attributes: [
        'CODIGO'
      ]
    }]
  }
}))

@Table({
  schema: 'public',
  tableName: 'ADM_IMPUESTOS_DOCUMENTOS_OP',
  timestamps: false // Desactiva los timestamps
})
export class TaxDocumentModel extends Model<TaxDocumentModel> {
  @Column({
    primaryKey: true,
    field: 'CODIGO_IMPUESTO_DOCUMENTO_OP'
  })
  CODIGO_IMPUESTO_DOCUMENTO_OP!: number;

  /* Foreing Keys */

  @ForeignKey(() => DocumentModel)
  @Column({
    field: 'CODIGO_DOCUMENTO_OP'
  })
  CODIGO_DOCUMENTO_OP!: number;

  @ForeignKey(() => WithholdingModel)
  @Column({
    field: 'CODIGO_RETENCION'
  })
  CODIGO_RETENCION!: number;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_RETENCION_ID'
  })
  TIPO_RETENCION_ID!: number;

  /* Foreing Keys */

  /* Associations */

  @BelongsTo(() => DocumentModel, { foreignKey: 'CODIGO_DOCUMENTO_OP', as: 'DOCUMENT' })
  DOCUMENT: DocumentModel;

  @BelongsTo(() => WithholdingModel, { foreignKey: 'CODIGO_RETENCION', as: 'WITHHOLDING' })
  WITHHOLDING: WithholdingModel;

  @BelongsTo(() => DescriptiveModel, 'TIPO_RETENCION_ID')
  TIPO_RETENCION: DescriptiveModel;

  /* Associations */

  @Column({
    field: 'TIPO_IMPUESTO_ID'
  })
  TIPO_IMPUESTO_ID!: number;

  @Column({
    field: 'PERIODO_IMPOSITIVO'
  })
  PERIODO_IMPOSITIVO!: string;

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
  CODIGO_EMPRESA!: number;
}