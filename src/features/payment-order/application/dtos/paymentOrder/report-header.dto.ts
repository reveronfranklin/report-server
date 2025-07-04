import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ReportHeaderDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  commitmentNumber: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  paymentOrderNumber: string;

  @IsDate()
  @IsNotEmpty()
  paymentOrderDate: Date;

  @IsDate()
  @IsNotEmpty()
  commitmentDate: Date;
}