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
  CODIGO_RETENCION!: number;

  /* Associations */

  @HasOne(() => TaxDocumentModel, { foreignKey: 'CODIGO_RETENCION', as: 'TAX_DOCUMENT' })
  TAX_DOCUMENT: TaxDocumentModel;

  @HasMany(() => WithholdingOpModel, { foreignKey: 'CODIGO_RETENCION', as: 'WITHHOLDING_OPS' })
  WITHHOLDING_OPS: WithholdingOpModel[];

  /* Associations */


  @Column({
    field: 'TIPO_RETENCION_ID'
  })
  TIPO_RETENCION_ID!: number;

  @Column({
    field: 'CONCEPTO_PAGO'
  })
  CONCEPTO_PAGO!: string;

  @Column({
    field: 'TIPO_PERSONA_ID'
  })
  TIPO_PERSONA_ID!: number;

  @Column({
    field: 'BASE_IMPONIBLE',
    type: DataType.INTEGER
  })
  BASE_IMPONIBLE!: number;

  @Column({
    field: 'POR_RETENCION',
    type: DataType.INTEGER
  })
  POR_RETENCION!: number;

  @Column({
    field: 'MONTO_RETENCION',
    type: DataType.INTEGER
  })
  MONTO_RETENCION!: number;

  @Column({
    field: 'FECHA_INI',
    type: DataType.DATE
  })
  FECHA_INI!: Date;

  @Column({
    field: 'FECHA_FIN',
    type: DataType.DATE
  })
  FECHA_FIN!: Date;

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
}