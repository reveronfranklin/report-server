import { ReportBodyDto } from './report-body.dto';
import { ReportHeaderDto } from './report-header.dto';
import { ReportSummaryDto } from './report-summary.dto';

export class ReportSchemeDto {
  header: ReportHeaderDto;
  body: ReportBodyDto;
  summary: ReportSummaryDto;
}
