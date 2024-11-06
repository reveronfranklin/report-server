import { Injectable, Inject } from '@nestjs/common';
import { IPaymentOrderRepository, PAYMENT_ORDER_REPOSITORY } from '../../domain/repositories/payment-order.repository.interface';
import { DescriptiveModel } from '../../../descriptive/infrastructure/persistence/descriptive.model';
import { SupplierModel } from '../../../supplier/infrastructure/persistence/supplier.model';
import { BeneficiaryModel } from '../../../beneficiary/infrastructure/persistence/beneficiary.model';
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';
import { ReportSchemeDto } from '../dtos/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/report-header.dto';
import { ReportBodyDto } from '../dtos/report-body.dto';
import { PrinterService } from 'src/shared/modules/printer/printer.service';
import { IPdfGenerator } from '../../domain/interfaces/pdf-generator.interface';

@Injectable()
export class PaymentOrderService {
  constructor(
    @Inject(PAYMENT_ORDER_REPOSITORY)
    private paymentOrderRepository: IPaymentOrderRepository,
    @Inject('IPdfGenerator')
    private pdfGenerator: IPdfGenerator
  ) {}

  private mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
    const paymentOrderType  = order.TIPO_ORDEN_PAGO ?? null
    const methodOfPayment   = order.FRECUENCIA_PAGO ?? null
    const supplier          = order.PROVEEDOR ?? null
    const beneficiary       = supplier?.BENEFICIARIES[0] ?? null

    return {
      DESCRIPCION: paymentOrderType?.DESCRIPCION,
      NUMERO_ORDEN_PAGO: order.NUMERO_ORDEN_PAGO,
      FECHA_ORDEN_PAGO: order.FECHA_ORDEN_PAGO,
      NOMBRE_PROVEEDOR: supplier?.NOMBRE_PROVEEDOR,
      CEDULA_PROVEEDOR: supplier?.CEDULA,
      RIF_PROVEEDOR: supplier?.RIF,
      NOMBRE_BENEFICIARIO: beneficiary?.NOMBRE,
      APELLIDO_BENEFICIARIO: beneficiary?.APELLIDO,
      CEDULA_BENEFICIARIO: beneficiary?.IDENTIFICACION,
      FECHA_PLAZO_DESDE: order.FECHA_PLAZO_DESDE,
      FECHA_PLAZO_HASTA: order.FECHA_PLAZO_HASTA,
      MONTO_LETRAS: order.MONTO_LETRAS,
      FORMA_DE_PAGO: methodOfPayment?.DESCRIPCION
    }
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    return {
      CODIGO_ORDEN_PAGO: order.CODIGO_ORDEN_PAGO,
      MONTO: order.CANTIDAD_PAGO || 0,
      CONCEPTO: order.MOTIVO || '',
      // ... mapear otros campos según sea necesario
    };
  }

  async generateReport(id: number) /*Promise<ReportSchemeDto | null>*/ {
    const paymentOrder = await this.paymentOrderRepository.findById(id, {
      include: [
        /* ADM_DESCRIPTIVAS */
        {
          model: DescriptiveModel,
          as: 'TIPO_ORDEN_PAGO'
        },
        {
          model: DescriptiveModel,
          as: 'FRECUENCIA_PAGO'
        },
        /* ADM_PROVEEDORES */
        {
          model: SupplierModel,
          as: 'PROVEEDOR',
          include: [
            /* CODIGO_CONTACTO_PROVEEDOR */
            {
              model: BeneficiaryModel,
              as: 'BENEFICIARIES',
              where: {
                PRINCIPAL: 1
              }
            }
          ]
        }
      ]
    });

    console.log('order', paymentOrder)

    if (!paymentOrder) {
      return null;
    }

    const reportScheme: ReportSchemeDto = {
      name: 'payment-order',
      headers: this.mapToReportHeader(paymentOrder),
      body: this.mapToReportBody(paymentOrder)
    };

    console.log('reportScheme', reportScheme)

    const document = this.pdfGenerator.generatePdf(paymentOrder);

    console.log('document', document)

    return document;
  }
}