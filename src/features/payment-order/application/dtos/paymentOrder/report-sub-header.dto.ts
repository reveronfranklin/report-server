import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ReportSubHeaderDto {
  @IsString()
  @IsNotEmpty()
  supplierName: string;

  @IsString()
  @IsNotEmpty()
  supplierIdCard: string;

  @IsString()
  @IsNotEmpty()
  supplierRIF: string;

  @IsString()
  @IsNotEmpty()
  beneficiaryName: string;

  @IsString()
  @IsNotEmpty()
  beneficiaryLastName: string;

  @IsString()
  @IsNotEmpty()
  beneficiaryIdCard: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsDate()
  @IsNotEmpty()
  deadlineStartDate: Date;

  @IsDate()
  @IsNotEmpty()
  deadlineEndDate: Date;

  @IsString()
  @IsNotEmpty()
  amountInWords: string;

  @IsString()
  @IsNotEmpty()
  paymentAmount: number;
}