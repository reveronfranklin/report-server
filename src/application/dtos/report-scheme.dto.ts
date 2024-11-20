import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReportHeaderDto } from './report-header.dto';
import { ReportBodyDto } from './report-body.dto';

export class ReportSchemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logoPath: string;

  @ValidateNested()
  @Type(() => ReportHeaderDto)
  headers: ReportHeaderDto;

  @ValidateNested()
  @Type(() => ReportBodyDto)
  body: ReportBodyDto[];
}