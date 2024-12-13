import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PucPaymentOrderModel } from '../models/puc-payment-order.model';
import { IPucPaymentOrderRepository } from '../../../domain/repositories/puc-payment-order.repository.interface';
import { IPucPaymentOrder } from '../../../domain/interfaces/puc-payment-order.interface';

@Injectable()
export class PucPaymentOrderRepository implements IPucPaymentOrderRepository {
  constructor(
    @InjectModel(PucPaymentOrderModel)
    private pucPaymentOrderModel: typeof PucPaymentOrderModel
  ) {}

  async findById(id: number, options?: any): Promise<IPucPaymentOrder | null> {
    const pucPaymentOrder = await this.pucPaymentOrderModel.findByPk(id, options);
    return pucPaymentOrder;
  }
}