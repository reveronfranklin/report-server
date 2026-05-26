import { ReportItemDto } from './report-item.dto';

export class ReportDepartmentDto {
  code: string;
  name: string;
  label: string;
  items: ReportItemDto[];
  totalSalary: number;
  totalRecords: number;
}
