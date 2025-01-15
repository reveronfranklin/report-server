import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ReplicatePaymentOrderRepository } from '../../../domain/repositories/replicate-payment-order.repository';
import { ReplicatePaymentOrderResult } from '../../../domain/interfaces/replicate-payment-order.interface';
import { PaymentOrderRepository } from '../../persistence/repositories/payment-order.repository';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReplicatePaymentOrderAdapter implements ReplicatePaymentOrderRepository {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @Inject('IPaymentOrderRepository') private paymentOrderRepository: PaymentOrderRepository
  ) {}

  async replicatePaymentOrder(codigoOrdenPago: number): Promise<ReplicatePaymentOrderResult> {
    const apiAuthUrl = this.configService.get('api.ossmmasoft.authUrl')

    try {
      const response = await firstValueFrom(
        this.httpService.post<ReplicatePaymentOrderResult>(`${apiAuthUrl}/AdmOrdenPago/Replicar`, { CodigoOrdenPago: codigoOrdenPago })
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

  async existCodigoOrdenPago(codigoOrdenPago: number): Promise<boolean> {
    try {
      const result = await this.paymentOrderRepository.existPaymentOrder(codigoOrdenPago)
      return result
    } catch (error) {
      console.error('Error al verificar si existe el código de la orden de pago:', error)
      return false
    }
  }
}