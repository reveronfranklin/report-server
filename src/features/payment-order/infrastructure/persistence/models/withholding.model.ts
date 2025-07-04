import { Model, Table, Column, HasOne, HasMany, DataType } from 'sequelize-typescript';
import { TaxDocumentModel } from './tax-document.model';
import { WithholdingOpModel } from './withholding-op.model';

@Table({
  schema: 'public',
  tableName: 'ADM_RETENCIONES',
  timestamps: false // Desactiva los timestamps
})
export class WithholdingModel extends Model<WithholdingModel> {
  @Column({
    primaryKey: true,
    field: 'CODIGO_RETENCION'
  })
  retentionCode!: number;

  @Column({
    field: 'CONCEPTO_PAGO'
  })
  paymentConcept!: string;

  @Column({
    field: 'POR_RETENCION',
    type: DataType.INTEGER
  })
  byRetention!: number;

  /* Associations */

  @HasOne(() => TaxDocumentModel, {
    foreignKey: 'CODIGO_RETENCION',
    as: 'taxDocument'
  })
  taxDocument: TaxDocumentModel;

  @HasMany(() => WithholdingOpModel, {
    foreignKey: 'CODIGO_RETENCION',
    as: 'withholdingOps'
  })
  withholdingOps: WithholdingOpModel[];

  /* Associations */
}