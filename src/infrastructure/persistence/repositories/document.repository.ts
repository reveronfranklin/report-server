import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DocumentModel } from '../models/document.model';
import { IDocumentRepository } from '../../../domain/repositories/document.repository.interface';
import { DocumentEntity } from '../../../domain/entities/document.entity';
import { DocumentMapper } from '../mappers/document.mapper';

@Injectable()
export class DocumentRepository implements IDocumentRepository {
  constructor(
    @InjectModel(DocumentModel)
    private documentModel: typeof DocumentModel,
  ) {}

  async findAll(): Promise<DocumentEntity[]> {
    const documents = await this.documentModel.findAll();
    return documents.map(DocumentMapper.toDomain);
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    const document = await this.documentModel.findByPk(id);
    return document ? DocumentMapper.toDomain(document) : null;
  }
}