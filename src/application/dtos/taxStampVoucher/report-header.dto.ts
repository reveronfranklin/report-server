import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class ReportHeaderDto {
  @IsString()
  title: string;

  @IsDate()
  dateElaboration: Date;

  @IsString()
  @IsNotEmpty()
  paymentOrderNumber: string;
}