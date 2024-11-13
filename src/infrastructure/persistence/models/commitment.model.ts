import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ICommitment } from '../../../domain/interfaces/commitment.interface';

@Table({
  schema: 'public',
  tableName: 'ADM_COMPROMISO_OP',
  timestamps: false
})
export class CommitmentModel extends Model<CommitmentModel> implements ICommitment {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_COMPROMISO_OP'
  })
  CODIGO_COMPROMISO_OP: number;

  @Column({
    type: DataType.INTEGER,
    field: 'ORIGEN_COMPROMISO_ID'
  })
  ORIGEN_COMPROMISO_ID: number;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_IDENTIFICADOR'
  })
  CODIGO_IDENTIFICADOR: string;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_ORDEN_PAGO',
    allowNull: true
  })
  CODIGO_ORDEN_PAGO: number | null;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_PROVEEDOR'
  })
  CODIGO_PROVEEDOR: number;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA1',
    allowNull: true
  })
  EXTRA1: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA2',
    allowNull: true
  })
  EXTRA2: string | null;

  @Column({
    type: DataType.STRING,
    field: 'EXTRA3',
    allowNull: true
  })
  EXTRA3: string | null;

  @Column({
    type: DataType.INTEGER,
    field: 'USUARIO_INS'
  })
  USUARIO_INS: number;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_INS'
  })
  FECHA_INS: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'USUARIO_UPD'
  })
  USUARIO_UPD: number;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_UPD'
  })
  FECHA_UPD: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_EMPRESA'
  })
  CODIGO_EMPRESA: number;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_PRESUPUESTO'
  })
  CODIGO_PRESUPUESTO: number;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_VAL_CONTRATO',
    allowNull: true
  })
  CODIGO_VAL_CONTRATO: number | null;
}