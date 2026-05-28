import { ISignature } from '../interfaces/signature.interface';

export class SignatureEntity implements ISignature {
  public office: string         = null;
  public order: string          = null;
  public personCode: number     = null;
  public name: string           = null;
  public lastName: string       = null;
  public idCard: string         = null;
  public jobDescription: string = null;

  constructor(data: ISignature) {
    Object.assign(this, data);
  }
}