export interface IReplicatePaymentOrder {
  replicatePaymentOrder(codigoOrdenPago: number): Promise<ReplicatePaymentOrderResult>;
  existCodigoOrdenPago(codigoOrdenPago: number): Promise<boolean>;
}

export interface ReplicatePaymentOrderResult {
  data: boolean;
  isValid: boolean;
  linkData: any | null;
  linkDataArlternative: any | null;
  message: string;
  page: number;
  totalPage: number;
  cantidadRegistros: number;
  total1: number;
  total2: number;
  total3: number;
  total4: number;
}