/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import moment from 'moment-timezone';

/* Repositories */
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';

/* Entities */
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../dtos/incomeTaxWithholdingVoucher/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/incomeTaxWithholdingVoucher/report-header.dto';
import { ReportSubHeaderDto } from '../dtos/incomeTaxWithholdingVoucher/report-sub-header.dto';
import { ReportBodyDto } from '../dtos/incomeTaxWithholdingVoucher/report-body.dto';
import { WithholdingDto } from '../dtos/incomeTaxWithholdingVoucher/withholding.dto';

/* Services Pdf */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

@Injectable()
export class IncomeTaxWithholdingVoucherService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    const paymentOrder = await this.paymentOrderRepository.findByIdWithHoldingISLR(id)

    if (!paymentOrder) {
      throw new Error('Payment order not found')
    }

    try {
      const status = (paymentOrder.status === 'AP') ?  'approved' : 'annulled'

      const reportScheme: ReportSchemeDto = {
        name: 'income-tax-withholding-voucher',
        status: status,
        header: this.mapToReportHeader(),
        subHeader: this.mapToReportSubHeader(paymentOrder),
        body: this.mapToReportBody(paymentOrder)
      }

      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('incomeTaxWithholdingVoucher');

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

  public formatFiscalPeriod(date: any): any {
    const formattedDate = moment(date)
    const year          = formattedDate.tz('UTC').format('YYYY')
    const month         = formattedDate.tz('UTC').format('MM')
    return `Año: ${year} Mes: ${month}`
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

  public formatPercentageRetention(percentage: number | string): any {
    // Asegurarse de que estamos trabajando con un número
    const numericPercentage = typeof percentage === 'string' ? parseFloat(percentage) : percentage;

    // Verificar si el valor es un número válido
    if (isNaN(numericPercentage)) {
      console.log(`Valor inválido para formatPercentageRetention: ${percentage}`);
      return '0.00';
    }

    // Convertir el número a una cadena con 2 decimales
    let formattedNumber = numericPercentage.toFixed(2);
    // Separar la parte entera y decimal
    let [integerPart, decimalPart] = formattedNumber.split('.');
    // Formatear la parte entera con separadores de miles
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Reconstruir el número con la parte decimal
    formattedNumber = `${integerPart}.${decimalPart}`;
    // Eliminar espacios en blanco al inicio y al final
    return formattedNumber.trim();
  }

  private mapToReportHeader(): ReportHeaderDto {
    const subTitle = 'CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO'

    return {
      subTitle
    }
  }

  private mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const supplier = order?.supplier ?? null

    return {
      retentionAgentName: order.withholdingAgentName,
      retentionAgentPhone: order.withholdingAgentPhone,
      retentionAgentRif: this.formatRIF(order.withholdingAgentRIF),
      retentionAgentAddress: order.withholdingAgentAddress,
      date: this.formatDate(order.insertionDate),
      fiscalPeriod: this.formatFiscalPeriod(order.insertionDate),
      retainedSubjectName: supplier.providerName,
      retainedSubjectRif: this.formatRIF(supplier?.taxId),
      paymentOrderNumber: order.paymentOrderNumber
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    const documents = order?.documents ?? []

    let totalTaxableIncome: number     = 0
    let totalIncomeTaxWithheld: number = 0

    const listWithholding: WithholdingDto[] = []

    documents.forEach((document) => {
      const taxDocument = document.taxDocument
      const withholding = taxDocument?.withholding

      const data = {
        invoiceNumber: document.documentNumber,
        invoiceDate: this.formatDate(document.documentDate),
        conceptPayment: withholding?.paymentConcept,
        extensiveTax: taxDocument?.exemptTaxAmount,
        taxableIncome: taxDocument?.taxableBase,
        alicuota: this.formatPercentageRetention(withholding?.byRetention ?? 0),
        incomeTaxWithheld: taxDocument?.taxAmount,
        subtrahend: null
      }

      totalTaxableIncome      += Number(taxDocument?.taxableBase)
      totalIncomeTaxWithheld  += Number(taxDocument?.taxAmount)

      listWithholding.push(data)
    })

    return {
      withHolding: listWithholding,
      totalTaxableIncome: totalTaxableIncome,
      totalIncomeTaxWithheld: totalIncomeTaxWithheld
    }
  }
}