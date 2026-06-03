import type { Content } from 'pdfmake/interfaces';
import getLogoSection from '../logo';
import { ReportStaticHeaderDto } from '../../../../../application/dtos/generalPayrollReport/report-static-header.dto';

import {
    castRowSpans,
    formatPayrollDate,
    getSmartTableWidths
} from '@shared/utils';

const getStaticHeaderSection = (currentPage: number, pageCount: number, staticHeader: ReportStaticHeaderDto): Content => {
  const logo            = getLogoSection()
  const formattedDate   = formatPayrollDate(staticHeader.payrollDate);

  const contentStaticHeader: Content = {
    layout: 'noBorders',
    style: 'staticHeader',
    table: {
      widths: getSmartTableWidths({
        totalColumns: 4,
        strategy: 'flexible',
        starColumns: [1, 2, 3]
      }),
      heights: ['auto', 10, 10],
      body: [
        [
          {
            stack: [
              logo
            ]
          },
          ...castRowSpans(2),
          {
            text: `Página ${currentPage.toString()} de ${pageCount}`,
            style: 'headerCurrentPage'
          }
        ],
        [
          {
            text: 'REPORTE GENERAL DE NÓMINA',
            style: 'headerText'
          },
          ...castRowSpans(3)
        ],
        [
          {
            text: `${staticHeader.payrollTypeDescription}`,
            style: 'headerText'
          },
          {
            text: `${staticHeader.periodDescription} ${formattedDate}`,
            colSpan: 2,
            style: 'headerTitle'
          },
          ...castRowSpans(2)
        ]
      ]
    }
  }

  return contentStaticHeader
}

export default getStaticHeaderSection