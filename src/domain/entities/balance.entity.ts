import { IBalance } from '../interfaces/balance.interface';

export class Balance implements IBalance {
  constructor(
    public CODIGO_SALDO: number,
    public ANO: number,
    public FINANCIADO_ID: number,
    public CODIGO_FINANCIADO: string,
    public DESCRIPCION_FINANCIADO: string,
    public CODIGO_ICP: string,
    public CODIGO_SECTOR: string,
    public CODIGO_PROGRAMA: string,
    public CODIGO_SUBPROGRAMA: string,
    public CODIGO_PROYECTO: string,
    public CODIGO_ACTIVIDAD: string,
    public CODIGO_OFICINA: string,
    public CODIGO_ICP_CONCAT: string,
    public DENOMINACION_ICP: string,
    public UNIDAD_EJECUTORA: string,
    public CODIGO_PUC: string,
    public CODIGO_GRUPO: string,
    public CODIGO_PARTIDA: string,
    public CODIGO_GENERICA: string,
    public CODIGO_ESPECIFICA: string,
    public CODIGO_SUBESPECIFICA: string,
    public CODIGO_NIVEL5: string,
    public CODIGO_PUC_CONCAT: string,
    public DENOMINACION_PUC: string,
    public PRESUPUESTADO: number,
    public ASIGNACION: number,
    public BLOQUEADO: number,
    public MODIFICADO: number,
    public AJUSTADO: number,
    public VIGENTE: number,
    public COMPROMETIDO: number,
    public POR_COMPROMETIDO: number,
    public DISPONIBLE: number,
    public CAUSADO: number,
    public POR_CAUSADO: number,
    public PAGADO: number,
    public POR_PAGADO: number,
    public CODIGO_EMPRESA: number,
    public CODIGO_PRESUPUESTO: number,
    public FECHA_SOLICITUD: Date,
    public DESCRIPTIVA_FINANCIADO: string,
    public SEARCH_TEXT: string
  ) {}
}