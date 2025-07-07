import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
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
  commitmentCode: number;

  @Column({
    type: DataType.STRING,
    field: 'NUMERO_COMPROMISO'
  })
  commitmentNumber: string;

  @Column({
    type: DataType.DATE,
    field: 'FECHA_COMPROMISO'
  })
  commitmentDate: Date;


  /* Associations */

  @HasOne(() => CommitmentModel, {
    foreignKey: 'CODIGO_IDENTIFICADOR',
    as: 'commitment'
  })
  commitment: CommitmentModel;

  /* Associations */
}