import { Injectable, NestMiddleware, UseInterceptors } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseInterceptor } from '@interceptors/response.interceptor';
import { ResponseDto } from '@interceptors/response.dto';
import { ReplicatePaymentOrderPort } from './ports/replicate-payment-order.port';

@Injectable()
@UseInterceptors(ApiResponseInterceptor)
export class ReplicatePaymentOrderMiddleware implements NestMiddleware {
  constructor(private replicatePaymentOrderPort: ReplicatePaymentOrderPort) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req['tokenValidationResult'].isValid) {
      const codigoOrdenPago = req.body.CodigoOrdenPago

      try {
        if (!codigoOrdenPago) {
          const response = new ResponseDto<string>({
            data: null,
            isValid: false,
            message: 'Falta el código de la orden de pago',
            page: 1,
            totalPage: 1,
            cantidadRegistros: 1,
            total1: 0,
            total2: 0,
            total3: 0,
            total4: 0
          })
          return res.status(403).json(response)
        }

        const result = await this.replicatePaymentOrderPort.replicatePaymentOrder(codigoOrdenPago)

        if (!result?.isValid) {
          result.message = result?.message ?? 'No se pudo replicar la orden de pago';
          return res.status(404).json(result);
        }

        req['paymentOrderReplication'] = result
      } catch (error) {
        console.error('Error al replicar la orden de pago:', error)

        const response = new ResponseDto<string>({
          data: null,
          isValid: false,
          message: 'Error al replicar la orden de pago',
          page: 1,
          totalPage: 1,
          cantidadRegistros: 1,
          total1: 0,
          total2: 0,
          total3: 0,
          total4: 0
        })

        return res.status(500).json(response)
      }
    }

    next()
  }
}