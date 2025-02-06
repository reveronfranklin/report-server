import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'ADM_RETENCIONES', schema: 'public' })
export class WithholdingModel extends Model<WithholdingModel> {
  @Column({ primaryKey: true, field: 'CODIGO_RETENCION' })
  CODIGO_RETENCION!: string;

  @Column({ field: 'TIPO_RETENCION_ID' })
  TIPO_RETENCION_ID!: string;

  @Column({ field: 'CONCEPTO_PAGO' })
  CONCEPTO_PAGO!: string;

  @Column({ field: 'TIPO_PERSONA_ID' })
  TIPO_PERSONA_ID!: string;

  @Column({ field: 'BASE_IMPONIBLE', type: DataType.DECIMAL(18, 2) })
  BASE_IMPONIBLE!: number;

  @Column({ field: 'POR_RETENCION', type: DataType.DECIMAL(5, 2) })
  POR_RETENCION!: number;

  @Column({ field: 'MONTO_RETENCION', type: DataType.DECIMAL(18, 2) })
  MONTO_RETENCION!: number;

  @Column({ field: 'FECHA_INI', type: DataType.DATE })
  FECHA_INI!: Date;

  @Column({ field: 'FECHA_FIN', type: DataType.DATE })
  FECHA_FIN!: Date;

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