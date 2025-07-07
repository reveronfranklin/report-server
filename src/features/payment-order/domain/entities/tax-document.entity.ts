import { ITaxDocument } from '../interfaces/tax-document.interface';
import { WithholdingEntity } from './withholding.entity';

export class TaxDocumentEntity implements ITaxDocument {
  constructor(
    public taxDocumentOperationCode: number,
    public documentOperationCode: number,
    public retentionCode: number,
    public retentionTypeId: number,
    public taxableBase: number,
    public exemptTaxAmount: number,
    public taxAmount: number,

    /* Relations */
    public withholding?: WithholdingEntity
  ) {}
}