export interface IPaymentBatches {
    codigoLotePago:    number;
    codigoCheque:      number;
    numeroCheque:      number;
    fechaCheque:       Date;
    nombre:            string;
    noCuenta:          string;
    pagarALaOrdenDe:   string;
    motivo:            string;
    monto:             number;
    endoso:            string;
    usuarioIns:        string;
    codigoProveedor:   number;
    detalleOpIcpPuc:   string;
    montoOpIcpPuc:     number;
    detalleImpRet:     null;
    montoImpRet:       number;
    codigoPresupuesto: number;
}
