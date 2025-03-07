/* Dependencies */
import { Injectable, Inject } from '@nestjs/common';
import moment from 'moment-timezone';

/* Repositories */
import { IPaymentOrderRepository } from '../../domain/repositories/payment-order.repository.interface';

/* Entities */
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';

/* Dtos */
import { ReportSchemeDto } from '../dtos/vatWithholdingVoucher/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/vatWithholdingVoucher/report-header.dto';
import { ReportSubHeaderDto } from '../dtos/vatWithholdingVoucher/report-sub-header.dto';
import { ReportBodyDto } from '../dtos/vatWithholdingVoucher/report-body.dto';
import { WithholdingDto } from '../dtos/vatWithholdingVoucher/withholding.dto';

/* Services Pdf */
import { PdfGeneratorFactory } from '../../infrastructure/pdf/pdf-generator.factory';

@Injectable()
export class VatWithholdingVoucherService {
  constructor(
    @Inject('IPaymentOrderRepository')
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGenerator')
    private pdfGeneratorFactory: PdfGeneratorFactory
  ) {}

  async generateReport(id: number): Promise<PDFKit.PDFDocument> {
    const paymentOrder = await this.paymentOrderRepository.findByIdWithHoldingVat(id)

    if (!paymentOrder) {
      throw new Error('Payment order not found')
    }

    try {
      const status = (paymentOrder.status === 'AP') ?  'approved' : 'annulled'

      const reportScheme: ReportSchemeDto = {
        name: 'vat-withholding-voucher',
        status: status,
        header: this.mapToReportHeader(),
        subHeader: this.mapToReportSubHeader(paymentOrder),
        body: this.mapToReportBody(paymentOrder)
      }

      /* instancia el generador de PDF */
      const pdfGenerator = this.pdfGeneratorFactory.getGenerator('vatWithholdingVoucher');

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

  public rpad(str: string, length: number): string {
    if (str === undefined || str === null) {
      return null;
    }
    // Convierte el valor a una cadena si no lo es
    let result = String(str);
    // Si la longitud de la cadena es menor que la longitud deseada, se rellena con espacios
    while (result.length < length) {
        result += ' ';
    }
    // Si la longitud de la cadena es mayor que la longitud deseada, se trunca
    return result.substring(0, length);
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
      date: this.formatDate(order.insertionDate),
      voucherNumber: order.receiptNumber,
      nameWithholdingAgent:  order.withholdingAgentName,
      withholdingAgentRif: this.formatRIF(order.withholdingAgentRIF),
      withholdingAgentAddress: order.withholdingAgentAddress,
      fiscalPeriod: this.formatFiscalPeriod(order.insertionDate),
      subjectNameWithheld: supplier.providerName,
      subjectNameWithheldRif: this.formatRIF(supplier?.taxId),
      paymentOrderNumber: order.paymentOrderNumber
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    const documents = order?.documents ?? []

    let totalPurchasesVat: number     = 0
    let totalPurchasesCredit: number  = 0
    let totalTaxableBase: number      = 0
    let totalVatTax: number           = 0
    let totalVatWithheld: number      = 0

    const listWithholding: WithholdingDto[] = []

    documents.forEach((document, index) => {
      const operationNumber   = index + 1
      const transactionType   = document.typeDocument?.extra1
      /* Review with franklin */
      const debitNoteNumber   = null //document.typeDocument?.extra2
      const creditNoteNumber  = null //document.typeDocument?.extra3
      const taxType           = document.taxType?.extra1

      const data = {
        operationNumber,
        invoiceDate: this.formatDate(document.documentDate),
        invoiceNumber: document.documentNumber,
        invoiceControlNumber: document.documentControlNumber ?? '00-00000000',
        debitNoteNumber,
        creditNoteNumber,
        transactionType,
        affectedInvoiceNumber: this.rpad(document.affectedDocumentNumber, 20),
        totalPurchasesIncludingVat: document.documentAmount,
        purchasesWithoutVatCredit: document.exemptTaxAmount,
        taxableIncome: document.taxableBase,
        alicuota: `${taxType}%`,
        vatTax: document.taxAmount,
        vatWithheld: document.withheldAmount
      }

      totalPurchasesVat     += Number(data.totalPurchasesIncludingVat)
      totalPurchasesCredit  += Number(data.purchasesWithoutVatCredit)
      totalTaxableBase      += Number(data.taxableIncome)
      totalVatTax           += Number(data.vatTax)
      totalVatWithheld      += Number(data.vatWithheld)

      listWithholding.push(data)
    })

    return {
      withHolding: listWithholding,
      totalPurchasesVat,
      totalPurchasesCredit,
      totalTaxableBase,
      totalVatTax,
      totalVatWithheld
    }
  }
}