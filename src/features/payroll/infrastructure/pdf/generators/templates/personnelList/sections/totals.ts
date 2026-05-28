import type { Content, TableCell } from 'pdfmake/interfaces';
import { formatPrice } from '@shared/utils';
import { ReportDepartmentDto } from '../../../../../../application/dtos/personnelList/report-department.dto';
import { ReportSummaryDto } from '../../../../../../application/dtos/personnelList/report-summary.dto';

const topBorder = [false, true, false, false] as [boolean, boolean, boolean, boolean]

const getDepartmentTotalsSection = (department: ReportDepartmentDto): Content => ({
  table: {
    widths: ['*', 100, 90],
    body: [
      [
        {
          text: 'TOTAL UNIDAD EJECUTORA',
          style: 'departmentTotal',
          border: topBorder
        } as TableCell,
        {
          text: `${department.totalRecords} registro(s)`,
          style: 'departmentTotal',
          border: topBorder
        } as TableCell,
        {
          text: formatPrice(department.totalSalary, 'VES'),
          style: 'departmentTotal',
          border: topBorder
        } as TableCell
      ]
    ]
  },
  layout: {
    paddingTop: () => 2,
    paddingBottom: () => 2,
    hLineWidth: () => 0.5,
    vLineWidth: () => 0
  },
  margin: [0, 0, 0, 0]
})

const getGrandTotalsSection = (summary: ReportSummaryDto): Content => ({
  table: {
    widths: ['*', 100, 90],
    body: [
      [
        {
          text: 'GRAN TOTAL',
          style: 'grandTotal',
          border: topBorder
        } as TableCell,
        {
          text: `${summary.totalRecords} registro(s)`,
          style: 'grandTotal',
          border: topBorder
        } as TableCell,
        {
          text: formatPrice(summary.totalSalary, 'VES'),
          style: 'grandTotal',
          border: topBorder
        } as TableCell
      ]
    ]
  },
  layout: {
    paddingTop: () => 2,
    paddingBottom: () => 2,
    hLineWidth: () => 0.75,
    vLineWidth: () => 0
  },
  margin: [0, 18, 0, 0]
})

export {
  getDepartmentTotalsSection,
  getGrandTotalsSection
};
