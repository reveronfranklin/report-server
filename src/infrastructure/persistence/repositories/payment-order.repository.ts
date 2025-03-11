/* Dependencies */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

/* Domain */
import { IPaymentOrderRepository } from '../../../domain/repositories/payment-order.repository.interface';

/* Models */
import { PaymentOrderModel } from '../models/payment-order.model';
import { DescriptiveModel } from '../models/descriptive.model';
import { SupplierModel } from '../models/supplier.model';
import { BeneficiaryModel } from '../models/beneficiary.model';
import { PucPaymentOrderModel } from '../models/puc-payment-order.model';
import { CommitmentModel } from '../models/commitment.model';
import { PreCommitmentModel } from '../models/pre-commitment.model';
import { BalanceModel } from '../models/balance.model';
import { WithholdingOpModel } from '../models/withholding-op.model';

/* Mappers */
import { PaymentOrderMapper } from '../mappers/payment-order.mapper';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/paymentOrder/report-scheme.dto';

@Injectable()
export class PaymentOrderRepository implements IPaymentOrderRepository {
  constructor(
    @InjectModel(PaymentOrderModel)
    private paymentOrderModel: typeof PaymentOrderModel,
    private sequelize: Sequelize
  ) {}

  async findById(id: number): Promise<ReportSchemeDto | null> {
    const options = {
      attributes: [
        'amountInWords',
        'deadlineEndDate',
        'deadlineStartDate',
        'paymentAmount',
        'paymentFrequencyId',
        'paymentOrderCode',
        'paymentOrderDate',
        'paymentOrderNumber',
        'paymentOrderTypeId',
        'reason',
        'reportTitle',
        'status',
        'supplierCode'
      ],
      include: [
        {
          model: DescriptiveModel,
          as: 'paymentOrderType',
          attributes: [
            'code',
            'description',
            'descriptionId'
          ]
        },
        {
          model: DescriptiveModel,
          as: 'paymentFrequency',
          attributes: [
            'code',
            'description',
            'descriptionId'
          ]
        },
        {
          model: SupplierModel,
          as: 'supplier',
          attributes: [
            'identificationCard',
            'providerCode',
            'providerName',
            'taxId'
          ],
          include: [
            {
              model: BeneficiaryModel,
              as: 'beneficiaries',
              attributes: [
                'firstName',
                'identification',
                'identificationId',
                'lastName',
                'providerCode',
                'providerContactCode'
              ],
              where: {
                PRINCIPAL: 1
              },
              required: false // This makes it a LEFT OUTER JOIN
            }
          ]
        },
        {
          model: PucPaymentOrderModel,
          as: 'pucPaymentOrders',
          required: false,
          attributes: [
            'amount',
            'balanceCode',
            'paymentOrderCode',
            'pucPaymentOrderCode'
          ],
          where: this.sequelize.literal(`
            "CODIGO_PUC_ORDEN_PAGO" IN (
              SELECT
                DISTINCT ON ("CODIGO_SALDO") "CODIGO_PUC_ORDEN_PAGO"
              FROM
                public."ADM_PUC_ORDEN_PAGO"
              ORDER BY
                "CODIGO_SALDO",
                "CODIGO_PUC_ORDEN_PAGO"
            )
          `),
          include: [
            {
              model: BalanceModel,
              as: 'balance',
              attributes: [
                'balanceCode',
                'financedDescription',
                'icpCodeConcat',
                'pucCodeConcat',
                'pucDenomination',
                'year'
              ]
            }
          ]
        },
        {
          model: CommitmentModel,
          as: 'commitment',
          attributes: [
            'commitmentCodeOp',
            'identifierCode',
            'paymentOrderCode'
          ],
          include: [
            {
              model:
              PreCommitmentModel,
              as: 'preCommitment',
              attributes: [
                'commitmentCode',
                'commitmentDate',
                'commitmentNumber'
              ]
            }
          ]
        },
        {
          model: WithholdingOpModel,
          as: 'withholdingOps',
          attributes: [
            'byRetention',
            'opRetentionCode',
            'paymentOrderCode',
            'retentionAmount',
            'withholdingTypeId'
          ],
          include: [
            {
              model: DescriptiveModel,
              as: 'retentionType',
              attributes: [
                'code',
                'description',
                'descriptionId'
              ]
            }
          ]
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    if (paymentOrderModel) {
      return PaymentOrderMapper.toDomain(paymentOrderModel)
    }

    return null
  }
}