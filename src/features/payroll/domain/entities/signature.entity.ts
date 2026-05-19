import { ISignature } from '../interfaces/signature.interface';

export class SignatureEntity implements ISignature {
  constructor(
    public office: string,
    public order: string,
    public personCode: number,
    public name: string,
    public lastName: string,
    public idCard: string,
    public jobDescription: string,

    /* Relations */
  ) {}
}