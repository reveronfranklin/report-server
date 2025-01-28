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

  static toPersistence(entity: DocumentEntity): Partial<DocumentModel> {
    return {
      CODIGO_DOCUMENTO_OP: entity.CODIGO_DOCUMENTO_OP,
      CODIGO_ORDEN_PAGO: entity.CODIGO_ORDEN_PAGO,
      FECHA_COMPROBANTE: entity.FECHA_COMPROBANTE,
      PERIODO_IMPOSITIVO: entity.PERIODO_IMPOSITIVO,
      TIPO_OPERACION_ID: entity.TIPO_OPERACION_ID,
      TIPO_DOCUMENTO_ID: entity.TIPO_DOCUMENTO_ID,
      FECHA_DOCUMENTO: entity.FECHA_DOCUMENTO,
      NUMERO_DOCUMENTO: entity.NUMERO_DOCUMENTO,
      NUMERO_CONTROL_DOCUMENTO: entity.NUMERO_CONTROL_DOCUMENTO,
      MONTO_DOCUMENTO: entity.MONTO_DOCUMENTO,
      BASE_IMPONIBLE: entity.BASE_IMPONIBLE,
      MONTO_IMPUESTO: entity.MONTO_IMPUESTO,
      NUMERO_DOCUMENTO_AFECTADO: entity.NUMERO_DOCUMENTO_AFECTADO,
      TIPO_TRANSACCION_ID: entity.TIPO_TRANSACCION_ID,
      TIPO_IMPUESTO_ID: entity.TIPO_IMPUESTO_ID,
      MONTO_IMPUESTO_EXENTO: entity.MONTO_IMPUESTO_EXENTO,
      MONTO_RETENIDO: entity.MONTO_RETENIDO,
      EXTRA1: entity.EXTRA1,
      EXTRA2: entity.EXTRA2,
      EXTRA3: entity.EXTRA3,
      USUARIO_INS: entity.USUARIO_INS,
      FECHA_INS: entity.FECHA_INS,
      USUARIO_UPD: entity.USUARIO_UPD,
      FECHA_UPD: entity.FECHA_UPD,
      CODIGO_EMPRESA: entity.CODIGO_EMPRESA,
      CODIGO_PRESUPUESTO: entity.CODIGO_PRESUPUESTO,
      NUMERO_EXPEDIENTE: entity.NUMERO_EXPEDIENTE,
      ESTATUS_FISCO_ID: entity.ESTATUS_FISCO_ID
    };
  }
}