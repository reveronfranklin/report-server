// src/features/payment-order/application/services/payment-order.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { IPaymentOrderRepository, PAYMENT_ORDER_REPOSITORY } from '../../domain/repositories/payment-order.repository.interface';
import { DescriptiveModel } from '../../../descriptive/infrastructure/persistence/descriptive.model';
import { SupplierModel } from '../../../supplier/infrastructure/persistence/supplier.model';
import { PaymentOrderEntity } from '../../domain/entities/payment-order.entity';
import { ReportSchemeDto } from '../dtos/report-scheme.dto';
import { ReportHeaderDto } from '../dtos/report-header.dto';
import { ReportBodyDto } from '../dtos/report-body.dto';

@Injectable()
export class PaymentOrderService {
  constructor(
    @Inject(PAYMENT_ORDER_REPOSITORY)
    private paymentOrderRepository: IPaymentOrderRepository
  ) {}

  async generateReport(id: number): Promise<ReportSchemeDto | null> {
    const order = await this.paymentOrderRepository.findById(id, {
      include: [
        /* ADM_DESCRIPTIVAS */
        {
          model: DescriptiveModel,
          as: 'TIPO_ORDEN_PAGO'
        },
        /* ADM_PROVEEDORES */
        {
          model: SupplierModel,
          as: 'PROVEEDOR'
        }
      ]
    });

    console.log(order)

    if (!order) {
      return null;
    }

    const reportScheme: ReportSchemeDto = {
      name: 'payment-order',
      headers: this.mapToReportHeader(order),
      body: this.mapToReportBody(order)
    };

    return reportScheme;
  }

  private mapToReportHeader(order: PaymentOrderEntity): ReportHeaderDto {
    return {
      DESCRIPCION: order.TIPO_ORDEN_PAGO.DESCRIPCION,
      NUMERO_ORDEN_PAGO: order.NUMERO_ORDEN_PAGO,
      FECHA_ORDEN_PAGO: order.FECHA_ORDEN_PAGO,
      NOMBRE_PROVEEDOR: order.PROVEEDOR.NOMBRE_PROVEEDOR,
      CEDULA_PROVEEDOR: order.PROVEEDOR.CEDULA,
      RIF_PROVEEDOR: order.PROVEEDOR.RIF,
      NOMBRE_BENEFICIARIO: '', // Obtener de otra entidad o servicio
      APELLIDO_BENEFICIARIO: '', // Obtener de otra entidad o servicio
      CEDULA_BENEFICIARIO: '', // Obtener de otra entidad o servicio
      FECHA_PLAZO_DESDE: order.FECHA_PLAZO_DESDE,
      FECHA_PLAZO_HASTA: order.FECHA_PLAZO_HASTA,
      MONTO_LETRAS: order.MONTO_LETRAS
    };
  }

  private mapToReportBody(order: PaymentOrderEntity): ReportBodyDto {
    return {
      CODIGO_ORDEN_PAGO: order.CODIGO_ORDEN_PAGO,
      MONTO: order.CANTIDAD_PAGO || 0,
      CONCEPTO: order.MOTIVO || '',
      // ... mapear otros campos según sea necesario
    };
  }
}