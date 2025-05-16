import { IDocument } from '../interfaces/document.interface';
import { TaxDocumentEntity } from './tax-document.entity';
import { DescriptiveEntity } from './descriptive.entity'

export class DocumentEntity implements IDocument {
  constructor(
    public affectedDocumentNumber: string,
    public documentAmount: number,
    public documentControlNumber: string,
    public documentDate: Date,
    public documentNumber: string,
    public documentOperationCode: number,
    public documentTypeId: string,
    public exemptTaxAmount: number,
    public operationTypeId: string,
    public paymentOrderCode: number,
    public taxableBase: number,
    public taxAmount: number,
    public taxTypeId: string,
    public transactionTypeId: string,
    public withheldAmount: number,

    /* Relations */
    public taxDocument?: TaxDocumentEntity,
    public typeDocument?: DescriptiveEntity,
    public taxType?: DescriptiveEntity
  ) {}
}