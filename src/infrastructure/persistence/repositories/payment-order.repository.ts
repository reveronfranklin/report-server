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
          model: WithholdingOpModel,
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

  async findByIdWithHoldingISLR(id: number): Promise<PaymentOrderEntity | null> {
    const options = {
      attributes: [
        'NOMBRE_AGENTE_RETENCION',
        'TELEFONO_AGENTE_RETENCION',
        'RIF_AGENTE_RETENCION',
        'DIRECCION_AGENTE_RETENCION',
        'FECHA_INS',
        'NUMERO_ORDEN_PAGO',
        'STATUS'
      ],
      include: [
        {
          model: SupplierModel,
          attributes: [
            'NOMBRE_PROVEEDOR',
            'RIF'
          ],
          as: 'PROVEEDOR',
          required: false
        },
        {
          model: DocumentModel,
          as: 'DOCUMENTS',
          attributes: [
            'NUMERO_DOCUMENTO',
            'FECHA_DOCUMENTO'
          ],
          include: [
            {
              /* El scope condiciona: (SELECT X.DESCRIPCION_ID FROM ADM_DESCRIPTIVAS X WHERE X.CODIGO= 'ISLR') */
              model: TaxDocumentModel.scope('withISLR'),
              as: 'TAX_DOCUMENT',
              attributes: [
                'MONTO_IMPUESTO_EXENTO',
                'MONTO_IMPUESTO',
                'BASE_IMPONIBLE'
              ],
              required: true,
              include: [
                {
                  model: WithholdingModel,
                  attributes: [
                    'CONCEPTO_PAGO',
                    'POR_RETENCION'
                  ],
                  as: 'WITHHOLDING',
                  required: false
                }
              ]
            }
          ]
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    /* responses */
    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }

  async findByIdWithHoldingVat(id: number): Promise<PaymentOrderEntity | null> {
    const options = {
      attributes: [
        'NUMERO_COMPROBANTE',
        'NOMBRE_AGENTE_RETENCION',
        'RIF_AGENTE_RETENCION',
        'DIRECCION_AGENTE_RETENCION',
        'FECHA_INS',
        'NUMERO_ORDEN_PAGO',
        'STATUS'
      ],
      include: [
        {
          model: SupplierModel,
          attributes: [
            'NOMBRE_PROVEEDOR',
            'RIF'
          ],
          as: 'PROVEEDOR',
          required: false
        },
        {
          model: DocumentModel,
          as: 'DOCUMENTS',
          attributes: [
            'NUMERO_DOCUMENTO',
            'FECHA_DOCUMENTO',
            'NUMERO_CONTROL_DOCUMENTO',
            'NUMERO_DOCUMENTO_AFECTADO',
            'MONTO_DOCUMENTO',
            'MONTO_IMPUESTO_EXENTO',
            'BASE_IMPONIBLE',
            'MONTO_IMPUESTO',
            'MONTO_RETENIDO',
            'TIPO_DOCUMENTO_ID'
          ],
          required: false,
          //order: [['NUMERO_DOCUMENTO', 'ASC']],
          include: [
            {
              model: DescriptiveModel,
              as: 'TYPE_DOCUMENT',
              attributes: [
                'EXTRA1',
                'EXTRA2',
                'EXTRA3',
                'CODIGO'
              ]
            },
            {
              model: DescriptiveModel,
              as: 'TAX_TYPE',
              attributes: [
                'EXTRA1',
                'CODIGO'
              ]
            }
          ]
        }
      ]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    /* responses */
    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }

  async findByIdTaxStamp(id: number): Promise<PaymentOrderEntity | null> {
    const options = {
      attributes: [
        'NOMBRE_AGENTE_RETENCION',
        'RIF_AGENTE_RETENCION',
        'NUMERO_ORDEN_PAGO',
        'STATUS',
        'MOTIVO'
      ],
      include: [
        {
          /* El scope condiciona: (SELECT X.DESCRIPCION_ID FROM ADM_DESCRIPTIVAS X WHERE X.CODIGO= 'LT') */
          model: WithholdingOpModel.scope('withLT'),
          attributes: [
            'codigoOrdenPago',
            'tipoRetencionId',
            'codigoRetencion',
            'baseImponible',
            'montoRetencion'
          ],
          as: 'WITHHOLDINGS',
          required: false,
          /* Consultar a franklin, el monto de retención no se puede obtener de la tabla ADM_RETENCIONES,
          sino que se debe consultar a la tabla ADM_RETENCIONES_OP */
          /* include: [
            {
              model: WithholdingModel,
              attributes: [
                'CODIGO_RETENCION',
                'POR_RETENCION'
              ],
              as: 'WITHHOLDING',
              required: false
            }
          ] */
        },
        {
          model: SupplierModel,
          attributes: [
            'NOMBRE_PROVEEDOR',
            'RIF'
          ],
          as: 'PROVEEDOR',
          required: false
        },
        {
          model: DocumentModel,
          as: 'DOCUMENTS',
          attributes: [
            'CODIGO_ORDEN_PAGO',
            'NUMERO_CONTROL_DOCUMENTO',
            'NUMERO_DOCUMENTO',
            'MONTO_DOCUMENTO',
            'MONTO_IMPUESTO',
            'MONTO_IMPUESTO_EXENTO'
          ],
          required: false
        }
      ],
      plain: true
      //order: [['NUMERO_ORDEN_PAGO', 'DESC']]
    }

    const paymentOrderModel = await this.paymentOrderModel.findByPk(id, options)

    /* responses */
    return paymentOrderModel ? PaymentOrderMapper.toDomain(paymentOrderModel) : null
  }
}