import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportFooterDto {
  @IsNotEmpty()
  @IsString()
  office: string;

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