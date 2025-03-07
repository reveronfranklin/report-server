/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import moment from 'moment-timezone';

/* Repositories */
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';

/* Entities */
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../dtos/taxStampVoucher/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/taxStampVoucher/report-header.dto';
import { ReportSubHeaderDto } from '../dtos/taxStampVoucher/report-sub-header.dto';
import { ReportBodyDto } from '../dtos/taxStampVoucher/report-body.dto';
import { WithholdingDto } from '../dtos/taxStampVoucher/withholding.dto';

/* Services Pdf */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

@Injectable()
export class TaxStampVoucherService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    const paymentOrder = await this.paymentOrderRepository.findByIdTaxStamp(id)

    if (!paymentOrder) {
      throw new Error('Payment order not found')
    }

    try {
      const status = (paymentOrder.status === 'AP') ?  'approved' : 'annulled'

      const reportScheme: ReportSchemeDto = {
        name: 'tax-stamp-voucher',
        status: status,
        header: this.mapToReportHeader(paymentOrder.paymentOrderNumber),
        subHeader: this.mapToReportSubHeader(paymentOrder),
        body: this.mapToReportBody(paymentOrder)
      }

      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('taxStampVoucher');

      // Generar el documento PDF
      const pdfDocument = pdfGenerator.generatePdf(reportScheme);

      return pdfDocument;
    } catch (error) {
      console.error('generateReport -> error', error)
      throw error;
    }
  }

  public formatDate(date: any): any {
    const formattedDate = moment(date)
    return formattedDate.tz('UTC').format('DD/MM/YYYY')
  }

  public formatRIF(rif: any): any {
    if (!rif) {
      return null
    }
    // Eliminar cualquier guión existente en el RIF
    const cleanRIF = rif.replace(/-/g, '');
    // Obtener el primer carácter
    const firstChar = cleanRIF.charAt(0);
    // Obtener el resto de los caracteres, rellenando con ceros a la izquierda si es necesario
    const restOfRIF = cleanRIF.slice(1).padStart(9, '0');
    return `${firstChar}-${restOfRIF}`;
  }

  public calculateTaxableIncome(taxBase: number, totalGrossAmount: number, totalTaxExempt: number, totalAmountVat: number): number {
    if (taxBase !== 0) {
      return taxBase
    } else if (totalGrossAmount === totalTaxExempt) {
      return totalGrossAmount
    } else {
      return (totalGrossAmount - totalAmountVat)
    }
  }

  private mapToReportHeader(paymentOrderNumber: string): ReportHeaderDto {
    const title = `
      FORMATO N° 2
      PLANILLA PARA EL CÁLCULO DEL IMPUESTO 1x1000
      AGENTES DE RETENCIÓN
      ENTES PÚBLICOS
    `.trim()

    return {
      title,
      dateElaboration: this.formatDate(new Date(Date.now())),
      paymentOrderNumber
    }
  }

  private mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const supplier = order?.supplier ?? null

    return {
      nameWithholdingAgent: order?.withholdingAgentName.trim() ?? null,
      withholdingAgentRif: this.formatRIF(order.withholdingAgentRIF),
      taxpayerName: supplier?.providerName.trim() ?? null,
      taxpayerRifNumber: this.formatRIF(supplier?.taxId),
      reason: order?.reason.trim() ?? null
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    const documents    = order?.documents ?? []
    const withHoldings = order?.withholdingOps ?? []

    let totalGrossAmount: number      = 0
    let totalAmountVat: number        = 0
    let totalNetTaxableIncome: number = 0
    let totalTaxExempt: number        = 0

    let taxBase                         = withHoldings[0]?.taxableBase ? Number(withHoldings[0].taxableBase) : 0
    let withholdingPercentage: number   = withHoldings[0]?.retentionAmount ? Number(withHoldings[0].retentionAmount) : 0

    const listWithholding: WithholdingDto[] = []

    documents.forEach((document) => {
      const data = {
        invoiceControlNumber: document.documentControlNumber ?? '00-00000000',
        invoiceNumber: document.documentNumber,
        documentAmount: document.documentAmount
      }

      totalGrossAmount      += Number(document.documentAmount)
      totalAmountVat        += Number(document.taxAmount)
      totalTaxExempt        += Number(document.exemptTaxAmount)

      listWithholding.push(data)
    })

    totalNetTaxableIncome = this.calculateTaxableIncome(taxBase, totalGrossAmount, totalTaxExempt, totalAmountVat)

    return {
      withHolding: listWithholding,
      totalGrossAmount,
      totalAmountVat,
      totalNetTaxableIncome,
      withholdingPercentage
    }
  }
}