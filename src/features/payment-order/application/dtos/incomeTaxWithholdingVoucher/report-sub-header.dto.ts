import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ReportSubHeaderDto {
  @IsString()
  @IsNotEmpty()
  retentionAgentName: string;

  @IsString()
  @IsNotEmpty()
  retentionAgentPhone: string;

  @IsString()
  @IsNotEmpty()
  retentionAgentRif: string;

  @IsString()
  @IsNotEmpty()
  retentionAgentAddress: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  fiscalPeriod: string;

  @IsString()
  @IsNotEmpty()
  retainedSubjectName: string;

  @IsString()
  @IsNotEmpty()
  retainedSubjectRif: string;

  @IsString()
  @IsNotEmpty()
  paymentOrderNumber: string;
}