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
import { WithholdingOpModel } from '../models/withholding-op.model';
import { WithholdingModel } from '../models/withholding.model';
import { DocumentModel } from '../models/document.model';
import { TaxDocumentModel } from '../models/tax-document.model';

/* Mappers */
import { PaymentOrderMapper } from '../mappers/payment-order.mapper';

@Injectable()
export class PaymentOrderRepository implements IPaymentOrderRepository {
  constructor(
    @InjectModel(PaymentOrderModel)
    private paymentOrderModel: typeof PaymentOrderModel,
    private sequelize: Sequelize
  ) {}

  async findByIdWithPaymentOrder(id: number): Promise<PaymentOrderEntity | null> {
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

    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }

  async findByIdWithHoldingISLR(id: number): Promise<PaymentOrderEntity | null> {
    const options = {
      attributes: [
        'insertionDate',
        'paymentOrderCode',
        'paymentOrderNumber',
        'status',
        'withholdingAgentAddress',
        'withholdingAgentName',
        'withholdingAgentPhone',
        'withholdingAgentRIF'
      ],
      include: [
        {
          model: SupplierModel,
          attributes: [
            'providerName',
            'taxId'
          ],
          as: 'supplier',
          required: false
        },
        {
          model: DocumentModel,
          as: 'documents',
          attributes: [
            'documentOperationCode',
            'documentNumber',
            'documentDate'
          ],
          include: [
            {
              /* El scope condiciona: (SELECT X.DESCRIPCION_ID FROM ADM_DESCRIPTIVAS X WHERE X.CODIGO= 'ISLR') */
              model: TaxDocumentModel.scope('withISLR'),
              as: 'taxDocument',
              attributes: [
                'documentOperationCode',
                'exemptTaxAmount',
                'taxableBase',
                'taxAmount',
                'taxDocumentOperationCode'
              ],
              required: true,
              include: [
                {
                  model: WithholdingModel,
                  attributes: [
                    'retentionCode',
                    'paymentConcept',
                    'byRetention',
                  ],
                  as: 'withholding',
                  required: false
                }
              ]
            }
          ]
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }

  async findByIdWithHoldingVat(id: number): Promise<PaymentOrderEntity | null> {
    const options = {
      attributes: [
        'insertionDate',
        'paymentOrderCode',
        'paymentOrderNumber',
        'receiptNumber',
        'status',
        'withholdingAgentAddress',
        'withholdingAgentName',
        'withholdingAgentPhone',
        'withholdingAgentRIF'
      ],
      include: [
        {
          model: SupplierModel,
          attributes: [
            'providerName',
            'taxId'
          ],
          as: 'supplier',
          required: false
        },
        {
          model: DocumentModel,
          as: 'documents',
          attributes: [
            'affectedDocumentNumber',
            'documentAmount',
            'documentControlNumber',
            'documentDate',
            'documentNumber',
            'documentTypeId',
            'exemptTaxAmount',
            'taxableBase',
            'taxAmount',
            'withheldAmount'
          ],
          required: false,
          include: [
            {
              model: DescriptiveModel,
              as: 'typeDocument',
              attributes: [
                'code',
                'descriptionId',
                'extra1',
                'extra2',
                'extra3'
              ]
            },
            {
              model: DescriptiveModel,
              as: 'taxType',
              attributes: [
                'code',
                'descriptionId',
                'extra1'
              ]
            }
          ]
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }

  async findByIdTaxStamp(id: number): Promise<PaymentOrderEntity | null> {
    const options = {
      attributes: [
        'paymentOrderCode',
        'paymentOrderNumber',
        'reason',
        'status',
        'withholdingAgentName',
        'withholdingAgentRIF'
      ],
      include: [
        {
          /* El scope condiciona: (SELECT X.DESCRIPCION_ID FROM ADM_DESCRIPTIVAS X WHERE X.CODIGO= 'LT') */
          model: WithholdingOpModel.scope('withLT'),
          attributes: [
            'opRetentionCode',
            'paymentOrderCode',
            'retentionAmount',
            'retentionCode',
            'taxableBase',
            'withholdingTypeId'
          ],
          as: 'withholdingOps',
          required: false
        },
        {
          model: SupplierModel,
          attributes: [
            'providerName',
            'taxId'
          ],
          as: 'supplier',
          required: false
        },
        {
          model: DocumentModel,
          as: 'documents',
          attributes: [
            'documentAmount',
            'documentControlNumber',
            'documentNumber',
            'documentOperationCode',
            'exemptTaxAmount',
            'paymentOrderCode',
            'taxAmount'
          ],
          required: false
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }
}