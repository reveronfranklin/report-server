import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IBeneficiary } from '../../domain/interfaces/beneficiary.interface';
import { SupplierModel } from './supplier.model';

@Table({
  schema: 'public',
  tableName: 'ADM_CONTACTO_PROVEEDOR',
  timestamps: false // Desactiva los timestamps
})
export class BeneficiaryModel extends Model<BeneficiaryModel> implements IBeneficiary {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_CONTACTO_PROVEEDOR'
  })
  CODIGO_CONTACTO_PROVEEDOR: number;

  @ForeignKey(() => SupplierModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'CODIGO_PROVEEDOR'
  })
  CODIGO_PROVEEDOR: number;

  @BelongsTo(() => SupplierModel, {
    foreignKey: 'CODIGO_PROVEEDOR',
    as: 'SUPPLIER'
  })
  SUPPLIER: SupplierModel;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'NOMBRE'
  })
  NOMBRE: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'APELLIDO'
  })
  APELLIDO: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'IDENTIFICACION_ID'
  })
  IDENTIFICACION_ID: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'IDENTIFICACION'
  })
  IDENTIFICACION: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'SEXO'
  })
  SEXO: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'TIPO_CONTACTO_ID'
  })
  TIPO_CONTACTO_ID: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'PRINCIPAL'
  })
  PRINCIPAL: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA1'
  })
  EXTRA1: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA2'
  })
  EXTRA2: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'EXTRA3'
  })
  EXTRA3: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'USUARIO_INS'
  })
  USUARIO_INS: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'FECHA_INS'
  })
  FECHA_INS: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'USUARIO_UPD'
  })
  USUARIO_UPD: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'FECHA_UPD'
  })
  FECHA_UPD: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'CODIGO_EMPRESA'
  })
  CODIGO_EMPRESA: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'CODIGO_PRESUPUESTO'
  })
  CODIGO_PRESUPUESTO: number | null;
}