import { DocumentEntity } from '../../../domain/entities/document.entity';
import { DocumentModel } from '../models/document.model';

export class DocumentMapper {
  static toDomain(model: DocumentModel): DocumentEntity {
    return new DocumentEntity(
      model.CODIGO_DOCUMENTO_OP,
      model.CODIGO_ORDEN_PAGO,
      model.FECHA_COMPROBANTE,
      model.PERIODO_IMPOSITIVO,
      model.TIPO_OPERACION_ID,
      model.TIPO_DOCUMENTO_ID,
      model.FECHA_DOCUMENTO,
      model.NUMERO_DOCUMENTO,
      model.NUMERO_CONTROL_DOCUMENTO,
      model.MONTO_DOCUMENTO,
      model.BASE_IMPONIBLE,
      model.MONTO_IMPUESTO,
      model.NUMERO_DOCUMENTO_AFECTADO,
      model.TIPO_TRANSACCION_ID,
      model.TIPO_IMPUESTO_ID,
      model.MONTO_IMPUESTO_EXENTO,
      model.MONTO_RETENIDO,
      model.EXTRA1,
      model.EXTRA2,
      model.EXTRA3,
      model.USUARIO_INS,
      model.FECHA_INS,
      model.USUARIO_UPD,
      model.FECHA_UPD,
      model.CODIGO_EMPRESA,
      model.CODIGO_PRESUPUESTO,
      model.NUMERO_EXPEDIENTE,
      model.ESTATUS_FISCO_ID
    );
  }
}