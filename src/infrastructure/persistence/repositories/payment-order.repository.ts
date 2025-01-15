import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
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
import { WithholdingModel } from '../models/withholding.model';

/* Mappers */
import { PaymentOrderMapper } from '../mappers/payment-order.mapper';

@Injectable()
export class PaymentOrderRepository implements IPaymentOrderRepository {
  constructor(
    @InjectModel(PaymentOrderModel)
    private paymentOrderModel: typeof PaymentOrderModel,
    private sequelize: Sequelize
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
          required: false,
          // Testear
          where: this.sequelize.literal(`
            "CODIGO_PUC_ORDEN_PAGO" IN (
              SELECT DISTINCT ON ("CODIGO_SALDO") "CODIGO_PUC_ORDEN_PAGO"
              FROM public."ADM_PUC_ORDEN_PAGO"
              ORDER BY "CODIGO_SALDO", "CODIGO_PUC_ORDEN_PAGO"
            )
          `),
          //order: [['CODIGO_PUC_ORDEN_PAGO', 'DESC']],
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
        },
        {
          model: WithholdingModel,
          as: 'WITHHOLDINGS',
          include: [
            { model: DescriptiveModel, as: 'DESCRIPCION' }
          ]
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    /* responses */
    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }

  async existPaymentOrder(id: number): Promise<boolean> {
    const paymentOrderModel = await this.paymentOrderModel.findByPk(id)

    /* console.log('paymentOrderModel', paymentOrderModel) */

    console.log('exist payment order', !!paymentOrderModel)

    return !!paymentOrderModel
  }
}