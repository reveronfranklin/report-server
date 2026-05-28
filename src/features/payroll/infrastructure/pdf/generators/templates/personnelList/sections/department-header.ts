import type { Content, TableCell } from 'pdfmake/interfaces';
import { ReportDepartmentDto } from '../../../../../../application/dtos/personnelList/report-department.dto';

const border = [true, true, true, true] as [boolean, boolean, boolean, boolean]

const getDepartmentHeaderSection = (department: ReportDepartmentDto): Content => ({
  table: {
    widths: ['*'],
    body: [
      [
        {
          text: 'UNIDAD EJECUTORA',
          style: 'departmentTitle',
          fillColor: '#eeeeee',
          border
        } as TableCell
      ],
      [
        {
          text: department.label,
          style: 'departmentLabel',
          fillColor: '#f7f7f7',
          border
        } as TableCell
      ]
    ]
  },
  layout: {
    paddingLeft: () => 2,
    paddingRight: () => 2,
    paddingTop: () => 1,
    paddingBottom: () => 1
  },
  margin: [0, 0, 0, 10]
})

export default getDepartmentHeaderSection;
