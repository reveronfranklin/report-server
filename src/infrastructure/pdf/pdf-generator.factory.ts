import { Injectable } from '@nestjs/common';
import { PdfGeneratorAdapterPaymentOrder } from './pdf-generator-payment-order.adapter';
import { PdfGeneratorAdapterIncomeTaxWithholdingVoucher } from './pdf-generator-income-tax-withholding-voucher';
import { PdfGeneratorAdapterVatWithholdingVoucher } from './pdf-generator-vat-withholding-voucher';
import { PdfGeneratorAdapterTaxStampVoucher } from './pdf-generator-tax-stamp-voucher';

@Injectable()
export class PdfGeneratorFactory {
  private generators: Map<string, any>;

  constructor(
    private paymentOrderGenerator: PdfGeneratorAdapterPaymentOrder,
    private incomeTaxWithholdingVoucherGenerator: PdfGeneratorAdapterIncomeTaxWithholdingVoucher,
    private vatWithholdingVoucherGenerator: PdfGeneratorAdapterVatWithholdingVoucher,
    private taxStampVoucherGenerator: PdfGeneratorAdapterTaxStampVoucher,
  ) {
    this.generators = new Map();
    this.generators.set('paymentOrder', paymentOrderGenerator);
    this.generators.set('incomeTaxWithholdingVoucher', incomeTaxWithholdingVoucherGenerator);
    this.generators.set('vatWithholdingVoucher', vatWithholdingVoucherGenerator);
    this.generators.set('taxStampVoucher', taxStampVoucherGenerator);
  }

  getGenerator(type: string) {
    const generator = this.generators.get(type);
    if (!generator) {
      throw new Error(`No PDF generator found for type: ${type}`);
    }
    return generator;
  }
}