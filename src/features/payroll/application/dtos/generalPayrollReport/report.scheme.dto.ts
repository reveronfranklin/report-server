import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReportHeaderDto } from './report-header.dto';
import { ReportBodyDto } from './report-body.dto';
import { ReportFooterDto } from './report-footer.dto'; // <-- Importamos el nuevo footer

export class ReportSchemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => ReportHeaderDto)
  header: ReportHeaderDto[]; // Representa tu IGeneral

  @ValidateNested()
  @Type(() => ReportBodyDto)
  body: ReportBodyDto[];     // Representa tu IDetail

  @ValidateNested()
  @Type(() => ReportFooterDto)
  footer: ReportFooterDto[]; // Representa tu ISignature (dinámico)
}