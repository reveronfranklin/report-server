import { DocumentEntity } from '../entities/document.entity';

export interface IDocumentRepository {
  findAll(): Promise<DocumentEntity[]>;
  findById(id: string): Promise<DocumentEntity | null>;
}