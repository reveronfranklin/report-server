import { Table, Column, Model, DataType, BelongsTo, HasOne } from 'sequelize-typescript';
import { IPreCommitment } from '../../../domain/interfaces/pre-commitment.interface';
import { CommitmentModel } from './commitment.model';

@Table({
  schema: 'public',
  tableName: 'PRE_COMPROMISOS',
  timestamps: false
})
export class PreCommitmentModel extends Model<PreCommitmentModel> implements IPreCommitment {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_COMPROMISO'
  })
  CODIGO_COMPROMISO: number;

  /* Associations */

  @HasOne(() => CommitmentModel, { foreignKey: 'CODIGO_IDENTIFICADOR', as: 'COMMITMENT' })
  COMMITMENT: CommitmentModel;

  /* Associations */

  @Column({
    type: DataType.INTEGER,
    field: 'ANO'
  })
  ANO: number;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_SOLICITUD'
  })
  CODIGO_SOLICITUD: number;

  @Column({
    type: DataType.STRING,
    field: 'NUMERO_COMPROMISO'
  })
  NUMERO_COMPROMISO: string;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_COMPROMISO'
  })
  FECHA_COMPROMISO: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_PROVEEDOR'
  })
  CODIGO_PROVEEDOR: number;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_ENTREGA'
  })
  FECHA_ENTREGA: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'CODIGO_DIR_ENTREGA'
  })
  CODIGO_DIR_ENTREGA: number;

  @Column({
    type: DataType.INTEGER,
    field: 'TIPO_PAGO_ID'
  })
  TIPO_PAGO_ID: number;

  @Column({
    type: DataType.STRING,
    field: 'MOTIVO'
  })
  MOTIVO: string;

  @Column({
    type: DataType.STRING,
    field: 'STATUS'
  })
  STATUS: string;

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
    type:
    DataType.STRING,
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
    field: 'TIPO_RENGLON_ID'
  })
  TIPO_RENGLON_ID: number;

  @Column({
    type: DataType.STRING,
    field: 'NUMERO_ORDEN'
  })
  NUMERO_ORDEN: string;

  @Column({
    type: DataType.STRING,
    field: 'SEARCH_TEXT'
  })
  SEARCH_TEXT: string;

  @Column({
    type: DataType.STRING,
    field: 'MONTO_LETRAS'
  })
  MONTO_LETRAS: string;

  @Column({
    type: DataType.STRING,
    field: 'FIRMANTE'
  })
  FIRMANTE: string;
}