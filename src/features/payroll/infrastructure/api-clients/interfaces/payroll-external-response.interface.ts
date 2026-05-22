export interface IExternalPayrollResponse {
  data: IExternalPayrollData;
  isValid: boolean;
  linkData: string | null;
  linkDataArlternative: string | null;
  message: string;
  page: number;
  totalPage: number;
  cantidadRegistros: number;
  total1: number;
  total2: number;
  total3: number;
  total4: number;
}

export interface IExternalPayrollData {
  general: IExternalGeneralConcept[];
  detalle: IExternalPayrollDetail[];
  firma: IExternalSignature[];
}

export interface IExternalGeneralConcept {
  rTipoConcepto: string;
  rNumeroConcepto: string;
  rDenominacionConcepto: string;
  rAsignacion: number;
  rDeduccion: number;
  rMontoVisible: number;
  rMonto: number;
  rDeducible: number;
}

export interface IExternalPayrollDetail {
  fechaPeriodoNomina: string;
  fechaEmisionNomina: string;
  codigoPeriodo: number;
  codigoTipoNomina: number;
  codigoOficina: string;
  codigoIcp: number;
  denominacion: string;
  denominacionCargo: string;
  cedula: string;
  nombre: string;
  noCuenta: string;
  numeroConcepto: string;
  tipoMovConcepto: string;
  denominacionConcepto: string;
  complementoConcepto: string;
  porcentaje: number;
  tipoConcepto: string;
  monto: number;
  asignacion: number;
  deduccion: number;
  status: string;
  descripcionStatus: string;
  codigoPersona: number;
  fechaIngreso: string;
  cargoCodigo: string;
  banco: string;
  codigoConcepto: number;
  modulo: string;
  codigoIdentificador: string;
}

export interface IExternalSignature {
  oficina: string;
  orden: string;
  codigoPersona: number;
  nombre: string;
  apellido: string;
  cedula: string;
  descripcionCargo: string;
}