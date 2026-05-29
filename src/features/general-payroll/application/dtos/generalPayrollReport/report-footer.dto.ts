import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ISignature } from '../../../domain/interfaces/signature.interface';

export class ReportFooterDto implements ISignature {
  @IsNotEmpty()
  @IsString()
  office: string;

  @IsNotEmpty()
  @IsString()
  officeDescription: string;

  @IsNotEmpty()
  @IsString()
  order: string;

  @IsNotEmpty()
  @IsNumber()
  personCode: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  idCard: string;

  @IsNotEmpty()
  @IsString()
  jobDescription: string;
}