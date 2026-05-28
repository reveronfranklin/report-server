export interface IPaymentBatchOriginRaw {
  noCuenta:         string;
  monto:            number;
  codigoCheque:     number;
  fechaCheque:      Date | string;
  numeroCheque:     number;
  nombre:           string;
  montoOpIcpPuc:    number;
  detalleOpIcpPuc:  string;
  codigoLotePago:   number;
  pagarALaOrdenDe:  string;
  motivo:           string;
  tituloReporte?:   string;
  montoImpRet:      number;
}