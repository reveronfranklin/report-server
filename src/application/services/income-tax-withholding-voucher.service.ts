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
    const paymentOrder = await this.paymentOrderRepository.findByIdWithHoldings(id)

    if (!paymentOrder) {
      throw new Error('Payment order not found')
    }

    try {
      const reportScheme: ReportSchemeDto = {
        name: 'income-tax-withholding-voucher',
        header: this.mapToReportHeader(paymentOrder),
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
    // Eliminar cualquier guión existente en el RIF
    const cleanRIF = rif.replace(/-/g, '');
    // Obtener el primer carácter
    const firstChar = cleanRIF.charAt(0);
    // Obtener el resto de los caracteres, rellenando con ceros a la izquierda si es necesario
    const restOfRIF = cleanRIF.slice(1).padStart(9, '0');
    return `${firstChar}-${restOfRIF}`;
  }

  public parseNumber = (value: string): number => {
    // Reemplaza la coma por punto y convierte a número
    return parseFloat(value.replace(',', '.'));
  };

  public formatNumber = (value: number): string => {
    // Formatea el número con dos decimales y usa coma como separador decimal
    return value.toFixed(2).replace('.', ',');
  };

  private mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
    const subTitle = 'CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO'

    return { SUB_TITULO: subTitle }
  }

  private mapToReportSubHeader(order: PaymentOrderEntity): ReportSubHeaderDto {
    const supplier = order?.PROVEEDOR ?? null

    return {
      NOMBRE_AGENTE_RETENCION: 'CONCEJO MUNICIPAL DEL MUNICIPIO CHACAO',
      TELEFONO_AGENTE_RETENCION: '/ 0212-905.74.62; 0212-905.74.53',
      RIF_AGENTE_RETENCION: 'G-200074590',
      DIRECCION_AGENTE_RETENCION: 'EDF. ATRIUM, PISO 2. AV. VENEZUELA CON CALLE SOROCAIMA. EL ROSAL. EDO. MIRANDA. DTTO. CAPI',
      FECHA: this.formatDate(order.FECHA_INS),
      PERIODO_FISCAL: this.formatFiscalPeriod(order.FECHA_INS),
      NOMBRE_SUJETO_RETENIDO: supplier.NOMBRE_PROVEEDOR,
      RIF_SUJETO_RETENIDO: this.formatRIF(supplier?.RIF),
      NRO_ORDEN_PAGO: order.NUMERO_ORDEN_PAGO
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    return {
      invoiceNumber: '003367',
      invoiceDate: this.formatDate('01/09/2024'),
      conceptPayment: 'CONTRATISTAS Y SUBCONTRATISTAS DE SERVICIOS (P.J) (ART.9 N° 11 DECRETO 1.808 I.S.L.R)',
      extensiveTax: '0,00',
      taxableIncome: '41.775,75',
      alicuota: '2,00',
      incomeTaxWithheld: '835,52',
      totalTaxableIncome: '41.775,75',
      totalIncomeTaxWithheld: '835,52',
      subtrahend: this.formatNumber(0)
    };
  }
}