import type { Content, TableCell } from 'pdfmake/interfaces';
import { formatPrice } from '@shared/utils';
import { ReportDepartmentDto } from '../../../../../../application/dtos/personnelList/report-department.dto';
import { ReportItemDto } from '../../../../../../application/dtos/personnelList/report-item.dto';

const headerBorder = [false, false, false, true] as [boolean, boolean, boolean, boolean]
const rowBorder = [false, false, false, false] as [boolean, boolean, boolean, boolean]

const getHeaderCell = (text: string): TableCell => ({
  text,
  style: 'tableHeader',
  border: headerBorder
})

const getItemRow = (item: ReportItemDto): TableCell[] => [
  {
    text: item.cedula,
    style: 'tableCellCenter',
    border: rowBorder
  },
  {
    text: item.nombre,
    style: 'tableCell',
    border: rowBorder
  },
  {
    text: item.codigo,
    style: 'tableCellCenter',
    border: rowBorder
  },
  {
    text: item.cargo,
    style: 'tableCell',
    border: rowBorder
  },
  {
    text: item.descripcionStatus,
    style: 'tableCellCenter',
    border: rowBorder
  },
  {
    text: formatPrice(item.sueldo, 'VES'),
    style: 'tableCellRight',
    border: rowBorder
  }
]

const getPersonnelTableSection = (department: ReportDepartmentDto): Content => ({
  table: {
    headerRows: 1,
    widths: [60, 180, 80, '*', 70, 70],
    body: [
      [
        getHeaderCell('CEDULA'),
        getHeaderCell('APELLIDOS Y NOMBRES'),
        getHeaderCell('CODIGO CARGO'),
        getHeaderCell('DENOMINACION'),
        getHeaderCell('STATUS'),
        getHeaderCell('SUELDO')
      ],
      ...department.items.map(getItemRow)
    ]
  },
  layout: {
    paddingLeft: () => 2,
    paddingRight: () => 2,
    paddingTop: () => 2,
    paddingBottom: () => 2,
    hLineWidth: () => 0.5,
    vLineWidth: () => 0
  },
  margin: [0, 0, 0, 8]
})

export default getPersonnelTableSection;
