import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentOrderModel } from './payment-order.model';
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

@Injectable()
export class PaymentOrderRepository implements IPaymentOrderRepository {
  constructor(
    @InjectModel(PaymentOrderModel)
    private paymentOrderModel: typeof PaymentOrderModel,
  ) {}

  async findById(id: number, options?: any): Promise<PaymentOrderEntity | null> {
    const order = await this.paymentOrderModel.findByPk(id, options);
    return order ? this.toEntity(order) : null;
  }

  private toEntity(model: PaymentOrderModel): PaymentOrderEntity {
    const entity = new PaymentOrderEntity(
      model.CODIGO_ORDEN_PAGO,
      model.ANO,
      model.CODIGO_COMPROMISO,
      model.CODIGO_ORDEN_COMPRA,
      model.CODIGO_CONTRATO,
      model.CODIGO_PROVEEDOR,
      model.NUMERO_ORDEN_PAGO,
      model.REFERENCIA_ORDEN_PAGO,
      model.FECHA_ORDEN_PAGO,
      model.TIPO_ORDEN_PAGO_ID,
      model.FECHA_PLAZO_DESDE,
      model.FECHA_PLAZO_HASTA,
      model.CANTIDAD_PAGO,
      model.NUMERO_PAGO,
      model.FRECUENCIA_PAGO_ID,
      model.TIPO_PAGO_ID,
      model.NUMERO_VALUACION,
      model.STATUS,
      model.MOTIVO,
      model.EXTRA1,
      model.EXTRA2,
      model.EXTRA3,
      model.USUARIO_INS,
      model.FECHA_INS,
      model.USUARIO_UPD,
      model.FECHA_UPD,
      model.CODIGO_EMPRESA,
      model.CODIGO_PRESUPUESTO,
      model.EXTRA4,
      model.EXTRA5,
      model.EXTRA6,
      model.EXTRA7,
      model.EXTRA8,
      model.EXTRA9,
      model.EXTRA10,
      model.EXTRA11,
      model.EXTRA12,
      model.EXTRA13,
      model.EXTRA14,
      model.EXTRA15,
      model.NUMERO_COMPROBANTE,
      model.FECHA_COMPROBANTE,
      model.NUMERO_COMPROBANTE2,
      model.NUMERO_COMPROBANTE3,
      model.NUMERO_COMPROBANTE4,
      model.SEARCH_TEXT,
      model.MONTO_LETRAS,
    );

    if (model.TIPO_ORDEN_PAGO) {
      entity.TIPO_ORDEN_PAGO = {
       ...model.TIPO_ORDEN_PAGO.get({ plain: true })
      }
    }

    if (model.FRECUENCIA_PAGO) {
      entity.FRECUENCIA_PAGO = {
       ...model.FRECUENCIA_PAGO.get({ plain: true })
      }
    }

    if (model.PROVEEDOR) {
      entity.PROVEEDOR = {
       ...model.PROVEEDOR.get({ plain: true })
      }
    }

    return entity
  }
}