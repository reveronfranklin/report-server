import { IBeneficiary } from '../interfaces/beneficiary.interface';

export class BeneficiaryEntity implements IBeneficiary {
  constructor(
    public firstName: string,
    public identification: string,
    public identificationId: number,
    public lastName: string,
    public providerCode: number,
    public providerContactCode: number
  ) {}
}