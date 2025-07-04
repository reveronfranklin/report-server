import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ReplicatePaymentOrderPort } from '../ports/replicate-payment-order.port';
import { IResponse } from '@interceptors/response.interface';

@Injectable()
export class ReplicatePaymentOrderAdapter extends ReplicatePaymentOrderPort {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    super();
  }

  async replicatePaymentOrder(codigoOrdenPago: number): Promise<IResponse<any>> {
    const apiAuthUrl = this.configService.get('api.ossmmasoft.authUrl')

    try {
      const response = await firstValueFrom(
        this.httpService.post<IResponse<any>>(`${apiAuthUrl}/AdmOrdenPago/Replicar`, { CodigoOrdenPago: codigoOrdenPago })
      );
      return response.data
    } catch (error) {
      console.error('Error al replicar la orden de pago:', error)
      return {
        data: false,
        isValid: false,
        linkData: null,
        linkDataArlternative: null,
        message: 'No se pudo replicar la orden de pago',
        page: 0,
        totalPage: 0,
        cantidadRegistros: 0,
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0
      }
    }
  }
}