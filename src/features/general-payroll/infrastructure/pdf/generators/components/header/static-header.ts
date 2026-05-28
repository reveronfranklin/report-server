import type { Content } from 'pdfmake/interfaces';
import { castRowSpans } from '@shared/utils';
import getLogoSection from '../logo';

const getStaticHeaderSection = (currentPage: number, pageCount: number): Content => {
  const logo = getLogoSection()

  const contentStaticHeader: Content = {
    layout: 'noBorders',
    style: 'staticHeader',
    table: {
      widths: ['auto', '*', '*', '*'],
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
            text: 'NÓMINA ALTO NIVEL',
            style: 'headerText'
          },
          {
            text: '1ra Quincena de MAYO de 2026',
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