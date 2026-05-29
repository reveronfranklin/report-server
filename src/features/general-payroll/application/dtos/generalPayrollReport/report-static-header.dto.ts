import { IsNumber, IsString, IsDateString } from 'class-validator';

export class ReportStaticHeaderDto {
  @IsNumber()
  public periodCode!: number;

  @IsString()
  public description!: string;

  @IsNumber()
  public payrollTypeCode!: number;

  @IsString()
  public payrollTypeDescription!: string;

  @IsDateString()
  public payrollDate!: string;

  @IsNumber()
  public periodNumber!: number;

  @IsString()
  public periodDescription!: string;

  @IsString()
  public payrollCategory!: string;

  @IsString()
  public payrollCategoryDescription!: string;
}