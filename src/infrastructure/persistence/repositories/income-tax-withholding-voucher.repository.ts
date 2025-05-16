/* Dependencies */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

/* Domain */
import { IIncomeTaxWithholdingVoucherRepository } from '../../../domain/repositories/income-tax-withholding-voucher.repository.interface';

/* Models */
import { PaymentOrderModel } from '../models/payment-order.model';
import { SupplierModel } from '../models/supplier.model';
import { WithholdingModel } from '../models/withholding.model';
import { DocumentModel } from '../models/document.model';
import { TaxDocumentModel } from '../models/tax-document.model';

/* Mappers */
import { IncomeTaxWithholdingVoucherMapper } from '../mappers/income-tax-withholding-voucher.mapper';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/incomeTaxWithholdingVoucher/report-scheme.dto';

@Injectable()
export class IncomeTaxWithholdingVoucherRepository implements IIncomeTaxWithholdingVoucherRepository {
  constructor(
    @InjectModel(PaymentOrderModel)
    private paymentOrderModel: typeof PaymentOrderModel
  ) {}

  async findById(id: number): Promise<ReportSchemeDto | null> {
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

    if (paymentOrderModel) {
      return IncomeTaxWithholdingVoucherMapper.toDomain(paymentOrderModel)
    }

    return null
  }
}