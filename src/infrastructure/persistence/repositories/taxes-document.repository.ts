import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaxesDocumentModel } from '../models/taxes-document.model';
import { ITaxesDocumentRepository } from '../../../domain/repositories/taxes-document.repository.interface';
import { TaxesDocumentEntity } from '../../../domain/entities/taxes-document.entity';
import { TaxesDocumentMapper } from '../mappers/taxes-document.mapper';

@Injectable()
export class TaxesDocumentRepository implements ITaxesDocumentRepository {
  constructor(
    @InjectModel(TaxesDocumentModel)
    private taxesDocumentModel: typeof TaxesDocumentModel,
  ) {}

  async findAll(): Promise<TaxesDocumentEntity[]> {
    const taxesDocuments = await this.taxesDocumentModel.findAll();
    return taxesDocuments.map(TaxesDocumentMapper.toDomain);
  }

  async findById(id: string): Promise<TaxesDocumentEntity | null> {
    const taxesDocument = await this.taxesDocumentModel.findByPk(id);
    return taxesDocument ? TaxesDocumentMapper.toDomain(taxesDocument) : null;
  }
}