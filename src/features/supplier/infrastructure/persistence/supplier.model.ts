import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ISupplier } from '../../domain/interfaces/supplier.interface';
import { PaymentOrderModel } from '../../../payment-order/infrastructure/persistence/payment-order.model';
import { BeneficiaryModel } from '../../../beneficiary/infrastructure/persistence/beneficiary.model';

@Table({
  schema: 'public',
  tableName: 'ADM_PROVEEDORES',
  timestamps: false // Desactiva los timestamps
})
export class SupplierModel extends Model<SupplierModel> implements ISupplier {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_PROVEEDOR'
  })
  CODIGO_PROVEEDOR: number;

  /* Associations */

  @HasMany(() => PaymentOrderModel, { foreignKey: 'CODIGO_PROVEEDOR' })
  PAYMENT_ORDERS: PaymentOrderModel[];

  @HasMany(() => BeneficiaryModel, {
    foreignKey: 'CODIGO_PROVEEDOR',
    as: 'BENEFICIARIES'
  })
  BENEFICIARIES: BeneficiaryModel[];

  /* Associations */

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'NOMBRE_PROVEEDOR'
  })
  NOMBRE_PROVEEDOR: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'TIPO_PROVEEDOR_ID'
  })
  TIPO_PROVEEDOR_ID: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'NACIONALIDAD'
  })
  NACIONALIDAD: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'CEDULA'
  })
  CEDULA: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'RIF'
  })
  RIF: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'FECHA_RIF'
  })
  FECHA_RIF: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'NIT'
  })
  NIT: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'FECHA_NIT'
  })
  FECHA_NIT: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'NUMERO_REGISTRO_CONTRALORIA'
  })
  NUMERO_REGISTRO_CONTRALORIA: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'FECHA_REGISTRO_CONTRALORIA'
  })
  FECHA_REGISTRO_CONTRALORIA: Date | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'CAPITAL_PAGADO'
  })
  CAPITAL_PAGADO: number | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'CAPITAL_SUSCRITO'
  })
  CAPITAL_SUSCRITO: number | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'TIPO_IMPUESTO_ID'
  })
  TIPO_IMPUESTO_ID: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'STATUS'
  })
  STATUS: string;

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
    field: 'CODIGO_PERSONA'
  })
  CODIGO_PERSONA: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'CODIGO_AUXILIAR_GASTO_X_PAGAR'
  })
  CODIGO_AUXILIAR_GASTO_X_PAGAR: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'CODIGO_AUXILIAR_ORDEN_PAGO'
  })
  CODIGO_AUXILIAR_ORDEN_PAGO: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'ESTATUS_FISCO_ID'
  })
  ESTATUS_FISCO_ID: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'NUMERO_CUENTA'
  })
  NUMERO_CUENTA: string | null;
}