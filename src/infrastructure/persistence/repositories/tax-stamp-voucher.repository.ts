/* Dependencies */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

/* Domain */
import { ITaxStampVoucherRepository } from '../../../domain/repositories/tax-stamp-voucher.repository.interface';

/* Models */
import { PaymentOrderModel } from '../models/payment-order.model';
import { SupplierModel } from '../models/supplier.model';
import { WithholdingOpModel } from '../models/withholding-op.model';
import { DocumentModel } from '../models/document.model';

/* Mappers */
import { TaxStampVoucherMapper } from '../mappers/tax-stamp-voucher.mapper';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/taxStampVoucher/report-scheme.dto';

@Injectable()
export class TaxStampVoucherRepository implements ITaxStampVoucherRepository {
  constructor(
    @InjectModel(PaymentOrderModel)
    private paymentOrderModel: typeof PaymentOrderModel
  ) {}

  async findById(id: number): Promise<ReportSchemeDto | null> {
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

    if (paymentOrderModel) {
      return TaxStampVoucherMapper.toDomain(paymentOrderModel)
    }

    return null
  }
}