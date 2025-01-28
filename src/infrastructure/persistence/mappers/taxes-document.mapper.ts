import { TaxesDocumentEntity } from '../../../domain/entities/taxes-document.entity';
import { TaxesDocumentModel } from '../models/taxes-document.model';

export class TaxesDocumentMapper {
  static toDomain(model: TaxesDocumentModel): TaxesDocumentEntity {
    return new TaxesDocumentEntity(
      model.CODIGO_IMPUESTO_DOCUMENTO_OP,
      model.CODIGO_DOCUMENTO_OP,
      model.CODIGO_RETENCION,
      model.TIPO_RETENCION_ID,
      model.TIPO_IMPUESTO_ID,
      model.PERIODO_IMPOSITIVO,
      model.BASE_IMPONIBLE,
      model.MONTO_IMPUESTO,
      model.MONTO_IMPUESTO_EXENTO,
      model.MONTO_RETENIDO,
      model.EXTRA1,
      model.EXTRA2,
      model.EXTRA3,
      model.USUARIO_INS,
      model.FECHA_INS,
      model.USUARIO_UPD,
      model.FECHA_UPD,
      model.CODIGO_EMPRESA
    );
  }

  static toPersistence(entity: TaxesDocumentEntity): Partial<TaxesDocumentModel> {
    return {
      CODIGO_IMPUESTO_DOCUMENTO_OP: entity.CODIGO_IMPUESTO_DOCUMENTO_OP,
      CODIGO_DOCUMENTO_OP: entity.CODIGO_DOCUMENTO_OP,
      CODIGO_RETENCION: entity.CODIGO_RETENCION,
      TIPO_RETENCION_ID: entity.TIPO_RETENCION_ID,
      TIPO_IMPUESTO_ID: entity.TIPO_IMPUESTO_ID,
      PERIODO_IMPOSITIVO: entity.PERIODO_IMPOSITIVO,
      BASE_IMPONIBLE: entity.BASE_IMPONIBLE,
      MONTO_IMPUESTO: entity.MONTO_IMPUESTO,
      MONTO_IMPUESTO_EXENTO: entity.MONTO_IMPUESTO_EXENTO,
      MONTO_RETENIDO: entity.MONTO_RETENIDO,
      EXTRA1: entity.EXTRA1,
      EXTRA2: entity.EXTRA2,
      EXTRA3: entity.EXTRA3,
      USUARIO_INS: entity.USUARIO_INS,
      FECHA_INS: entity.FECHA_INS,
      USUARIO_UPD: entity.USUARIO_UPD,
      FECHA_UPD: entity.FECHA_UPD,
      CODIGO_EMPRESA: entity.CODIGO_EMPRESA
    };
  }
}