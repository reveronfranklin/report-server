import { Injectable, NestMiddleware, UseInterceptors } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ReplicatePaymentOrderRepository } from '../../../domain/repositories/replicate-payment-order.repository.interface';
import { ApiResponseInterceptor } from '../../interceptors/response/response.interceptor';
import { ResponseDto } from '../../interceptors/response/response.dto';

@Injectable()
@UseInterceptors(ApiResponseInterceptor)
export class ReplicatePaymentOrderMiddleware implements NestMiddleware {
  constructor(private replicatePaymentOrderRepository: ReplicatePaymentOrderRepository) {}

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

        let result  = null
        result      = await this.replicatePaymentOrderRepository.replicatePaymentOrder(codigoOrdenPago)

        if (!result.isValid) {
          result.message = 'No se pudo replicar la orden de pago';
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