import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class ReportQueryDto {
  @IsNumber()
  @IsPositive()
  payrollTypeCode: number;

  @IsString()
  @IsOptional()
  status?: string;
}
