/* Dependencies */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

/* Domain */
import { IVatWithholdingVoucherRepository } from '../../../domain/repositories/vat-withholding-voucher.repository.interface';

/* Models */
import { PaymentOrderModel } from '../models/payment-order.model';
import { DescriptiveModel } from '../models/descriptive.model';
import { SupplierModel } from '../models/supplier.model';
import { DocumentModel } from '../models/document.model';

/* Mappers */
import { VatWithholdingVoucherMapper } from '../mappers/vat-withholding-voucher.mapper';

/* Dtos */
import { ReportSchemeDto } from '../../../application/dtos/vatWithholdingVoucher/report-scheme.dto';

@Injectable()
export class VatWithholdingVoucherRepository implements IVatWithholdingVoucherRepository {
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
            'withheldAmount',
            'voucherNumber'
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

    if (paymentOrderModel) {
      return VatWithholdingVoucherMapper.toDomain(paymentOrderModel)
    }

    return null
  }
}