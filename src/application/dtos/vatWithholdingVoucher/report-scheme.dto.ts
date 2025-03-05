import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReportHeaderDto } from './report-header.dto';
import { ReportSubHeaderDto } from './report-sub-header.dto';
import { ReportBodyDto } from './report-body.dto';

export class ReportSchemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @ValidateNested()
  @Type(() => ReportHeaderDto)
  header: ReportHeaderDto;

  @ValidateNested()
  @Type(() => ReportSubHeaderDto)
  subHeader: ReportSubHeaderDto;

  @ValidateNested()
  @Type(() => ReportBodyDto)
  body: ReportBodyDto;
}