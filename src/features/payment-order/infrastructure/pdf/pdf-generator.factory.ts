/* Dependencies */
import { Injectable } from '@nestjs/common';
import { IPdfGeneratorFactory } from '@shared/modules/printer/interfaces/pdf-generator-factory.interface';
import { IPdfGenerator } from '@shared/modules/printer/interfaces/pdf-generator.interface';

/* Generators */
import { PaymentOrderPdf } from './generators/payment-order';
import { IncomeTaxWithholdingVoucherPdf } from './generators/income-tax-withholding-voucher';
import { VatWithholdingVoucherPdf } from './generators/vat-withholding-voucher';
import { TaxStampVoucherPdf } from './generators/tax-stamp-voucher';

@Injectable()
export class PdfGeneratorFactory implements IPdfGeneratorFactory {
  private generators: Map<string, any>;

  constructor(
    private paymentOrderPdf: PaymentOrderPdf,
    private incomeTaxWithholdingVoucherPdf: IncomeTaxWithholdingVoucherPdf,
    private vatWithholdingVoucherPdf: VatWithholdingVoucherPdf,
    private taxStampVoucherPdf: TaxStampVoucherPdf
  ) {
    this.generators = new Map()
    this.generators.set('paymentOrder', paymentOrderPdf)
    this.generators.set('incomeTaxWithholdingVoucher', incomeTaxWithholdingVoucherPdf)
    this.generators.set('vatWithholdingVoucher', vatWithholdingVoucherPdf)
    this.generators.set('taxStampVoucher', taxStampVoucherPdf)
  }

  getGenerator(type: string): IPdfGenerator {
    const generator = this.generators.get(type)

    if (!generator) {
      throw new Error(`No PDF generator found for type: ${type}`)
    }

    return generator
  }
}