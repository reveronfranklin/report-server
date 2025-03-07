import { Model, Table, Column, ForeignKey, BelongsTo, Scopes, DataType } from 'sequelize-typescript';
import { DocumentModel } from './document.model';
import { WithholdingModel } from './withholding.model';
import { DescriptiveModel } from './descriptive.model';

@Scopes(() => ({
  withISLR: {
    include: [{
      model: DescriptiveModel,
      as: 'retentionType',
      where: {
        code: 'ISLR'
      },
      attributes: [
        'code'
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
  taxDocumentOperationCode!: number;

  /* Foreing Keys */

  @ForeignKey(() => DocumentModel)
  @Column({
    field: 'CODIGO_DOCUMENTO_OP'
  })
  documentOperationCode!: number;

  @ForeignKey(() => WithholdingModel)
  @Column({
    field: 'CODIGO_RETENCION'
  })
  retentionCode!: number;

  @ForeignKey(() => DescriptiveModel)
  @Column({
    field: 'TIPO_RETENCION_ID'
  })
  retentionTypeId!: number;

  /* Foreing Keys */


  @Column({
    field: 'MONTO_IMPUESTO_EXENTO',
    type: DataType.DECIMAL(18, 2)
  })
  exemptTaxAmount!: number;

  @Column({
    field: 'BASE_IMPONIBLE',
    type: DataType.DECIMAL(18, 2)
  })
  taxableBase!: number;

  @Column({
    field: 'MONTO_IMPUESTO',
    type: DataType.DECIMAL(18, 2)
  })
  taxAmount!: number;


  /* Associations */

  @BelongsTo(() => DocumentModel, {
    foreignKey: 'CODIGO_DOCUMENTO_OP',
    as: 'document'
  })
  document: DocumentModel;

  @BelongsTo(() => WithholdingModel, {
    foreignKey: 'CODIGO_RETENCION',
    as: 'withholding'
  })
  withholding: WithholdingModel;

  @BelongsTo(() => DescriptiveModel, 'TIPO_RETENCION_ID')
  retentionType: DescriptiveModel;

  /* Associations */
}