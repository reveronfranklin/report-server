import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { IBalance } from '../../../domain/interfaces/balance.interface';
import { PucPaymentOrderModel } from './puc-payment-order.model';

@Table({
  schema: 'public',
  tableName: 'PRE_V_SALDOS',
  timestamps: false
})
export class BalanceModel extends Model<BalanceModel> implements IBalance {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CODIGO_SALDO'
  })
  CODIGO_SALDO: number;

  /* Associations */

  @HasOne(() => PucPaymentOrderModel, { foreignKey: 'CODIGO_SALDO', as: 'PUC_PAYMENT_ORDER' })
  PUC_PAYMENT_ORDER: PucPaymentOrderModel;

  /* Associations */

  @Column({
    type: DataType.INTEGER,
    field: 'ANO'
  })
  ANO: number;

  @Column({
    type: DataType.INTEGER,
    field: 'FINANCIADO_ID'
  })
  FINANCIADO_ID: number;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_FINANCIADO'
  })
  CODIGO_FINANCIADO: string;

  @Column({
    type: DataType.STRING,
    field: 'DESCRIPCION_FINANCIADO'
  })
  DESCRIPCION_FINANCIADO: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_ICP'
  })
  CODIGO_ICP: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_SECTOR'
  })
  CODIGO_SECTOR: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_PROGRAMA'
  })
  CODIGO_PROGRAMA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_SUBPROGRAMA'
  })
  CODIGO_SUBPROGRAMA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_PROYECTO'
  })
  CODIGO_PROYECTO: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_ACTIVIDAD'
  })
  CODIGO_ACTIVIDAD: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_OFICINA'
  })
  CODIGO_OFICINA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_ICP_CONCAT'
  })
  CODIGO_ICP_CONCAT: string;

  @Column({
    type: DataType.STRING,
    field: 'DENOMINACION_ICP'
  })
  DENOMINACION_ICP: string;

  @Column({
    type: DataType.STRING,
    field: 'UNIDAD_EJECUTORA'
  })
  UNIDAD_EJECUTORA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_PUC'
  })
  CODIGO_PUC: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_GRUPO'
  })
  CODIGO_GRUPO: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_PARTIDA'
  })
  CODIGO_PARTIDA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_GENERICA'
  })
  CODIGO_GENERICA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_ESPECIFICA'
  })
  CODIGO_ESPECIFICA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_SUBESPECIFICA'
  })
  CODIGO_SUBESPECIFICA: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_NIVEL5'
  })
  CODIGO_NIVEL5: string;

  @Column({
    type: DataType.STRING,
    field: 'CODIGO_PUC_CONCAT'
  })
  CODIGO_PUC_CONCAT: string;

  @Column({
    type: DataType.STRING,
    field: 'DENOMINACION_PUC'
  })
  DENOMINACION_PUC: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'PRESUPUESTADO'
  })
  PRESUPUESTADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'ASIGNACION'
  })
  ASIGNACION: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'BLOQUEADO'
  })
  BLOQUEADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'MODIFICADO'
  })
  MODIFICADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'AJUSTADO'
  })
  AJUSTADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'VIGENTE'
  })
  VIGENTE: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'COMPROMETIDO'
  })
  COMPROMETIDO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'POR_COMPROMETIDO'
  })
  POR_COMPROMETIDO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'DISPONIBLE'
  })
  DISPONIBLE: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'CAUSADO'
  })
  CAUSADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'POR_CAUSADO'
  })
  POR_CAUSADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'PAGADO'
  })
  PAGADO: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    field: 'POR_PAGADO'
  })
  POR_PAGADO: number;

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
    type: DataType.DATE,
    field: 'FECHA_SOLICITUD'
  })
  FECHA_SOLICITUD: Date;

  @Column({
    type: DataType.STRING,
    field: 'DESCRIPTIVA_FINANCIADO'
  })
  DESCRIPTIVA_FINANCIADO: string;

  @Column({
    type: DataType.STRING,
    field: 'SEARCH_TEXT'
  })
  SEARCH_TEXT: string;
}