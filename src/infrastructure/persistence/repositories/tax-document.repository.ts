import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaxDocumentModel } from '../models/tax-document.model';
import { ITaxDocumentRepository } from '../../../domain/repositories/tax-document.repository.interface';
import { ITaxDocument } from '../../../domain/interfaces/tax-document.interface';

@Injectable()
export class TaxDocumentRepository implements ITaxDocumentRepository {
  constructor(
    @InjectModel(TaxDocumentModel)
    private taxDocumentModel: typeof TaxDocumentModel,
  ) {}

  async findAll(): Promise<ITaxDocument[]> {
    const taxDocuments = await this.taxDocumentModel.findAll();
    return taxDocuments;
  }

  async findById(id: number): Promise<ITaxDocument | null> {
    const taxDocument = await this.taxDocumentModel.findByPk(id);
    return taxDocument;
  }
}