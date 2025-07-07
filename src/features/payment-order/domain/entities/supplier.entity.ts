import { ISupplier } from '../interfaces/supplier.interface';
import { BeneficiaryEntity } from './beneficiary.entity';

export class SupplierEntity implements ISupplier {
  constructor(
    public identificationCard: string,
    public providerCode: number,
    public providerName: string,
    public taxId: string,

    /* Relations */
    public beneficiaries?: BeneficiaryEntity[]
  ) {}
}