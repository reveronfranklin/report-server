import { TaxesDocumentEntity } from '../entities/taxes-document.entity';

export interface ITaxesDocumentRepository {
  findAll(): Promise<TaxesDocumentEntity[]>;
  findById(id: string): Promise<TaxesDocumentEntity | null>;
}