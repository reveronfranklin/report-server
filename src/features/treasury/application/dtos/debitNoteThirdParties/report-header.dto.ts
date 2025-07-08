import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportHeaderDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsDate()
  checkDate: Date;

  @IsNotEmpty()
  @IsNumber()
  checkNumber: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}