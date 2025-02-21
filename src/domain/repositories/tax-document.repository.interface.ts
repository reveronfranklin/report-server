import { ITaxDocument } from '../interfaces/tax-document.interface';

export interface ITaxDocumentRepository {
  findAll(): Promise<ITaxDocument[]>;
  findById(id: number): Promise<ITaxDocument | null>;
}