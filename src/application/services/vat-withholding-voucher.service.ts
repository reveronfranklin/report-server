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
    const paymentOrder = await this.paymentOrderRepository.findByIdWithHoldings(id)

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

  private mapToReportHeader(): ReportHeaderDto {
    const subTitle = 'CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO'

    return {
      subTitle
    }
  }

  private mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const supplier = order?.PROVEEDOR ?? null

    return {
      date: this.formatDate('2024-10-22'),
      voucherNumber: 20241000000525,
      nameWithholdingAgent: 'CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO',
      withholdingAgentRif: this.formatRIF('G200074590'),
      withholdingAgentAddress: 'EDF. ATRIUM, PISO 2. AV. VENEZUELA CON CALLE SOROCAIMA. EL ROSAL. EDO. MIRANDA. DTTO. CAPI',
      fiscalPeriod: this.formatFiscalPeriod('2024-10-22'),
      subjectNameWithheld: 'CORPORACION COTOS 1830, C.A.',
      subjectNameWithheldRif: this.formatRIF('J502223606'),
      paymentOrderNumber: 674


      /* NOMBRE_AGENTE_RETENCION: order.NOMBRE_AGENTE_RETENCION,
      TELEFONO_AGENTE_RETENCION: order.TELEFONO_AGENTE_RETENCION,
      RIF_AGENTE_RETENCION: this.formatRIF(order.RIF_AGENTE_RETENCION),
      DIRECCION_AGENTE_RETENCION: order.DIRECCION_AGENTE_RETENCION,
      FECHA: this.formatDate(order.FECHA_INS),
      PERIODO_FISCAL: this.formatFiscalPeriod(order.FECHA_INS),
      NOMBRE_SUJETO_RETENIDO: supplier.NOMBRE_PROVEEDOR,
      RIF_SUJETO_RETENIDO: this.formatRIF(supplier?.RIF),
      NRO_ORDEN_PAGO: order.NUMERO_ORDEN_PAGO */


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

    documents.forEach((document) => {
      const taxDocument = document.TAX_DOCUMENT
      const withholding = taxDocument?.WITHHOLDING

      const data = {
        operationNumber: 1,
        invoiceDate:  this.formatDate('2024-10-21'),
        invoiceNumber: '00066',
        invoiceControlNumber: 0,
        debitNoteNumber: null,
        creditNoteNumber: null,
        transactionType:'01',
        affectedInvoiceNumber: null,
        totalPurchasesIncludingVat: 1744045.30,
        purchasesWithoutVatCredit: 0.00,
        taxableIncome: 1503487.33,
        alicuota: '16%',
        vatTax: 240557.97,
        vatWithheld: 180418.48


        /* invoiceNumber: document.NUMERO_DOCUMENTO,
        invoiceDate: this.formatDate(document.FECHA_DOCUMENTO),
        conceptPayment: withholding?.CONCEPTO_PAGO,
        extensiveTax: taxDocument?.MONTO_IMPUESTO_EXENTO,
        taxableIncome: taxDocument?.BASE_IMPONIBLE,
        alicuota: this.formatPercentageRetention(withholding?.POR_RETENCION ?? 0),
        incomeTaxWithheld: taxDocument?.MONTO_IMPUESTO,
        subtrahend: null */


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