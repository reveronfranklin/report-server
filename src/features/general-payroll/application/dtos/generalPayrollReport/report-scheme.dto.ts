import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReportStaticHeaderDto } from './report-static-header.dto';
import { ReportHeaderDto } from './report-header.dto';
import { ReportBodyDto } from './report-body.dto';
import { ReportFooterDto } from './report-footer.dto';

export class ReportSchemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ReportStaticHeaderDto)
  staticHeader: ReportStaticHeaderDto;

  @ValidateNested()
  @Type(() => ReportHeaderDto)
  header: ReportHeaderDto[];

  @ValidateNested()
  @Type(() => ReportBodyDto)
  body: ReportBodyDto[];

  @ValidateNested()
  @Type(() => ReportFooterDto)
  footer: ReportFooterDto[];
}