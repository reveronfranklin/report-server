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
      const reportScheme: ReportSchemeDto = {
        name: 'vat-withholding-voucher',
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
    const supplier = order?.PROVEEDOR ?? null

    return {
      date: this.formatDate(order.FECHA_INS),
      voucherNumber: order.NUMERO_COMPROBANTE,
      nameWithholdingAgent:  order.NOMBRE_AGENTE_RETENCION,
      withholdingAgentRif: this.formatRIF(order.RIF_AGENTE_RETENCION),
      withholdingAgentAddress: order.DIRECCION_AGENTE_RETENCION,
      fiscalPeriod: this.formatFiscalPeriod(order.FECHA_INS),
      subjectNameWithheld: supplier.NOMBRE_PROVEEDOR,
      subjectNameWithheldRif: this.formatRIF(supplier?.RIF),
      paymentOrderNumber: order.NUMERO_ORDEN_PAGO
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    const documents = order?.DOCUMENTS ?? []

    let totalPurchasesVat: number     = 0
    let totalPurchasesCredit: number  = 0
    let totalTaxableBase: number      = 0
    let totalVatTax: number           = 0
    let totalVatWithheld: number      = 0

    const listWithholding: WithholdingDto[] = []

    documents.forEach((document, index) => {
      const operationNumber   = index + 1
      const transactionType   = document.TYPE_DOCUMENT?.EXTRA1
      /* Review with franklin */
      const debitNoteNumber   = null //document.TYPE_DOCUMENT?.EXTRA2
      const creditNoteNumber  = null //document.TYPE_DOCUMENT?.EXTRA3
      const taxType           = document.TAX_TYPE?.EXTRA1

      const data = {
        operationNumber,
        invoiceDate: this.formatDate(document.FECHA_DOCUMENTO),
        invoiceNumber: document.NUMERO_DOCUMENTO,
        invoiceControlNumber: document.NUMERO_CONTROL_DOCUMENTO ?? '00-00000000',
        debitNoteNumber,
        creditNoteNumber,
        transactionType,
        affectedInvoiceNumber: this.rpad(document.NUMERO_DOCUMENTO_AFECTADO, 20),
        totalPurchasesIncludingVat: document.MONTO_DOCUMENTO,
        purchasesWithoutVatCredit: document.MONTO_IMPUESTO_EXENTO,
        taxableIncome: document.BASE_IMPONIBLE,
        alicuota: `${taxType}%`,
        vatTax: document.MONTO_IMPUESTO,
        vatWithheld: document.MONTO_RETENIDO
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