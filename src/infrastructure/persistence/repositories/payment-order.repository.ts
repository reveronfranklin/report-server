import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentOrderModel } from '../models/payment-order.model';
import { IPaymentOrderRepository } from '../../../domain/repositories/payment-order.repository.interface';
import { PaymentOrderEntity } from '../../../domain/entities/payment-order.entity';

/* Models */
import { DescriptiveModel } from '../models/descriptive.model';
import { SupplierModel } from '../models/supplier.model';
import { BeneficiaryModel } from '../models/beneficiary.model';
import { PucPaymentOrderModel } from '../models/puc-payment-order.model';
import { CommitmentModel } from '../models/commitment.model';
import { PreCommitmentModel } from '../models/pre-commitment.model';
import { BalanceModel } from '../models/balance.model';

/* Mappers */
import { PaymentOrderMapper } from '../mappers/payment-order.mapper';

@Injectable()
export class PaymentOrderRepository implements IPaymentOrderRepository {
  constructor(
    @InjectModel(PaymentOrderModel)
    private paymentOrderModel: typeof PaymentOrderModel,
  ) {}

  async findByIdWithRelations(id: number): Promise<PaymentOrderEntity | null> {
    const options = {
      include: [
        { model: DescriptiveModel, as: 'TIPO_ORDEN_PAGO' },
        { model: DescriptiveModel, as: 'FRECUENCIA_PAGO' },
        {
          model: SupplierModel,
          as: 'PROVEEDOR',
          include: [
            {
              model: BeneficiaryModel,
              as: 'BENEFICIARIES',
              where: { PRINCIPAL: 1 },
              required: false  // This makes it a LEFT OUTER JOIN
            }
          ]
        },
        {
          model: PucPaymentOrderModel,
          as: 'PUC_PAYMENT_ORDERS',
          include: [
            { model: BalanceModel, as: 'BALANCE' }
          ]
        },
        {
          model: CommitmentModel,
          as: 'COMMITMENT',
          include: [
            { model: PreCommitmentModel, as: 'PRE_COMMITMENT' }
          ]
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    /* responses */
    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }
}